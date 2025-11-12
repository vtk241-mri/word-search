import React from "react";

export default function Header({ onNavigate, page, onOpenSettings }) {
  return (
    <header className="header container">
      <div className="brand">
        <div className="logo">WS</div>
        <div>
          <h1 style={{ margin: 0 }}>Word Search</h1>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 12 }}>
            5×5 — знайди всі слова
          </p>
        </div>
      </div>

      <nav className="nav">
        <button
          className={`btn ${page === "start" ? "active" : ""}`}
          onClick={() => onNavigate("start")}
        >
          Старт
        </button>
        <button
          className={`btn ${page === "game" ? "active" : ""}`}
          onClick={() => onNavigate("game")}
        >
          Гра
        </button>
        <button
          className={`btn ${page === "results" ? "active" : ""}`}
          onClick={() => onNavigate("results")}
        >
          Результати
        </button>
        <button className="btn" onClick={onOpenSettings}>
          Налаштування
        </button>
        <button className="btn primary" onClick={() => onNavigate("start")}>
          Нова гра
        </button>
      </nav>
    </header>
  );
}
