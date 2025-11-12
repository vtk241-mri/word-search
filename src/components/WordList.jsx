export default function WordList({ words }) {
  return (
    <aside className="p-4 border rounded bg-white shadow-sm">
      <h3 className="font-semibold mb-2">Слова для пошуку</h3>
      <ul className="space-y-1">
        {words.map((w, idx) => (
          <li key={idx} className="text-sm">
            • {w}
          </li>
        ))}
      </ul>
    </aside>
  );
}
