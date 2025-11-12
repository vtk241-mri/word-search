import React from "react";
import Grid from "../components/Grid";
import WordList from "../components/WordList";
import { useWordSelection } from "../hooks/useWordSelection";

function formatTime(sec) {
  if (sec == null) return "--";
  const mm = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const ss = (sec % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function GamePage({
  grid = [],
  placedWords = [],
  foundWords = [],
  foundWordsMeta = [],
  foundPositionsSet = new Set(),
  checkSelection,
  onFinish,
  remainingTime = 0,
  timerRunning = false,
}) {
  const { selectedCells, selectCell, undo, resetSelection } =
    useWordSelection();
  const [hideWords, setHideWords] = React.useState(false);

  const onCellClick = (r, c, letter) => selectCell(r, c, letter);

  const onCheck = () => {
    if (!selectedCells.length) return;
    const matched = checkSelection(selectedCells);
    resetSelection();
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div className="small-muted">Прогрес</div>
                <div style={{ fontWeight: 700 }}>{progress}%</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div className="small-muted">Таймер</div>
                <div style={{ fontWeight: 700, minWidth: 56 }}>
                  {timerRunning ? formatTime(remainingTime) : "—"}
                </div>
              </div>
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
              className="btn"
              disabled={!selectedCells.length}
            >
              Undo
            </button>
            <button
              onClick={resetSelection}
              className="btn"
              disabled={!selectedCells.length}
            >
              Очистити
            </button>
            <button onClick={onCheck} className="btn">
              Submit
            </button>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3 style={{ margin: 0 }}>Слова</h3>
            <div>
              <button
                className="btn"
                onClick={() => setHideWords((s) => !s)}
                aria-pressed={hideWords}
                title={hideWords ? "Показати слова" : "Приховати слова"}
              >
                {hideWords ? "Показати" : "Приховати"}
              </button>
            </div>
          </div>

          <WordList
            words={placedWords}
            foundWords={foundWords}
            hidden={hideWords}
          />
        </div>
      </div>
    </main>
  );
}
