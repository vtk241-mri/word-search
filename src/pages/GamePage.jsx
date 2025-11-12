// src/pages/GamePage.jsx
import React from "react";
import Grid from "../components/Grid";
import WordList from "../components/WordList";
import { useWordSelection } from "../hooks/useWordSelection";

export default function GamePage({
  grid = [],
  placedWords = [],
  foundWords = [],
  foundWordsMeta = [],
  foundPositionsSet = new Set(),
  checkSelection,
  onFinish,
}) {
  const { selectedCells, selectCell, undo, resetSelection, submitSelection } =
    useWordSelection();

  const onCellClick = (r, c, letter) => selectCell(r, c, letter);

  const onCheck = () => {
    if (!selectedCells.length) return;
    const matched = checkSelection(selectedCells);
    resetSelection();
    if (matched) {
      // optionally: show a small toast (alert for now)
      // alert(`Знайдено слово: ${matched}`);
    }
    return matched;
  };

  const progress = Math.round(
    (foundWords.length / Math.max(1, placedWords.length)) * 100
  );

  return (
    <main className="container">
      <div className="game-grid">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Знайди слова</h2>
              <p className="small-muted" style={{ margin: 0 }}>
                Клікай по літерах, щоб будувати слово. Натисни «Перевірити».
              </p>
            </div>

            <div
              className="card"
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div className="small-muted">Прогрес</div>
              <div className="progress" title={`${progress}%`}>
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div style={{ fontWeight: 700 }}>{progress}%</div>
            </div>
          </div>

          <Grid
            grid={grid}
            selectedCells={selectedCells}
            foundPositionsSet={foundPositionsSet}
            onCellClick={onCellClick}
          />

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={onCheck} className="btn primary">
              Перевірити
            </button>
            <button
              onClick={undo}
              className="btn btn-small"
              disabled={!selectedCells.length}
            >
              Undo
            </button>
            <button
              onClick={resetSelection}
              className="btn btn-small"
              disabled={!selectedCells.length}
            >
              Очистити
            </button>
            <button onClick={() => submitSelection()} className="btn btn-small">
              Submit
            </button>
          </div>
        </div>

        <div>
          <WordList words={placedWords} foundWords={foundWords} />
        </div>
      </div>
    </main>
  );
}
