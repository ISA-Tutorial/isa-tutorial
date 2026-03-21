import {
  LEVELS,
  SETS,
  STORAGE_KEY,
  STORAGE_VERSION,
} from "./task1-data.js";

const MIN_JUSTIFICATION = 5;

/** @typedef {{ submitted: boolean, choices: Record<string, string>, justifications: Record<string, string> }} SetState */

/** @type {Record<string, SetState>} */
let setsState = {};

function safeId(...parts) {
  return parts
    .join("-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .replace(/-+/g, "-");
}

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION || typeof data.sets !== "object")
      return null;
    return data.sets;
  } catch {
    return null;
  }
}

function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, sets: setsState })
    );
  } catch {
    /* ignore quota / private mode */
  }
}

function defaultSetState(set) {
  /** @type {SetState} */
  const st = {
    submitted: false,
    choices: {},
    justifications: {},
  };
  for (const q of set.questions) {
    st.choices[q.id] = "";
    st.justifications[q.id] = "";
  }
  return st;
}

function mergePersistedIntoState(persisted) {
  if (!persisted) return;
  for (const set of SETS) {
    const p = persisted[set.id];
    if (!p) continue;
    const base = defaultSetState(set);
    setsState[set.id] = {
      submitted: Boolean(p.submitted),
      choices: { ...base.choices, ...(p.choices || {}) },
      justifications: { ...base.justifications, ...(p.justifications || {}) },
    };
  }
}

/**
 * @param {HTMLElement} root
 */
