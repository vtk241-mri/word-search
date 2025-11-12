const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function randomLetter() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

export function generateMockBoard(size = 5) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => randomLetter())
  );
}
