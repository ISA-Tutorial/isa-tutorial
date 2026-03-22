/** @typedef {{ id: string, text: string, correctLevel: string, goldJustification: string }} Task1Question */
/** @typedef {{ id: string, questions: Task1Question[] }} Task1Set */

/** Five Complexity Ladder levels (display order). */
export const LEVELS = [
  "Structured Lookup",
  "Grounded Closed-Corpus",
  "Grounded Live-Corpus",
  "Agentic Navigation",
  "Corpus Sensemaking",
];

/** Five sets × three questions; canonical answers and gold text. */
/** @type {Task1Set[]} */
export const SETS = [
  {
    id: "set-1",
    questions: [
      {
        id: "s1-q1",
        text: "What is the current UV index in Seattle right now?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "Single structured value from a weather provider/API; minimal synthesis; freshness handled by the API.",
      },
      {
        id: "s1-q2",
        text: "What time does the coffee break start in the provided Tutorial Schedule PDF?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Answer must come from the provided document (closed corpus) with evidence from that file.",
      },
      {
        id: "s1-q3",
        text: "What is the current USD→EUR exchange rate?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "A single numeric value typically returned by a finance API; little/no multi-hop reasoning required.",
      },
    ],
  },
  {
    id: "set-2",
    questions: [
      {
        id: "s2-q1",
        text: "In the provided Lab Cluster FAQ, how do I request a GPU node, and what queue name should I use?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Answer must be grounded in the provided FAQ; retrieval within a curated source plus faithful extraction.",
      },
      {
        id: "s2-q2",
        text: "As of today, what is the current routine UHC health insurance claim processing time?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Time-sensitive; insurer claim-handling timelines and published guidance change; needs live web retrieval and an authoritative source.",
      },
      {
        id: "s2-q3",
        text: "In the provided insurance plan summary PDF, what is the in-network deductible for individual coverage?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "Must extract a specific value from the provided document; evidence stays inside the closed corpus.",
      },
    ],
  },
  {
    id: "set-3",
    questions: [
      {
        id: "s3-q1",
        text: "Are any reservable sites available at Cougar Rock Campground (Mt. Rainier) for August 10–12?",
        correctLevel: "Agentic Navigation",
        goldJustification:
          "Typically requires multi-step interaction on a booking site (dates, availability), not one-shot lookup.",
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
        text: "What is the latest stable release version of Python as of today?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Requires live web retrieval from authoritative sources; the answer changes over time.",
      },
    ],
  },
  {
    id: "set-4",
    questions: [
      {
        id: "s4-q1",
        text: "Under current Washington Paid Family & Medical Leave rules, does someone with 820 hours worked qualify?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Current thresholds and rules live on official sources that change over time; the answer must be grounded in up-to-date policy text from the live web. Comparing 820 hours to a stated requirement is a small inference on that evidence—not multi-step browsing or tool orchestration.",
      },
      {
        id: "s4-q2",
        text: "In the provided data dictionary, which columns join ‘orders’ to ‘returns’?",
        correctLevel: "Grounded Closed-Corpus",
        goldJustification:
          "The schema document is the authoritative closed source; answer is grounded extraction from it.",
      },
      {
        id: "s4-q3",
        text: "Across the provided dataset of 200 product reviews, what are the top 5 recurring complaints, and how do they vary by month?",
        correctLevel: "Corpus Sensemaking",
        goldJustification:
          "Broad corpus coverage, aggregation, and theme extraction over many documents (not a single lookup).",
      },
    ],
  },
  {
    id: "set-5",
    questions: [
      {
        id: "s5-q1",
        text: "From the provided folder of 50 news articles about ‘AI regulation,’ what are the main policy themes and key disagreements?",
        correctLevel: "Corpus Sensemaking",
        goldJustification:
          "Corpus-wide synthesis across many articles; themes and disagreements emerge from aggregation.",
      },
      {
        id: "s5-q2",
        text: "Is the CHIIR 2026 early registration deadline already past?",
        correctLevel: "Grounded Live-Corpus",
        goldJustification:
          "Deadline is time-sensitive; requires checking the live conference site and citing the relevant information.",
      },
      {
        id: "s5-q3",
        text: "What is the elevation of Mount Rainier in feet?",
        correctLevel: "Structured Lookup",
        goldJustification:
          "A stable, structured fact typically returned as a single value from a knowledge base or API; minimal synthesis.",
      },
    ],
  },
];

export const STORAGE_KEY = "isa-task1-complexity-quiz";
export const STORAGE_VERSION = 3;