function render(root) {
  root.innerHTML = "";
  root.classList.add("task1-quiz");

  const intro = document.createElement("div");
  intro.className = "task1-quiz__intro";
  intro.innerHTML = `
    <h3>How to classify each question</h3>
    <p>For each question, pick the single best Complexity Ladder level. Use these <strong>properties determining position on the Complexity Ladder</strong>:</p>
    <ol class="task1-quiz__properties">
      <li>
        <strong>External Information Channel</strong>
        <p class="task1-quiz__property-detail">Is it an API that returns clean JSONs? Is it an indexed DB? Open Web?</p>
      </li>
      <li>
        <strong>Freshness and temporal sensitivity</strong>
        <p class="task1-quiz__property-detail">Is the answer stable, or does it change daily/hourly?</p>
      </li>
      <li>
        <strong>Synthesis requirement</strong>
        <p class="task1-quiz__property-detail">Does it require summarizing, comparing, or reasoning across multiple sources?</p>
      </li>
      <li>
        <strong>Multi-hop dependency</strong>
        <p class="task1-quiz__property-detail">Do you need intermediate sub-questions or tool calls to get the final answer?</p>
      </li>
      <li>
        <strong>Scope of evidence</strong>
        <p class="task1-quiz__property-detail">Is it enough to cite one source, or do we need broad coverage across a corpus?</p>
      </li>
      <li>
        <strong>Interaction pattern</strong>
        <p class="task1-quiz__property-detail">One-shot lookup vs iterative clarification, mixed-initiative dialogue, exploration.</p>
      </li>
    </ol>
  `;
  root.appendChild(intro);

  SETS.forEach((set, setIndex) => {
    if (!setsState[set.id]) setsState[set.id] = defaultSetState(set);

    const section = document.createElement("section");
    section.className = "task1-quiz__set";
    section.id = `task1-${set.id}`;

    const h2 = document.createElement("h2");
    h2.className = "task1-quiz__set-title";
    h2.textContent = `Set ${setIndex + 1}`;
    section.appendChild(h2);

    const cardsWrap = document.createElement("div");
    cardsWrap.className = "task1-quiz__cards";

    set.questions.forEach((q) => {
      const card = document.createElement("article");
      card.className = "task1-quiz__card";
      card.dataset.questionId = q.id;

      const qText = document.createElement("p");
      qText.className = "task1-quiz__question-text";
      qText.textContent = q.text;
      card.appendChild(qText);

      const fieldset = document.createElement("fieldset");
      fieldset.className = "task1-quiz__fieldset";
      const legend = document.createElement("legend");
      legend.className = "task1-quiz__legend";
      const legendId = safeId("legend", set.id, q.id);
      legend.id = legendId;
      legend.innerHTML =
        '<span class="task1-quiz__visually-hidden">Complexity level for this question</span><span aria-hidden="true">Complexity level</span>';
      fieldset.appendChild(legend);

      const segWrap = document.createElement("div");
      segWrap.className = "task1-quiz__segment-wrap";
      segWrap.setAttribute("role", "radiogroup");
      segWrap.setAttribute("aria-labelledby", legendId);

      const name = `task1-${set.id}-${q.id}`;

      LEVELS.forEach((level, li) => {
        const rid = safeId("r", set.id, q.id, "L", String(li));
        const input = document.createElement("input");
        input.type = "radio";
        input.className = "task1-quiz__segment";
        input.name = name;
        input.value = level;
        input.id = rid;
        input.dataset.questionId = q.id;
        input.dataset.setId = set.id;

        const label = document.createElement("label");
        label.className = "task1-quiz__segment-label";
        label.htmlFor = rid;
        label.textContent = level;

        segWrap.appendChild(input);
        segWrap.appendChild(label);
      });

      fieldset.appendChild(segWrap);
      card.appendChild(fieldset);

      const ta = document.createElement("textarea");
      ta.className = "task1-quiz__textarea";
      ta.placeholder = "Why is this level most suitable?";
      ta.dataset.questionId = q.id;
      ta.dataset.setId = set.id;
      ta.setAttribute(
        "aria-label",
        "Why this complexity level is most suitable for the question"
      );
      card.appendChild(ta);

      const errEl = document.createElement("p");
      errEl.className = "task1-quiz__field-error";
      errEl.hidden = true;
      errEl.dataset.role = "field-error";
      errEl.dataset.questionId = q.id;
      card.appendChild(errEl);

      const feedback = document.createElement("div");
      feedback.className = "task1-quiz__feedback";
      feedback.hidden = true;
      feedback.dataset.feedback = q.id;
      feedback.setAttribute("aria-live", "polite");
      card.appendChild(feedback);

      cardsWrap.appendChild(card);
    });

    section.appendChild(cardsWrap);

    const footer = document.createElement("div");
    footer.className = "task1-quiz__set-footer";

    const setErr = document.createElement("p");
    setErr.className = "task1-quiz__set-error";
    setErr.hidden = true;
    setErr.setAttribute("role", "alert");
    footer.appendChild(setErr);

    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.className = "task1-quiz__btn task1-quiz__btn--primary";
    submitBtn.textContent = "Submit set";
    submitBtn.dataset.setId = set.id;
    submitBtn.dataset.action = "submit";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "task1-quiz__btn";
    resetBtn.textContent = "Reset set";
    resetBtn.dataset.setId = set.id;
    resetBtn.dataset.action = "reset";
    resetBtn.hidden = true;

    const scoreEl = document.createElement("span");
    scoreEl.className = "task1-quiz__score";
    scoreEl.hidden = true;
    scoreEl.dataset.scoreFor = set.id;

    footer.appendChild(submitBtn);
    footer.appendChild(resetBtn);
    footer.appendChild(scoreEl);

    section.appendChild(footer);
    root.appendChild(section);
  });

  bindEvents(root);
  applyStateToDom(root);
}

/**
 * @param {HTMLElement} root
 */
function bindEvents(root) {
  root.querySelectorAll("input.task1-quiz__segment").forEach((input) => {
    input.addEventListener("change", () => {
      const setId = input.dataset.setId;
      const qid = input.dataset.questionId;
      if (!setId || !qid || setsState[setId]?.submitted) return;
      setsState[setId].choices[qid] = input.value;
      persist();
    });
  });

  root.querySelectorAll("textarea.task1-quiz__textarea").forEach((ta) => {
    ta.addEventListener("input", () => {
      const setId = ta.dataset.setId;
      const qid = ta.dataset.questionId;
      if (!setId || !qid || setsState[setId]?.submitted) return;
      setsState[setId].justifications[qid] = ta.value;
      persist();
    });
  });

  root.querySelectorAll('button[data-action="submit"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const setId = btn.dataset.setId;
      if (!setId) return;
      handleSubmitSet(root, setId);
    });
  });

  root.querySelectorAll('button[data-action="reset"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const setId = btn.dataset.setId;
      if (!setId) return;
      handleResetSet(root, setId);
    });
  });
}

