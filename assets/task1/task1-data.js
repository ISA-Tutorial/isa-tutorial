/** @typedef {{ id: string, text: string, correctLevel: string, goldJustification: string }} Task1Question */
/** @typedef {{ id: string, title: string, questions: Task1Question[] }} Task1Set */

/** Six Complexity Ladder levels (display order). */
export const LEVELS = [
  "Written Re-expression",
  "Structured Lookup",
  "Grounded Closed-Corpus",
  "Grounded Live-Corpus",
  "Agentic Navigation",
  "Corpus Sensemaking",
];

/** Seven sets × three questions; canonical answers and gold text. */
/** @type {Task1Set[]} */
export const SETS = [
  {
    id: "set-1",
    title: "Warm-up: rewriting vs API lookup vs closed corpus",
    questions: [
      {
        id: "s1-q1",
        text: "Rewrite this message to sound professional and concise: “Hey—can you send me the thing ASAP? I’m stuck.”",
        correctLevel: "Written Re-expression",
        goldJustification:
          "The need is improving wording/tone; no external facts or evidence required.",
      },
      {
        id: "s1-q2",
        text: "What is the current UV index in Seattle right now?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "Single structured value from a weather provider/API; minimal synthesis; freshness handled by the API.",
      },
      {
        id: "s1-q3",
        text: "Using ONLY the provided ‘Tutorial Schedule’ PDF, what time does the coffee break start?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Must rely on a provided document (closed corpus) and extract the answer with evidence from it.",
      },
    ],
  },
  {
    id: "set-2",
    title: "Curated doc QA vs open-web freshness vs API value",
    questions: [
      {
        id: "s2-q1",
        text: "Using the provided ‘Lab Cluster FAQ’ document, how do I request a GPU node, and what queue name should I use?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Answer must be grounded in the provided FAQ; requires retrieval within a curated source + faithful extraction.",
      },
      {
        id: "s2-q2",
        text: "As of today, what is the current routine U.S. passport processing time?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Time-sensitive and policy pages change; requires live web retrieval and citing an authoritative source.",
      },
      {
        id: "s2-q3",
        text: "What is the current USD→INR exchange rate?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "A single numeric value typically returned by a finance API; little/no multi-hop reasoning required.",
      },
    ],
  },
  {
    id: "set-3",
    title: "Action/navigation vs live conditions vs plain explanation",
    questions: [
      {
        id: "s3-q1",
        text: "Check recreation.gov for Cougar Rock Campground (Mt. Rainier) and tell me whether ANY reservable sites are available for Aug 10–12.",
        correctLevel: "Agentic Navigation",
        goldJustification:
          "Requires multi-step site interaction (date selection, availability filtering); not just one-shot retrieval.",
      },
      {
        id: "s3-q2",
        text: "Do I need tire chains to drive to Mt. Rainier tomorrow?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Depends on current road/weather advisories; needs live web sources and a grounded synthesis.",
      },
      {
        id: "s3-q3",
        text: "Explain ‘agentic search’ in two short paragraphs for someone who has only used Google Search.",
        correctLevel: "Written Re-expression",
        goldJustification:
          "Explanatory writing task; no strict requirement to retrieve evidence.",
      },
    ],
  },
  {
    id: "set-4",
    title: "Multi-hop policy + computation vs closed-plan detail vs simple structured value",
    questions: [
      {
        id: "s4-q1",
        text: "Find the current eligibility rule for Washington Paid Family & Medical Leave, then determine if someone with 820 hours worked qualifies.",
        correctLevel: "Agentic Navigation",
        goldJustification:
          "Requires at least two steps: retrieve the rule (live) + apply computation/decision logic (multi-hop).",
      },
      {
        id: "s4-q2",
        text: "Using ONLY the provided insurance plan summary PDF, what is the in-network deductible for individual coverage?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Must extract a specific value from a provided document; evidence is inside the closed corpus.",
      },
      {
        id: "s4-q3",
        text: "What time is it in Tokyo right now (local time)?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "Single structured value (time) from a deterministic/time API; no synthesis or corpus evidence needed.",
      },
    ],
  },
  {
    id: "set-5",
    title: "Corpus-level themes vs docpack join instruction vs rewriting",
    questions: [
      {
        id: "s5-q1",
        text: "Across the provided dataset of 200 product reviews, what are the top 5 recurring complaints, and how do they vary by month?",
        correctLevel: "Corpus Sensemaking",
        goldJustification:
          "Requires broad corpus coverage, aggregation, and theme extraction over many documents (not top-k retrieval).",
      },
      {
        id: "s5-q2",
        text: "Using the provided data dictionary, which columns do I join to connect ‘orders’ to ‘returns’?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "The schema/doc is the authoritative closed source; answer is grounded extraction from it.",
      },
      {
        id: "s5-q3",
        text: "Turn these bullet points into a polished 150-word abstract suitable for a conference submission.",
        correctLevel: "Written Re-expression",
        goldJustification:
          "Pure re-expression and writing quality; no external facts required.",
      },
    ],
  },
  {
    id: "set-6",
    title: "Global synthesis from news corpus vs live software version vs single-value lookup",
    questions: [
      {
        id: "s6-q1",
        text: "From the provided folder of 50 news articles about ‘AI regulation,’ summarize the main policy themes and key disagreements.",
        correctLevel: "Corpus Sensemaking",
        goldJustification:
          "Needs corpus-wide synthesis and coverage across many articles; themes/disagreements emerge from aggregation.",
      },
      {
        id: "s6-q2",
        text: "What is the latest stable release version of Python as of today?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Requires live web retrieval from authoritative sources; version changes over time; cite source.",
      },
      {
        id: "s6-q3",
        text: "What is the elevation of Mount Rainier (in feet)?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "A stable, structured fact typically returned as a single value from a knowledge source/API; minimal synthesis.",
      },
    ],
  },
  {
    id: "set-7",
    title: "Open-web sensemaking vs live deadline check vs query rewrite for specificity",
    questions: [
      {
        id: "s7-q1",
        text: "Across all TIME articles published in 2025 that discuss ‘geopolitics,’ what are the major geopolitical shifts and the most frequently mentioned regions?",
        correctLevel: "Corpus Sensemaking",
        goldJustification:
          "Requires collecting a large set of articles and synthesizing themes + frequency patterns across a corpus.",
      },
      {
        id: "s7-q2",
        text: "Is the CHIIR 2026 early registration deadline already passed?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Deadline is time-sensitive; requires checking the live conference site and citing the relevant page/section.",
      },
      {
        id: "s7-q3",
        text: "Rewrite this question so it’s answerable with one reliable source: ‘What’s the best laptop?’",
        correctLevel: "Written Re-expression",
        goldJustification:
          "The task is to refine/clarify the request; no external retrieval required.",
      },
    ],
  },
];

export const STORAGE_KEY = "isa-task1-complexity-quiz";
export const STORAGE_VERSION = 1;
