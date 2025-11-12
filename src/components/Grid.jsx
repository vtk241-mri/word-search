import React from "react";
import LetterCell from "./LetterCell";

export default function Grid({
  grid = [],
  selectedCells = [],
  foundPositionsSet = new Set(),
  onCellClick,
}) {
  const key = (r, c) => `${r},${c}`;
  const selectedSet = new Set(selectedCells.map((s) => key(s.row, s.col)));
  const cols = (grid[0] && grid[0].length) || 5;

  return (
    <div className="board-wrap card">
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const k = key(r, c);
            const isSelected = selectedSet.has(k);
            const isFound = foundPositionsSet.has(k);
            return (
              <button
                key={k}
                className="cell-button"
                onClick={() => onCellClick(r, c, letter)}
              >
                <LetterCell
                  letter={letter}
                  isSelected={isSelected}
                  isFound={isFound}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