/**
 * @param {HTMLElement} root
 * @param {string} setId
 */
function handleSubmitSet(root, setId) {
  const set = SETS.find((s) => s.id === setId);
  if (!set || setsState[setId].submitted) return;

  const setSection = root.querySelector(`#task1-${setId}`);
  if (!setSection) return;

  const setErr = setSection.querySelector(".task1-quiz__set-error");
  if (setErr) {
    setErr.hidden = true;
    setErr.textContent = "";
  }

  let valid = true;

  for (const q of set.questions) {
    const card = setSection.querySelector(
      `.task1-quiz__card[data-question-id="${q.id}"]`
    );
    if (!card) continue;

    const name = `task1-${setId}-${q.id}`;
    const checked = setSection.querySelector(`input[name="${CSS.escape(name)}"]:checked`);
    const ta = card.querySelector(`textarea[data-question-id="${q.id}"]`);
    const errEl = card.querySelector(`[data-role="field-error"][data-question-id="${q.id}"]`);

    const choice = checked ? checked.value : "";
    const just = ta ? ta.value.trim() : "";

    setsState[setId].choices[q.id] = choice;
    setsState[setId].justifications[q.id] = ta ? ta.value : "";

    let msg = "";
    if (!choice) msg = "Select a complexity level.";
    else if (just.length < MIN_JUSTIFICATION)
      msg = `Add a justification (at least ${MIN_JUSTIFICATION} characters).`;

    if (msg) {
      valid = false;
      if (errEl) {
        errEl.textContent = msg;
        errEl.hidden = false;
      }
    } else if (errEl) {
      errEl.hidden = true;
      errEl.textContent = "";
    }
  }

  if (!valid) {
    if (setErr) {
      setErr.textContent = `Fix the highlighted items: each question needs a level and a justification (min. ${MIN_JUSTIFICATION} characters).`;
      setErr.hidden = false;
    }
    persist();
    return;
  }

  setsState[setId].submitted = true;
  persist();
  lockSet(root, setId);
  showFeedbackForSet(root, setId);
  persist();
}

/**
 * @param {HTMLElement} root
 * @param {string} setId
 */
function handleResetSet(root, setId) {
  const set = SETS.find((s) => s.id === setId);
  if (!set) return;

  setsState[setId] = defaultSetState(set);
  persist();

  const setSection = root.querySelector(`#task1-${setId}`);
  if (!setSection) return;

  for (const q of set.questions) {
    const card = setSection.querySelector(`.task1-quiz__card[data-question-id="${q.id}"]`);
    if (!card) continue;

    card.classList.remove("task1-quiz__card--correct", "task1-quiz__card--incorrect");

    const name = `task1-${setId}-${q.id}`;
    setSection.querySelectorAll(`input[name="${CSS.escape(name)}"]`).forEach((inp) => {
      inp.checked = false;
      inp.disabled = false;
    });

    const ta = card.querySelector("textarea");
    if (ta) {
      ta.value = "";
      ta.disabled = false;
    }

    const errEl = card.querySelector(`[data-role="field-error"]`);
    if (errEl) {
      errEl.hidden = true;
      errEl.textContent = "";
    }

    const fb = card.querySelector(`[data-feedback="${q.id}"]`);
    if (fb) {
      fb.hidden = true;
      fb.innerHTML = "";
    }
  }

  const submitBtn = setSection.querySelector('button[data-action="submit"]');
  const resetBtn = setSection.querySelector('button[data-action="reset"]');
  const scoreEl = setSection.querySelector(`[data-score-for="${setId}"]`);
  const setErr = setSection.querySelector(".task1-quiz__set-error");

  if (submitBtn) submitBtn.disabled = false;
  if (resetBtn) resetBtn.hidden = true;
  if (scoreEl) {
    scoreEl.hidden = true;
    scoreEl.textContent = "";
  }
  if (setErr) {
    setErr.hidden = true;
    setErr.textContent = "";
  }
}

