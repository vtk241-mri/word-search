export default function ResultsPage({ results, onPlayAgain }) {
  const { score = 0, found = [], missed = [] } = results || {};

  return (
    <section className="p-8 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Результати</h2>
      <p>
        Ваш рахунок: <strong>{score}</strong>
      </p>
      <p>Знайдені слова: {found.length}</p>
      <p>Пропущені слова: {missed.length}</p>

      <div className="grid grid-cols-2 gap-4 mt-6 text-left">
        <div className="border p-4 rounded bg-white">
          <h3 className="font-semibold mb-2">Знайдені</h3>
          <ul className="text-sm space-y-1">
            {found.map((w, i) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded bg-white">
          <h3 className="font-semibold mb-2">Пропущені</h3>
          <ul className="text-sm space-y-1">
            {missed.map((w, i) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:opacity-90"
        onClick={onPlayAgain}
      >
        Грати знову
      </button>
    </section>
  );
}
