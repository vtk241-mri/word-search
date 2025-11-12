// src/components/Header.jsx
import React from "react";

export default function Header({ onNavigate, page }) {
  return (
    <header className="header container">
      <div className="brand">
        <div className="logo">WS</div>
        <div>
          <h1>Word Search</h1>
          <p>5×5 — знайди всі слова</p>
        </div>
      </div>

      <nav className="nav">
        <button
          onClick={() => onNavigate("start")}
          className={`btn ${page === "start" ? "active" : ""}`}
        >
          Старт
        </button>
        <button
          onClick={() => onNavigate("game")}
          className={`btn ${page === "game" ? "active" : ""}`}
        >
          Гра
        </button>
        <button
          onClick={() => onNavigate("results")}
          className={`btn ${page === "results" ? "active" : ""}`}
        >
          Результати
        </button>
        <button onClick={() => onNavigate("start")} className="btn primary">
          Нова гра
        </button>
      </nav>
    </header>
  );
}
