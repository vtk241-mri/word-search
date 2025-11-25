import React from "react";

export default function ResultsPage({
  results = { score: 0, found: [], missed: [], time: 0, history: [] },
  onPlayAgain,
}) {
  const {
    score = 0,
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
          Знайдено: <strong>{score}</strong>
        </p>
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
        </div>

        <div style={{ marginTop: 12, textAlign: "left" }}>
          <h4>Історія</h4>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                <strong>{new Date(h.date).toLocaleString()}</strong> — {h.score}
                /{h.total} ({h.time}s)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
