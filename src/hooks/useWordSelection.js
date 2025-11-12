import { useCallback, useState } from "react";

const normalize = (v) => (v === 0 ? 0 : v > 0 ? 1 : -1);
const isNeighbor = (a, b) =>
  Math.max(Math.abs(a.row - b.row), Math.abs(a.col - b.col)) === 1;

export function useWordSelection({ onComplete } = {}) {
  const [selected, setSelected] = useState([]);
  const [direction, setDirection] = useState(null);

  const resetSelection = useCallback(() => {
    setSelected([]);
    setDirection(null);
  }, []);

  const undo = useCallback(() => {
    setSelected((prev) => {
      const next = prev.slice(0, -1);
      if (next.length < 2) setDirection(null);
      return next;
    });
  }, []);

  const selectCell = useCallback(
    (row, col, letter) => {
      setSelected((prev) => {
        if (prev.length === 0) return [{ row, col, letter }];

        const last = prev[prev.length - 1];
        if (last.row === row && last.col === col) {
          const next = prev.slice(0, -1);
          if (next.length < 2) setDirection(null);
          return next;
        }

        if (prev.some((p) => p.row === row && p.col === col)) return prev;
        if (!isNeighbor(last, { row, col })) return prev;

        if (!direction) {
          const dr = normalize(row - last.row);
          const dc = normalize(col - last.col);
          setDirection([dr, dc]);
          return [...prev, { row, col, letter }];
        }

        const expectedR = last.row + direction[0];
        const expectedC = last.col + direction[1];
        if (row === expectedR && col === expectedC) {
          return [...prev, { row, col, letter }];
        }
        return prev;
      });
    },
    [direction]
  );

  const submitSelection = useCallback(() => {
    if (!selected.length) return null;
    const copy = selected.slice();
    if (onComplete) onComplete(copy);
    resetSelection();
    return copy;
  }, [onComplete, resetSelection, selected]);

  return {
    selectedCells: selected,
    selectCell,
    undo,
    resetSelection,
    submitSelection,
  };
}
