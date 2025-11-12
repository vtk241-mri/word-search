// src/components/WordList.jsx
import React from "react";

export default function WordList({ words = [], foundWords = [] }) {
  return (
    <div className="card">
      <h3 style={{ margin: 0, marginBottom: 10 }}>Слова</h3>
      <div className="wordlist">
        {words.map((w) => {
          const found = foundWords.includes(w);
          return (
            <div key={w} className={`word-item ${found ? "found" : ""}`}>
              <span>{w}</span>
              <span className="status">{found ? "Знайдено" : "Чекає"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
