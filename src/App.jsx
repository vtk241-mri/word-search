import { useState } from "react";
import Header from "./components/Header";
import { generateMockBoard } from "./utils/boardUtils";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import StartPage from "./pages/StartPage";

export default function App() {
  const [page, setPage] = useState("start");
  const [board] = useState(() => generateMockBoard(5));
  const [wordsToFind] = useState(["APPLE", "BIRD", "TREE", "BOOK"]);
  const [results, setResults] = useState(null);

  function startGame() {
    setResults(null);
    setPage("game");
  }

  function finishGame() {
    setResults({
      score: 42,
      found: ["APPLE", "BOOK"],
      missed: ["BIRD", "TREE"],
    });
  }
  function playAgain() {
    setPage("start");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setPage} page={page} />

      <main className="flex-1">
        {page === "start" && <StartPage onStart={startGame} />}
        {page === "game" && (
          <GamePage board={board} words={wordsToFind} onFinish={finishGame} />
        )}
        {page === "results" && (
          <ResultsPage results={results} onPlayAgain={playAgain} />
        )}
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 border-t">
        Каркас гри — без бізнес-логіки. Далі реалізуємо виділення клітин і
        перевірку слів.
      </footer>
    </div>
  );
}
