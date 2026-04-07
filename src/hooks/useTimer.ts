import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef<(() => void) | null>(null);
  const secondsRef = useRef(initialSeconds);

  useEffect(() => {
    if (!isRunning) return;

    secondsRef.current = secondsLeft;

    const interval = setInterval(() => {
      const next = secondsRef.current - 1;
      secondsRef.current = next;

      if (next <= 0) {
        clearInterval(interval);
        setSecondsLeft(0);
        setIsRunning(false);
        onExpireRef.current?.();
      } else {
        setSecondsLeft(next);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = useCallback((onExpire?: () => void) => {
    if (onExpire) onExpireRef.current = onExpire;
    setIsRunning(true);
  }, []);

  return { secondsLeft, start };
}
