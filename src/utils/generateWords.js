const CONSONANTS = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "v",
  "z",
  "x",
];
const VOWELS = ["a", "e", "i", "o", "u", "y"];
const BLENDS = [
  "ch",
  "sh",
  "th",
  "ph",
  "st",
  "pr",
  "tr",
  "br",
  "cr",
  "dr",
  "gr",
  "pl",
  "cl",
  "sl",
  "sk",
];

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function pick(arr) {
  return arr[randInt(arr.length)];
}

function makePronounceableWord(len) {
  let w = "";
  let useBlend = Math.random() < 0.2;
  let startWithConsonant = Math.random() < 0.75;
  for (let i = 0; i < len; ) {
    if (startWithConsonant) {
      if (useBlend && Math.random() < 0.25 && i + 2 <= len) {
        w += pick(BLENDS);
        i += 2;
      } else {
        w += pick(CONSONANTS);
        i += 1;
      }
      startWithConsonant = false;
    } else {
      w += pick(VOWELS);
      i += 1;
      startWithConsonant = true;
    }
  }
  if (w.length < len) {
    while (w.length < len) w += pick(VOWELS);
  }
  if (w.length >= 4 && Math.random() < 0.12) {
    const pos = randInt(w.length - 1);
    w = w.slice(0, pos) + w[pos] + w.slice(pos);
    if (w.length > len) w = w.slice(0, len);
  }
  return w.toUpperCase();
}

export function generatePseudoWords(
  count = 4,
  minLen = 3,
  maxLen = 7,
  difficulty = "medium"
) {
  const out = new Set();
  const maxAttempts = count * 12 + 100;
  let attempts = 0;
  while (out.size < count && attempts < maxAttempts) {
    attempts++;
    let targetLen;
    if (difficulty === "easy") {
      const r = Math.random();
      targetLen =
        r < 0.6
          ? minLen
          : Math.max(minLen, Math.min(maxLen, minLen + randInt(2)));
    } else if (difficulty === "hard") {
      const r = Math.random();
      targetLen =
        r < 0.6
          ? Math.max(minLen, Math.min(maxLen, maxLen))
          : Math.max(
              minLen,
              Math.min(maxLen, Math.floor((minLen + maxLen) / 2) + randInt(2))
            );
    } else {
      targetLen = minLen + randInt(Math.max(1, maxLen - minLen + 1));
    }
    targetLen = Math.max(2, Math.min(Math.floor(targetLen), maxLen));
    const w = makePronounceableWord(targetLen);
    if (!w || w.length < 2) continue;
    if (/[^A-Z]/.test(w)) continue;
    out.add(w);
  }
  while (out.size < count) {
    let s = "";
    const n = minLen + randInt(Math.max(1, maxLen - minLen + 1));
    for (let i = 0; i < n; i++) s += String.fromCharCode(65 + randInt(26));
    out.add(s);
  }
  return Array.from(out).slice(0, count);
}
