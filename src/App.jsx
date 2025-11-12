// src/App.jsx
import React from "react";
import Header from "./components/Header";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import { useGame } from "./hooks/useGame";

const DEFAULT_WORDS = ["APPLE", "BIRD", "TREE", "BOOK"];

export default function App() {
  const [page, setPage] = React.useState("start");
  const words = React.useMemo(() => DEFAULT_WORDS, []);

  const {
    grid,
    placedWords,
    placedWordsMeta,
    foundWords,
    foundWordsMeta,
    foundPositionsSet,
    init,
    resetGame,
    checkSelection,
    isGameOver,
  } = useGame({ words, size: 5 });

  React.useEffect(() => {
    if (isGameOver) setPage("results");
  }, [isGameOver]);

  const startGame = () => {
    init();
    setPage("game");
  };

  const finish = () => setPage("results");
  const playAgain = () => {
    resetGame();
    setPage("start");
  };

  return (
    <div>
      <Header onNavigate={setPage} page={page} />

      <div>
        {page === "start" && <StartPage onStart={startGame} />}
        {page === "game" && (
          <GamePage
            grid={grid}
            placedWords={placedWords}
            foundWords={foundWords}
            foundWordsMeta={foundWordsMeta}
            foundPositionsSet={foundPositionsSet}
            checkSelection={checkSelection}
            onFinish={finish}
          />
        )}
        {page === "results" && (
          <ResultsPage
            results={{
              score: foundWords.length,
              found: foundWords,
              missed: placedWords.filter((w) => !foundWords.includes(w)),
            }}
            onPlayAgain={playAgain}
          />
        )}
      </div>

      <footer style={{ textAlign: "center", marginTop: 20, color: "#6b7280" }}>
        Made with ❤️ — Word Search (5×5)
      </footer>
    </div>
  );
}
