import React from "react";

export default function LetterCell({
  letter,
  isSelected = false,
  isFound = false,
}) {
  const cls = `cell ${isFound ? "found" : isSelected ? "selected" : ""}`;
  return (
    <div className={cls} aria-pressed={isSelected || isFound}>
      <span>{letter}</span>
    </div>
  );
}
