import { useState, useEffect, useRef } from "react";

const CHAR_DELAY_MS = 35;

export function useTypewriter(text: string) {
  const [charCount, setCharCount] = useState(0);
  const rafRef = useRef(0);

  const [prevText, setPrevText] = useState(text);
  if (prevText !== text) {
    setPrevText(text);
    setCharCount(0);
  }

  useEffect(() => {
    let startTime = 0;
    let revealed = 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const target = Math.min(
        Math.floor((timestamp - startTime) / CHAR_DELAY_MS),
        text.length,
      );

      if (target > revealed) {
        revealed = target;
        setCharCount(revealed);
      }

      if (revealed < text.length) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [text]);

  return {
    displayedText: text.slice(0, charCount),
    isTyping: charCount < text.length,
  };
}
