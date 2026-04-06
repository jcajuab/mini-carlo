import { useState, useRef, useCallback, useEffect } from "react";
import type { GameAction } from "../types";
import { QUIZ_QUESTIONS, QUIZ_TIME_LIMIT_SECONDS } from "../content/quizConfig";
import { useTimer } from "../hooks/useTimer";
import { Timer } from "./ui/Timer";
import { DialogueBox } from "./ui/DialogueBox";
import { PixelButton } from "./ui/PixelButton";

interface QuizScreenProps {
  dispatch: React.Dispatch<GameAction>;
}

export function QuizScreen({ dispatch }: QuizScreenProps) {
  const [answers, setAnswers] = useState<string[]>(
    new Array(QUIZ_QUESTIONS.length).fill(""),
  );
  const submittedRef = useRef(false);

  const handleSubmit = useCallback(
    (finalAnswers: string[]) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      dispatch({ type: "SUBMIT_QUIZ", answers: finalAnswers });
    },
    [dispatch],
  );

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const { secondsLeft, start } = useTimer(QUIZ_TIME_LIMIT_SECONDS);

  useEffect(() => {
    start(() => handleSubmit(answersRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allAnswered = answers.every((a) => a !== "");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Timer secondsLeft={secondsLeft} />

      {QUIZ_QUESTIONS.map((q, qi) => (
        <div
          key={qi}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <DialogueBox speaker={`Q${qi + 1}`}>{q.question}</DialogueBox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {q.options.map((opt) => (
              <PixelButton
                key={opt}
                variant={answers[qi] === opt ? "primary" : "secondary"}
                style={{
                  width: "100%",
                  fontSize: "var(--font-size-sm)",
                  padding: "10px 16px",
                }}
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[qi] = opt;
                  setAnswers(newAnswers);
                }}
              >
                {opt}
              </PixelButton>
            ))}
          </div>
        </div>
      ))}

      <PixelButton
        disabled={!allAnswered}
        style={{ opacity: allAnswered ? 1 : 0.5 }}
        onClick={() => handleSubmit(answers)}
      >
        Submit
      </PixelButton>
    </div>
  );
}
