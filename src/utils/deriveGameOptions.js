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
  const { difficulty = "medium", boardSize = 5 } = settings;

  let directions;
  let maxWordLength;
  switch (difficulty) {
    case "easy":
      directions = DIRECTIONS.orthogonal;
      maxWordLength = Math.max(3, Math.min(6, boardSize + 1));
      break;
    case "hard":
      directions = DIRECTIONS.all8;
      maxWordLength = Math.max(6, Math.min(12, boardSize + 4));
      break;
    case "medium":
    default:
      directions = DIRECTIONS.diagPlus;
      maxWordLength = Math.max(4, Math.min(8, boardSize + 2));
  }

  return {
    size: boardSize,
    directions,
    maxWordLength,
    timerSeconds: settings.timerSeconds ?? 0,
    wordsCount: settings.wordsCount ?? 4,
    allowHints: !!settings.allowHints,
  };
}
