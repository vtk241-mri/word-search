export default function Cell({ letter }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center border rounded text-lg font-medium select-none">
      {letter}
    </div>
  );
}
