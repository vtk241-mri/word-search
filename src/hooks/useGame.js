// src/hooks/useGame.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateBoard } from "../utils/boardUtils";

export function useGame({
  words = ["APPLE", "BIRD", "TREE", "BOOK"],
  size = 5,
} = {}) {
  const [grid, setGrid] = useState([]);
  const [placedWordsMeta, setPlacedWordsMeta] = useState([]);
  const [foundWordsMeta, setFoundWordsMeta] = useState([]);
  const [startedAt, setStartedAt] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const init = useCallback(
    (opts = {}) => {
      const s = opts.size || size;
      const w = (opts.words || words).map((x) => x.toUpperCase());
      const { grid: g, placedWords } = generateBoard(s, w);
      setGrid(g);
      setPlacedWordsMeta(placedWords);
      setFoundWordsMeta([]);
      setStartedAt(Date.now());
      setIsGameOver(false);
    },
    [size, words]
  );

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (
      placedWordsMeta.length > 0 &&
      foundWordsMeta.length === placedWordsMeta.length
    ) {
      setIsGameOver(true);
    }
  }, [foundWordsMeta, placedWordsMeta]);

  const foundPositionsSet = useMemo(() => {
    const s = new Set();
    foundWordsMeta.forEach((f) =>
      f.positions.forEach((p) => s.add(`${p.row},${p.col}`))
    );
    return s;
  }, [foundWordsMeta]);

  const checkSelection = useCallback(
    (cells) => {
      if (!cells || cells.length === 0) return null;
      const selPos = cells.map((c) => `${c.row},${c.col}`);
      for (const placed of placedWordsMeta) {
        const pos = placed.positions.map((p) => `${p.row},${p.col}`);
        const posRev = [...pos].reverse();
        if (pos.length !== selPos.length) continue;
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

  const resetGame = useCallback(
    () => init({ words, size }),
    [init, words, size]
  );

  return {
    grid,
    placedWords: placedWordsMeta.map((p) => p.word),
    placedWordsMeta,
    foundWords: foundWordsMeta.map((f) => f.word),
    foundWordsMeta,
    foundPositionsSet,
    startedAt,
    isGameOver,
    init,
    resetGame,
    checkSelection,
  };
}
