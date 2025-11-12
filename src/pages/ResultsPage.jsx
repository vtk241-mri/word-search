import React from "react";

export default function ResultsPage({
  results = { score: 0, found: [], missed: [] },
  onPlayAgain,
}) {
  const { score, found, missed } = results;
  return (
    <main className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: 0 }}>Результати</h2>
        <p className="small-muted">
          Знайдено слів: <span className="kv">{found.length}</span> /{" "}
          <span className="kv">{found.length + missed.length}</span>
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

        <div className="results-grid">
          <div className="results-card">
            <h4 style={{ marginTop: 0 }}>Знайдені</h4>
            <ul>
              {found.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
          <div className="results-card">
            <h4 style={{ marginTop: 0 }}>Пропущені</h4>
            <ul>
              {missed.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
