import { useEffect, useRef, useState } from "react";

type ClockData = {
  date: string; // YYYY/MM/DD
  time: string; // HH:MM (24h)
};

export function useClock(): ClockData {
  const getFormatted = (): ClockData => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");

    return {
      date: `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}`,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    };
  };

  const [clock, setClock] = useState<ClockData>(getFormatted());

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setClock(getFormatted());

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeoutRef.current = setTimeout(() => {
      setClock(getFormatted());

      intervalRef.current = setInterval(() => {
        setClock(getFormatted());
      }, 60 * 1000);
    }, msUntilNextMinute);

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return clock;
}
