import React from "react";

function maskWord(word) {
  if (!word) return "";
  return "•".repeat(word.length);
}

export default function WordList({
  words = [],
  foundWords = [],
  hidden = false,
}) {
  return (
    <div className="card">
      <div className="wordlist">
        {words.map((w) => {
          const found = foundWords.includes(w);
          return (
            <div
              key={w}
              className={`word-item ${found ? "found" : ""}`}
              aria-hidden={false}
            >
              <span style={{ letterSpacing: 1 }}>
                {found ? w : hidden ? maskWord(w) : w}
              </span>
              <span className="status">
                {found ? "Знайдено" : hidden ? "" : "Чекає"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
