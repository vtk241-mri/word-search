import { useState } from "react";

export default function StartPage({ onStart }) {
  const [size] = useState(5);
  const [wordsCount] = useState(4);

  return (
    <section className="max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Ласкаво просимо в Word Search</h2>
      <p className="mb-6 text-gray-600">
        У таблиці {size}×{size} заховано {wordsCount} слів. Вони можуть бути
        розташовані горизонтально, вертикально чи діагонально.
      </p>

      <div className="mb-6 space-y-2">
        <p>
          Розмір: {size}×{size}
        </p>
        <p>Кількість слів: {wordsCount}</p>
      </div>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:opacity-90"
        onClick={onStart}
      >
        Почати гру
      </button>
    </section>
  );
}
