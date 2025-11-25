import React from "react";

export default function StartPage({ onStart, name = "", setName = () => {} }) {
  return (
    <main className="container">
      <div
        className="card start-wrap"
        style={{ alignItems: "center", gap: 20 }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>Ласкаво просимо в Word Search</h2>
          <p className="small-muted">
            У полі заховано кілька слів. Клікай літерки, формуй слово і натискай
            «Почати гру».
          </p>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ім'я (необов'язково)"
              className="form-input"
            />
            <button onClick={onStart} className="btn primary">
              Почати гру
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
