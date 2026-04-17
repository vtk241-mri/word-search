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
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ margin: 0 }}>Слова</h3>
      </div>

      <div className="wordlist">
        {words.map((word) => {
          const found = foundWords.includes(word);

          return (
            <div
              key={word}
              className={`word-item ${found ? "found" : ""}`}
              aria-hidden={false}
            >
              <span style={{ letterSpacing: 1 }}>
                {found ? word : hidden ? maskWord(word) : word}
              </span>
              <span className="status">
                {found ? "Знайдено" : hidden ? "" : "Ще не знайдено"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
