import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { generateBoard } from "../utils/boardUtils";

export function useGame({ words = [], size = 5, timerSeconds = 0 } = {}) {
  const [grid, setGrid] = useState([]);
  const [placedWordsMeta, setPlacedWordsMeta] = useState([]);
  const [foundWordsMeta, setFoundWordsMeta] = useState([]);
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [remainingTime, setRemainingTime] = useState(timerSeconds);
  const [timerRunning, setTimerRunning] = useState(false);

  const optionsRef = useRef({
    words,
    size,
    timerSeconds,
    directions: undefined,
    maxWordLength: undefined,
  });
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (startSec) => {
      clearTimer();
      if (!startSec || startSec <= 0) {
        setTimerRunning(false);
        setRemainingTime(0);
        return;
      }
      setRemainingTime(startSec);
      setTimerRunning(true);
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearTimer();
            setTimerRunning(false);
            setIsGameOver(true);
            setEndedAt(Date.now());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearTimer]
  );

  const pauseTimer = useCallback(() => {
    clearTimer();
    setTimerRunning(false);
  }, [clearTimer]);

  const resumeTimer = useCallback(() => {
    if (remainingTime > 0) {
      startTimer(remainingTime);
    }
  }, [remainingTime, startTimer]);

  const init = useCallback(
    (opts = {}) => {
      const currentWords = (
        opts.words ??
        optionsRef.current.words ??
        words
      ).map((w) => String(w).toUpperCase());
      const currentSize = opts.size ?? optionsRef.current.size ?? size;
      const directions = opts.directions ?? optionsRef.current.directions;
      const maxWordLength =
        opts.maxWordLength ?? optionsRef.current.maxWordLength;
      const t =
        typeof opts.timerSeconds === "number"
          ? opts.timerSeconds
          : optionsRef.current.timerSeconds ?? timerSeconds;

      optionsRef.current = {
        words: currentWords,
        size: currentSize,
        timerSeconds: t,
        directions,
        maxWordLength,
      };

      clearTimer();

      const { grid: g, placedWords } = generateBoard(
        currentSize,
        currentWords,
        {
          directions,
          maxWordLength,
        }
      );

      setGrid(g);
      setPlacedWordsMeta(placedWords);
      setFoundWordsMeta([]);
      setStartedAt(Date.now());
      setEndedAt(null);
      setIsGameOver(false);

      startTimer(Number(t));
    },
    [words, size, timerSeconds, clearTimer, startTimer]
  );

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  useEffect(() => {
    if (
      placedWordsMeta.length > 0 &&
      foundWordsMeta.length === placedWordsMeta.length
    ) {
      setIsGameOver(true);
      setEndedAt(Date.now());
      pauseTimer();
    }
  }, [placedWordsMeta, foundWordsMeta, pauseTimer]);

  const foundPositionsSet = useMemo(() => {
    const s = new Set();
    foundWordsMeta.forEach((f) =>
      f.positions.forEach((p) => s.add(`${p.row},${p.col}`))
    );
    return s;
  }, [foundWordsMeta]);

  const checkSelection = useCallback(
    (cells) => {
      if (!cells || !cells.length) return null;
      const selPos = cells.map((c) => `${c.row},${c.col}`);
      for (const placed of placedWordsMeta) {
        const pos = placed.positions.map((p) => `${p.row},${p.col}`);
        if (pos.length !== selPos.length) continue;
        const posRev = [...pos].reverse();
        const forward = pos.join("|") === selPos.join("|");
        const reverse = posRev.join("|") === selPos.join("|");
        if (
          (forward || reverse) &&
          !foundWordsMeta.find((f) => f.word === placed.word)
        ) {
          setFoundWordsMeta((prev) => [...prev, placed]);
          return placed.word;
        }
      }
      return null;
    },
    [placedWordsMeta, foundWordsMeta]
  );

  const resetGame = useCallback(() => {
    const opts = optionsRef.current || { words, size, timerSeconds };
    init({
      words: opts.words,
      size: opts.size,
      directions: opts.directions,
      maxWordLength: opts.maxWordLength,
      timerSeconds: opts.timerSeconds,
    });
  }, [init, words, size, timerSeconds]);

  const stopTimer = useCallback(() => {
    pauseTimer();
  }, [pauseTimer]);

  const elapsedTime = useMemo(() => {
    if (!startedAt) return 0;
    const end = endedAt ?? Date.now();
    return Math.max(0, Math.round((end - startedAt) / 1000));
  }, [startedAt, endedAt]);

  return {
    grid,
    placedWords: placedWordsMeta.map((p) => p.word),
    placedWordsMeta,
    foundWords: foundWordsMeta.map((f) => f.word),
    foundWordsMeta,
    foundPositionsSet,
    startedAt,
    endedAt,
    elapsedTime,
    isGameOver,
    remainingTime,
    timerRunning,
    init,
    resetGame,
    checkSelection,
    stopTimer,
    resumeTimer,
    pauseTimer,
    startTimer,
  };
}
