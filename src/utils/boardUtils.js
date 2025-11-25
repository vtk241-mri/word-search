const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DEFAULT_DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const rand = (n) => Math.floor(Math.random() * n);

function createEmpty(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => null));
}

function canPlace(grid, word, r, c, dr, dc) {
  const n = grid.length;
  for (let i = 0; i < word.length; i++) {
    const rr = r + dr * i;
    const cc = c + dc * i;
    if (rr < 0 || rr >= n || cc < 0 || cc >= n) return false;
    const cell = grid[rr][cc];
    if (cell !== null && cell !== word[i]) return false;
  }
  return true;
}

function placeWord(grid, word, directions) {
  const n = grid.length;
  const tries = 400;
  for (let t = 0; t < tries; t++) {
    const [dr, dc] = directions[rand(directions.length)];
    const r = rand(n);
    const c = rand(n);
    const endR = r + dr * (word.length - 1);
    const endC = c + dc * (word.length - 1);
    if (endR < 0 || endR >= n || endC < 0 || endC >= n) continue;
    if (!canPlace(grid, word, r, c, dr, dc)) continue;
    const positions = [];
    for (let i = 0; i < word.length; i++) {
      const rr = r + dr * i;
      const cc = c + dc * i;
      grid[rr][cc] = word[i];
      positions.push({ row: rr, col: cc });
    }
    return positions;
  }
  return null;
}

function fillRandom(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] === null) {
        grid[r][c] = ALPHABET[rand(ALPHABET.length)];
      }
    }
  }
}

export function generateBoard(size = 5, words = [], options = {}) {
  const directions = options.directions ?? DEFAULT_DIRECTIONS;
  const maxWordLength = options.maxWordLength ?? size + 2;
  const filtered = words.filter((w) => w.length <= maxWordLength);
  const sorted = [...filtered].sort((a, b) => b.length - a.length);
  const grid = createEmpty(size);
  const placedWords = [];
  for (const w of sorted) {
    const up = w.toUpperCase();
    const positions = placeWord(grid, up, directions);
    if (positions) placedWords.push({ word: up, positions });
  }
  fillRandom(grid);
  return { grid, placedWords };
}
