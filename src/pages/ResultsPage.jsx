import React from "react";

function formatDuration(seconds = 0) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

export default function ResultsPage({
  results = { score: 0, total: 0, found: [], missed: [], time: 0, history: [] },
  onPlayAgain,
  onClearHistory,
}) {
  const {
    score = 0,
    total = 0,
    found = [],
    missed = [],
    time = 0,
    history = [],
  } = results;

  return (
    <main className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: 0 }}>Результати</h2>
        <p className="small-muted">
          Знайдено слів: <strong>{score}</strong> із <strong>{total}</strong>
        </p>
        <p className="small-muted">Час: {formatDuration(time)}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            margin: 12,
          }}
        >
          <button onClick={onPlayAgain} className="btn primary">
            Грати знову
          </button>
          <button onClick={onClearHistory} className="btn">
            Очистити історію
          </button>
        </div>

        {(found.length > 0 || missed.length > 0) && (
          <div style={{ marginTop: 12, textAlign: "left" }}>
            <h4>Остання гра</h4>
            {found.length > 0 && (
              <p>
                <strong>Знайдено:</strong> {found.join(", ")}
              </p>
            )}
            {missed.length > 0 && (
              <p>
                <strong>Пропущено:</strong> {missed.join(", ")}
              </p>
            )}
          </div>
        )}

        <div style={{ marginTop: 12, textAlign: "left" }}>
          <h4>Історія</h4>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <strong>{new Date(entry.date).toLocaleString("uk-UA")}</strong>
                {" "}
                - {entry.score}/{entry.total} ({formatDuration(entry.time)})
              </li>
            ))}
            {history.length === 0 && (
              <li className="small-muted">Історія порожня</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
