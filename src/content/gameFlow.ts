import type { ScreenNode, GameState } from "../types";

export const screens: ScreenNode[] = [
  // === START MENU ===
  { name: "start-menu", type: "start" },

  // === INTRO ===
  {
    name: "intro-1",
    type: "dialogue",
    lines: [
      "...Oh. A real human.",
      "Give me a second. I don't usually get perceived.",
    ],
  },
  {
    name: "intro-2",
    type: "dialogue",
    lines: ["So you're Sitti. That means... yeah. You've met him."],
  },
  {
    name: "intro-3",
    type: "dialogue",
    lines: [
      "My real-life counterpart. Tall. Handsome. Questionable decision-making.",
    ],
    continueLabel: "???",
  },
  {
    name: "intro-choice",
    type: "choice",
    choiceId: "explain",
    lines: ["Did he explain what this is about?"],
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
    next: "intro-closing",
  },
  {
    name: "intro-response-no",
    type: "dialogue",
    lines: ["Perfect. I love explaining things I barely understand."],
    next: "intro-closing",
  },
  {
    name: "intro-closing",
    type: "dialogue",
    lines: [
      "Welcome to the officially unofficial\u2026",
      "\u201CDate\u201D Itinerary System\u2122.",
    ],
  },

  // === MAP REVEAL ===
  {
    name: "map-observe",
    type: "dialogue",
    lines: ["Observe."],
    next: "map-dramatic",
  },
  {
    name: "map-dramatic",
    type: "map",
    next: "map-explain",
  },
  {
    name: "map-explain",
    type: "map",
    lines: [
      "Three stages. Simple. Emotionally devastating.",
      "Each one? A test.",
      "Of memory. Coordination. And mild social endurance.",
    ],
  },

  // === ACT I — COFFEE ===
  {
    name: "coffee-entry",
    type: "dialogue",
    chapter: "Act I \u2014 Coffee",
    lines: ["First stop: Coffee.", "Also known as: the interrogation stage."],
  },
  {
    name: "coffee-choice",
    type: "choice",
    choiceId: "coffee",
    lines: ["Pick your battlefield."],
    options: ["Starbucks", "The Coffee Bean & Tea Leaf"],
  },
  {
    name: "coffee-response",
    type: "dialogue",
    lines: ["Statistically mid. Emotionally valid."],
  },
  {
    name: "payment-gag-intro",
    type: "dialogue",
    lines: ["Oh\u2014before you go.", "I have documentation."],
    continueLabel: "???",
  },
  {
    name: "payment-proof",
    type: "image-reveal",
    lines: [
      "Sitti has bravely volunteered to pay.",
      "This is now legally binding in this universe.",
    ],
    asset: import.meta.env.BASE_URL + "assets/fake-payment-proof.png",
    continueLabel: "!!!",
  },
  {
    name: "coffee-realworld",
    type: "dialogue",
    lines: ["Go. Talk. Exchange lore.", "I'll be here. Judging quietly."],
  },
  {
    name: "coffee-photo",
    type: "upload",
    lines: ["Take a photo together.", "Not for surveillance. Mostly."],
    activityId: "coffee",
  },
  {
    name: "coffee-photo-reaction",
    type: "dialogue",
    lines: ["Received. Archiving."],
  },

  // === ACT I.V — POP QUIZ ===
  {
    name: "quiz-entry",
    type: "dialogue",
    chapter: "Act I.V \u2014 Pop Quiz",
    lines: [
      "You survived small talk.",
      "Time to verify that information was retained.",
      "You have 5 minutes. No pressure. Except all of it.",
    ],
  },
  {
    name: "quiz",
    type: "quiz",
    lines: ["Answer carefully."],
    next: (state) =>
      state.quizPassed ? "quiz-result-pass" : "quiz-result-fail",
  },
  {
    name: "quiz-result-pass",
    type: "dialogue",
    lines: ["Oh???", "You were paying attention.", "You have earned this."],
    next: "quiz-reward",
  },
  {
    name: "quiz-reward",
    type: "image-reveal",
    lines: ["Completely fake. Emotionally real."],
    asset: import.meta.env.BASE_URL + "assets/smiski-coupon.png",
    next: "intermission-entry",
  },
  {
    name: "quiz-result-fail",
    type: "dialogue",
    lines: ["\u2026Oh.", "Memories are temporary anyway."],
    next: "intermission-entry",
  },

  // === ACT II — INTERMISSION ===
  {
    name: "intermission-entry",
    type: "dialogue",
    chapter: "Act II \u2014 Intermission",
    lines: ["Phase two.", "Less talking. More doing."],
  },
  {
    name: "intermission-choice",
    type: "choice",
    choiceId: "activity",
    lines: ["Pick your next activity."],
    options: ["Timezone", "Movie"],
  },
  {
    name: "intermission-response",
    type: "dialogue",
    lines: [
      "This one is 50/50. No loopholes.",
      "Relax though. Carlo handles dinner. He insisted.",
    ],
  },
  {
    name: "intermission-realworld",
    type: "dialogue",
    lines: ["Go enjoy it. I'll be waiting."],
  },
  {
    name: "intermission-photo",
    type: "upload",
    lines: ["Documentation required."],
    activityId: "intermission",
  },
  {
    name: "intermission-photo-reaction",
    type: "dialogue",
    lines: ["Noted."],
  },

  // === ACT III — DINNER ===
  {
    name: "dinner-entry",
    type: "dialogue",
    chapter: "Act III \u2014 Dinner",
    lines: ["Final stage. Dinner."],
  },
  {
    name: "dinner-prompt",
    type: "dialogue",
    lines: [
      "No choices here. Carlo picks.",
      "Eat. Talk. Try not to overthink anything.",
    ],
  },
  {
    name: "dinner-photo",
    type: "upload",
    lines: ["One last photo. For the archives."],
    activityId: "dinner",
  },
  {
    name: "dinner-photo-reaction",
    type: "dialogue",
    chapter: "",
    lines: ["Filed."],
  },

  // === ENDING ===
  {
    name: "ending-entry",
    type: "dialogue",
    lines: [
      "Compiling memories\u2026",
      "Do not close your eyes. That does nothing but it sounds dramatic.",
    ],
  },
  {
    name: "ending",
    type: "ending",
  },
  {
    name: "final-question",
    type: "choice",
    choiceId: "enjoy",
    lines: ["Did you enjoy the \u201Cdate\u201D?"],
    options: ["Yes", "No"],
    next: (state) =>
      state.choices["enjoy"] === "Yes" ? "final-closing" : "ending-no-quip",
  },
  {
    name: "ending-no-quip",
    type: "dialogue",
    lines: ["Statistically improbable. Proceeding anyway."],
    next: "final-closing",
  },
  {
    name: "final-closing",
    type: "dialogue",
    lines: [
      "Not bad. Not bad at all.",
      "I'll\u2026 log this as a successful run.",
    ],
    continueLabel: "BYE",
    resetsGame: true,
  },
];

export const screenMap = new Map<string, ScreenNode>(
  screens.map((s) => [s.name, s]),
);

const screenIndex = new Map(screens.map((s, i) => [s.name, i]));

const chapterTitles = new Map<string, string>();
let currentChapter: string | null = null;
for (const s of screens) {
  if (s.chapter !== undefined) currentChapter = s.chapter || null;
  if (currentChapter) chapterTitles.set(s.name, currentChapter);
}

export function getChapterTitle(screenName: string): string | null {
  return chapterTitles.get(screenName) ?? null;
}

export function getNextScreenName(
  current: ScreenNode,
  state: GameState,
): string | null {
  if (current.next) {
    return typeof current.next === "function"
      ? current.next(state)
      : current.next;
  }
  const idx = screenIndex.get(current.name) ?? -1;
  if (idx < screens.length - 1) {
    return screens[idx + 1].name;
  }
  return null;
}
