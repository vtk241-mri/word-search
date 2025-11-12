import Cell from "./Cell";

export default function Board({ board }) {
  return (
    <div className="inline-block p-4 bg-white rounded shadow">
      <div className="grid grid-cols-5 gap-1">
        {board.flat().map((letter, i) => (
          <Cell key={i} letter={letter} />
        ))}
      </div>
    </div>
  );
}
