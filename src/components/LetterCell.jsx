import React from "react";

export default function LetterCell({
  letter,
  isSelected = false,
  isFound = false,
}) {
  const base = "cell";
  const className = `${base} ${
    isFound ? "found" : isSelected ? "selected" : ""
  }`;
  return (
    <div className={className} aria-pressed={isSelected || isFound}>
      <span>{letter}</span>
    </div>
  );
}
