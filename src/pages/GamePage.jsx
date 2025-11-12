import Board from "../components/Board";
import WordList from "../components/WordList";
import Controls from "../components/Controls";
import { useState } from "react";

export default function GamePage({ board, words, onFinish }) {
  const [foundWords] = useState([]);
  const [score] = useState(0);

  return (
    <section className="p-6 max-w-5xl mx-auto grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Поле 5×5</h2>
          <Controls onSubmit={onFinish} />
        </div>

        <div className="flex items-start gap-6">
          <Board board={board} />
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Виділяйте літери, щоб складати слова.
            </p>
            <div className="p-4 border rounded bg-white">
              <p>
                Рахунок: <strong>{score}</strong>
              </p>
              <p>
                Знайдено: <strong>{foundWords.length}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <WordList words={words} />
    </section>
  );
}
