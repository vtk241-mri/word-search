// src/pages/StartPage.jsx
import React from "react";

export default function StartPage({ onStart }) {
  return (
    <main className="container">
      <div className="card start-wrap">
        <div className="start-left">
          <h2 className="h1">Ласкаво просимо в Word Search</h2>
          <p className="lead">
            У полі 5×5 заховано кілька слів. Клікай по літерках, формуй слово і
            натискай «Почати гру».
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onStart} className="btn primary">
              Почати гру
            </button>
            <button
              onClick={() =>
                alert(
                  "Підказка:\nСлова можуть бути горизонтально, вертикально або по діагоналі."
                )
              }
              className="btn"
            >
              Допомога
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