/**
 * @param {HTMLElement} root
 * @param {string} setId
 */
function lockSet(root, setId) {
  const setSection = root.querySelector(`#task1-${setId}`);
  if (!setSection) return;

  setSection.querySelectorAll("input.task1-quiz__segment").forEach((inp) => {
    inp.disabled = true;
  });
  setSection.querySelectorAll("textarea.task1-quiz__textarea").forEach((ta) => {
    ta.disabled = true;
  });

  const submitBtn = setSection.querySelector('button[data-action="submit"]');
  const resetEl = setSection.querySelector('button[data-action="reset"]');

  if (submitBtn) submitBtn.disabled = true;
  if (resetEl) resetEl.hidden = false;

  const scoreEl = setSection.querySelector(`[data-score-for="${setId}"]`);
  if (scoreEl) scoreEl.hidden = false;
}

/**
 * @param {HTMLElement} root
 * @param {string} setId
 */
function showFeedbackForSet(root, setId) {
  const set = SETS.find((s) => s.id === setId);
  if (!set) return;

  const setSection = root.querySelector(`#task1-${setId}`);
  if (!setSection) return;

  let correct = 0;
  for (const q of set.questions) {
    const card = setSection.querySelector(`.task1-quiz__card[data-question-id="${q.id}"]`);
    const fb = setSection.querySelector(`[data-feedback="${q.id}"]`);
    if (!card || !fb) continue;

    const userChoice = setsState[setId].choices[q.id] || "";
    const isOk = userChoice.trim() === q.correctLevel.trim();
    if (isOk) correct++;

    card.classList.toggle("task1-quiz__card--correct", isOk);
    card.classList.toggle("task1-quiz__card--incorrect", !isOk);

    const verdictClass = isOk ? "task1-quiz__verdict--ok" : "task1-quiz__verdict--bad";
    const verdictText = isOk ? "Correct" : "Incorrect";

    fb.innerHTML = `
      <div class="task1-quiz__verdict ${verdictClass}">${verdictText}</div>
      <div class="task1-quiz__feedback-row"><strong>Your choice:</strong> ${escapeHtml(userChoice)}</div>
      <div class="task1-quiz__feedback-row"><strong>Suggested level:</strong> ${escapeHtml(q.correctLevel)}</div>
      <div class="task1-quiz__feedback-row"><strong>Why:</strong> ${escapeHtml(q.goldJustification)}</div>
    `;
    fb.hidden = false;
  }

  const scoreEl = setSection.querySelector(`[data-score-for="${setId}"]`);
  if (scoreEl) {
    scoreEl.textContent = `Score: ${correct}/${set.questions.length}`;
    scoreEl.hidden = false;
  }
}

function escapeHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

/**
 * @param {HTMLElement} root
 */
function applyStateToDom(root) {
  SETS.forEach((set) => {
    const st = setsState[set.id];
    if (!st) return;

    const setSection = root.querySelector(`#task1-${set.id}`);
    if (!setSection) return;

    for (const q of set.questions) {
      const choice = st.choices[q.id];
      const just = st.justifications[q.id] ?? "";

      const name = `task1-${set.id}-${q.id}`;
      if (choice) {
        const inp = setSection.querySelector(
          `input[name="${CSS.escape(name)}"][value="${CSS.escape(choice)}"]`
        );
        if (inp) inp.checked = true;
      }

      const card = setSection.querySelector(`.task1-quiz__card[data-question-id="${q.id}"]`);
      const ta = card?.querySelector("textarea");
      if (ta) ta.value = just;
    }

    if (st.submitted) {
      lockSet(root, set.id);
      showFeedbackForSet(root, set.id);
    }
  });
}

export function initTask1Quiz() {
  const root = document.getElementById("task1-complexity-quiz");
  if (!root) return;

  setsState = {};
  for (const set of SETS) {
    setsState[set.id] = defaultSetState(set);
  }

  const persisted = loadPersisted();
  mergePersistedIntoState(persisted);

  render(root);
}
