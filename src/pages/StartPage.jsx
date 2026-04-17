import React from "react";

export default function StartPage({ onStart, name = "", setName = () => {} }) {
  return (
    <main className="container">
      <div
        className="card start-wrap"
        style={{ alignItems: "center", gap: 20 }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>Ласкаво просимо до Word Search</h2>
          <p className="small-muted">
            У полі заховано кілька слів. Обирай літери по порядку, формуй слова
            і починай гру, коли будеш готовий.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onStart();
            }}
            style={{ marginTop: 12, display: "flex", gap: 8 }}
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ім'я гравця (необов'язково)"
              className="form-input"
            />
            <button type="submit" className="btn primary">
              Почати гру
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
