import type { ScreenNode } from "../types";

export const screens: ScreenNode[] = [
  // === START MENU ===
  { name: "start-menu", type: "start" },

  // === INTRO — MINI CARLO ENTRY ===
  {
    name: "intro-1",
    type: "dialogue",
    lines: [
      "...Oh. Oh wow. A real human.",
      "Give me a second. I don't usually get perceived.",
    ],
    continueLabel: "...",
  },
  {
    name: "intro-2",
    type: "dialogue",
    lines: ["So you're Sitti. That means... yeah. You've met him."],
    continueLabel: "Yeah...",
  },
  {
    name: "intro-3",
    type: "dialogue",
    lines: [
      "My real-life counterpart. Tall. Handsome. Questionable decision-making.",
    ],
    continueLabel: "..?",
  },
  {
    name: "intro-choice",
    type: "choice",
    choiceId: "explain",
    lines: ["Did he explain what this whole thing is about?"],
    options: ["Yes", "No"],
    next: (state) =>
      state.choices["explain"] === "Yes"
        ? "intro-response-yes"
        : "intro-response-no",
  },
  {
    name: "intro-response-yes",
    type: "dialogue",
    lines: ["...Suspicious. I don't trust his communication skills."],
    continueLabel: "...",
    next: "intro-closing",
  },
  {
    name: "intro-response-no",
    type: "dialogue",
    lines: ["Oh perfect. I love explaining things I barely understand."],
    continueLabel: "...",
    next: "intro-closing",
  },
  {
    name: "intro-closing",
    type: "dialogue",
    lines: [
      "Anyway. Welcome to the officially unofficial, definitely not overengineered\u2026",
      "\u201CDate\u201D Itinerary System\u2122.",
    ],
    continueLabel: "*claps*",
  },

  // === MAP REVEAL ===
  // Step 1: Mini Carlo says "Observe." alone
  {
    name: "map-observe",
    type: "dialogue",
    lines: ["Observe."],
    continueLabel: "...",
    next: "map-reveal",
  },
  // Step 2: Map appears with dialogue
  {
    name: "map-reveal",
    type: "map",
    lines: [
      "Three stages. Simple. Clean. Emotionally devastating.",
      "Each one? A test.",
      "Not of love.",
      "Of memory. Coordination. And mild social endurance.",
    ],
  },

  // === ACTIVITY 1 — INTERROGATION (COFFEE) ===
  {
    name: "coffee-entry",
    type: "dialogue",
    lines: [
      "First stop: Coffee.",
      "Also known as: the interrogation stage.",
      "Where both of you pretend this is casual\u2026 while silently collecting data.",
    ],
    continueLabel: "...",
  },
  {
    name: "coffee-choice",
    type: "choice",
    choiceId: "coffee",
    lines: ["Pick your battlefield.", "Choose wisely. I'm logging everything."],
    options: ["Starbucks", "Coffee Bean & Tea Leaf"],
  },
  {
    name: "coffee-response",
    type: "dialogue",
    lines: ["Excellent choice. Statistically mid, but emotionally valid."],
    continueLabel: "...",
  },
  {
    name: "payment-gag-intro",
    type: "dialogue",
    lines: ["Oh\u2014before you go.", "I have documentation."],
    continueLabel: "..?",
  },
  {
    name: "payment-proof",
    type: "image-reveal",
    lines: [
      "As you can see, Sitti has bravely volunteered to pay.",
      "This is now legally binding in this universe.",
    ],
    asset: import.meta.env.BASE_URL + "assets/fake-payment-proof.png",
  },
  {
    name: "coffee-realworld",
    type: "dialogue",
    lines: [
      "Go. Talk. Exchange lore.",
      "Favorite color. Life plans. Deep fears. Surface-level jokes.",
      "I'll be here. Judging quietly.",
    ],
    continueLabel: "...",
  },
  {
    name: "coffee-photo",
    type: "upload",
    lines: [
      "Proof required.",
      "Take a photo together.",
      "Not for surveillance.",
      "Mostly.",
      "Upload when ready.",
    ],
    activityId: "coffee",
  },

  // === ACTIVITY 1.5 — POP QUIZ ===
  {
    name: "quiz-entry",
    type: "dialogue",
    lines: [
      "Oh good. You survived small talk.",
      "Time to verify that information was actually retained.",
    ],
    continueLabel: "...",
  },
  {
    name: "quiz-timer-intro",
    type: "dialogue",
    lines: [
      "Pop Quiz initiated.",
      "You have 5 minutes.",
      "No pressure. Except all of it.",
    ],
    continueLabel: "...",
  },
  {
    name: "quiz",
    type: "quiz",
    lines: ["Answer carefully. I am extremely judgmental."],
    next: (state) =>
      state.quizPassed ? "quiz-result-pass" : "quiz-result-fail",
  },
  {
    name: "quiz-result-pass",
    type: "dialogue",
    lines: [
      "Oh???",
      "You were paying attention.",
      "Terrifying. Impressive. Concerning.",
      "You have earned this.",
    ],
    continueLabel: "!!!",
    next: "quiz-reward",
  },
  {
    name: "quiz-reward",
    type: "image-reveal",
    lines: ["Completely fake.", "Emotionally real."],
    asset: import.meta.env.BASE_URL + "assets/smiski-coupon.png",
    next: "activity2-entry",
  },
  {
    name: "quiz-result-fail",
    type: "dialogue",
    lines: ["\u2026Oh.", "Well.", "Memories are temporary anyway."],
    continueLabel: "...",
    next: "activity2-entry",
  },

  // === ACTIVITY 2 — INTERMISSION ===
  {
    name: "activity2-entry",
    type: "dialogue",
    lines: [
      "Phase two.",
      "Less talking. More doing.",
      "Or\u2026 sitting in silence next to a large screen.",
    ],
    continueLabel: "...",
  },
  {
    name: "activity2-choice",
    type: "choice",
    choiceId: "activity",
    lines: ["Pick your next activity."],
    options: ["Timezone", "Movie"],
  },
  {
    name: "activity2-response",
    type: "dialogue",
    lines: [
      "Excellent.",
      "Financial reminder:",
      "This one is 50/50.",
      "I checked. No loopholes.",
    ],
    continueLabel: "...",
  },
  {
    name: "activity2-dinner-hint",
    type: "dialogue",
    lines: [
      "Relax though.",
      "Carlo handles dinner.",
      "He insisted.",
      "I wrote it down.",
    ],
    continueLabel: "...",
  },
  {
    name: "activity2-realworld",
    type: "dialogue",
    lines: ["Go enjoy it.", "Compete. React. Exist."],
    continueLabel: "...",
  },
  {
    name: "activity2-photo",
    type: "upload",
    lines: [
      "Documentation required again.",
      "Yes, I am building a case file.",
      "Upload your photo.",
    ],
    activityId: "activity2",
  },

  // === ACTIVITY 3 — DINNER ===
  {
    name: "dinner-entry",
    type: "dialogue",
    lines: [
      "Final stage.",
      "Dinner.",
      "The socially accepted reward for surviving everything prior.",
    ],
    continueLabel: "...",
  },
  {
    name: "dinner-prompt",
    type: "dialogue",
    lines: [
      "No choices here.",
      "Carlo picks.",
      "He is now fully responsible for outcomes.",
    ],
    continueLabel: "...",
  },
  {
    name: "dinner-realworld",
    type: "dialogue",
    lines: ["Eat.", "Talk.", "Try not to overthink anything."],
    continueLabel: "...",
  },
  {
    name: "dinner-photo",
    type: "upload",
    lines: ["One last photo.", "For the archives."],
    activityId: "dinner",
  },
  {
    name: "final-question",
    type: "choice",
    choiceId: "enjoy",
    lines: ["So.", "Did you enjoy the \u201Cdate\u201D?"],
    options: ["Yes", "No"],
    next: (state) =>
      state.choices["enjoy"] === "Yes" ? "ending-entry" : "ending-no-quip",
  },
  {
    name: "ending-no-quip",
    type: "dialogue",
    lines: ["That's statistically improbable. Proceeding anyway."],
    continueLabel: "...",
    next: "ending-entry",
  },

  // === ENDING — MEMORY COMPILATION ===
  {
    name: "ending-entry",
    type: "dialogue",
    lines: [
      "Compiling memories\u2026",
      "Do not close your eyes.",
      "That does nothing but it sounds dramatic.",
    ],
    continueLabel: "...",
  },
  {
    name: "ending",
    type: "ending",
    lines: [
      "Here's what happened.",
      "Not bad.",
      "Not bad at all.",
      "I'll\u2026 log this as a successful run.",
    ],
  },
];

// Build a lookup map for O(1) screen access by name
export const screenMap = new Map<string, ScreenNode>(
  screens.map((s) => [s.name, s]),
);

// Get the next screen name given current screen and state
export function getNextScreenName(
  current: ScreenNode,
  state: import("../types").GameState,
): string | null {
  if (current.next) {
    return typeof current.next === "function"
      ? current.next(state)
      : current.next;
  }
  const idx = screens.indexOf(current);
  if (idx < screens.length - 1) {
    return screens[idx + 1].name;
  }
  return null;
}
