export default function Header({ onNavigate, page }) {
  return (
    <header className="w-full border-b p-4 flex items-center justify-between bg-white">
      <h1 className="text-lg font-semibold">Word Search — 5×5</h1>
      <nav className="space-x-2">
        {["start", "game", "results"].map((p) => (
          <button
            key={p}
            className={`px-3 py-1 rounded ${
              page === p ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => onNavigate(p)}
          >
            {p === "start" ? "Старт" : p === "game" ? "Гра" : "Результати"}
          </button>
        ))}
      </nav>
    </header>
  );
}
