import { useState, useEffect, useRef } from "react";

const CHAR_DELAY_MS = 35;

export function useTypewriter(text: string) {
  const [charIndex, setCharIndex] = useState(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    setCharIndex(0);
    lastTimeRef.current = 0;

    let currentIndex = 0;

    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      const elapsed = timestamp - lastTimeRef.current;
      const charsToReveal = Math.floor(elapsed / CHAR_DELAY_MS);

      if (charsToReveal > currentIndex) {
        currentIndex = charsToReveal;
        if (currentIndex >= text.length) {
          setCharIndex(text.length);
          return;
        }
        setCharIndex(currentIndex);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [text]);

  return {
    displayedText: text.slice(0, charIndex),
    isTyping: charIndex < text.length,
  };
}
