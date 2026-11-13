import { useEffect, useState } from "react";

const TICK_MS = 100;

export function useElapsedTime(initialSeconds: number, running: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!running) return;
    const startedAt = Date.now();
    const base = initialSeconds;
    const id = setInterval(() => {
      setSeconds(base + (Date.now() - startedAt) / 1000);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [initialSeconds, running]);

  return seconds;
}

export function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(1).padStart(4, "0");
  return `${String(minutes).padStart(2, "0")}:${seconds}`;
}
