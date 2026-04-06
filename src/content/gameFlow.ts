import type { ScreenNode, GameState } from "../types";

const screens: ScreenNode[] = [
  // === START MENU ===
  { name: "start-menu", type: "start" },

  // === INTRO ===
  {
    name: "intro-1",
    type: "dialogue",
    lines: [
      "...Oh. A real human.",
      "So you're Sitti. That means... yeah. You've met him.",
    ],
  },
  {
    name: "intro-2",
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
    lines: ["Welcome to the \u201CDate\u201D Itinerary System\u2122."],
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

  // === ACT I ===
  {
    name: "coffee-entry",
    type: "dialogue",
    chapter: "Act I // Coffee",
    lines: ["First stop: Coffee."],
  },
  {
    name: "coffee-choice",
    type: "choice",
    choiceId: "coffee",
    lines: ["Pick your battlefield."],
    options: ["Starbucks", "The Coffee Bean & Tea Leaf"],
  },
  {
    name: "payment-gag-intro",
    type: "dialogue",
    lines: [
      "Statistically mid. Emotionally valid.",
      "Oh. Before you go. I have documentation.",
    ],
    continueLabel: "???",
  },
  {
    name: "payment-proof",
    type: "image-reveal",
    lines: [
      "Sitti has bravely volunteered to pay.",
      "This is now legally binding in this universe.",
    ],
    asset: import.meta.env.BASE_URL + "assets/payment-proof.jpg",
    continueLabel: "!!!",
  },
  {
    name: "coffee-realworld",
    type: "dialogue",
    lines: ["Go. Talk. I'll be here."],
  },
  {
    name: "coffee-photo",
    type: "upload",
    lines: ["Take a photo together."],
    activityId: "coffee",
  },
  {
    name: "coffee-photo-reaction",
    type: "dialogue",
    lines: ["Received. Archiving."],
  },

  // === ACT I.V ===
  {
    name: "quiz-entry",
    type: "dialogue",
    chapter: "Act I.V // Pop Quiz",
    lines: ["You survived small talk.", "Pop Quiz. 5 minutes. No pressure."],
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
    lines: ["Oh??? You were paying attention.", "You have earned this."],
    next: "quiz-reward",
  },
  {
    name: "quiz-reward",
    type: "image-reveal",
    lines: ["Completely fake. Emotionally real."],
    asset: import.meta.env.BASE_URL + "assets/smiski-coupon.png",
    saveable: true,
    downloadName: "mini-carlo-coupon.png",
    next: "intermission-entry",
  },
  {
    name: "quiz-result-fail",
    type: "dialogue",
    lines: ["\u2026Oh.", "Memories are temporary anyway."],
    next: "intermission-entry",
  },

  // === ACT II ===
  {
    name: "intermission-entry",
    type: "dialogue",
    chapter: "Act II // Intermission",
    lines: ["Phase two."],
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
    lines: ["50/50 split. Carlo handles dinner. Go enjoy it."],
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

  // === ACT III ===
  {
    name: "dinner-entry",
    type: "dialogue",
    chapter: "Act III // Dinner",
    lines: ["Final stage. Dinner."],
  },
  {
    name: "dinner-prompt",
    type: "dialogue",
    lines: ["Carlo picks. Eat. Talk. Don't overthink."],
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
      "Compiling memories...",
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
      "I'll... log this as a successful run.",
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
