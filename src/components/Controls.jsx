export default function Controls({ onSubmit }) {
  return (
    <div className="flex gap-3 items-center text-sm">
      <div>
        Таймер: <strong>00:00</strong>
      </div>
      <button className="px-3 py-1 border rounded hover:bg-gray-100">
        Пауза
      </button>
      <button
        className="px-3 py-1 rounded bg-green-600 text-white hover:opacity-90"
        onClick={onSubmit}
      >
        Завершити
      </button>
    </div>
  );
}
