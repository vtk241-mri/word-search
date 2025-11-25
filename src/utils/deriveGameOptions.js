export const DIRECTIONS = {
  orthogonal: [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ],
  diagPlus: [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ],
  all8: [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ],
};

export function deriveGameOptions(settings = {}) {
  const difficulty = settings.difficulty || "medium";
  const boardSize = Number(settings.boardSize) || 5;

  let directions;
  let maxWordLength;
  let defaultTimer;

  switch (difficulty) {
    case "easy":
      directions = DIRECTIONS.orthogonal;
      maxWordLength = Math.max(3, Math.min(6, boardSize + 0));
      defaultTimer = 0;
      break;
    case "hard":
      directions = DIRECTIONS.all8;
      maxWordLength = Math.max(6, Math.min(12, boardSize + 4));
      defaultTimer = 90;
      break;
    case "medium":
    default:
      directions = DIRECTIONS.diagPlus;
      maxWordLength = Math.max(4, Math.min(8, boardSize + 2));
      defaultTimer = 120;
      break;
  }

  const timerSeconds =
    typeof settings.timerSeconds === "number"
      ? settings.timerSeconds
      : settings.timerSeconds === undefined
      ? defaultTimer
      : defaultTimer;

  return {
    difficulty,
    size: boardSize,
    directions,
    maxWordLength,
    timerSeconds,
    wordsCount: Number(settings.wordsCount) || 4,
  };
}
