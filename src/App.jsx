import React from "react";
import Header from "./components/Header";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import Modal from "./components/Modal";
import SettingsForm from "./components/SettingsForm";
import GameEndModal from "./components/GameEndModal";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { WORD_POOL } from "./data/wordPool";
import { useGame } from "./hooks/useGame";
import { deriveGameOptions } from "./utils/deriveGameOptions";

function AppInner() {
  const [page, setPage] = React.useState("start");
  const { settings } = useSettings();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [endModalOpen, setEndModalOpen] = React.useState(false);

  const gameOpts = React.useMemo(() => deriveGameOptions(settings), [settings]);

  const words = React.useMemo(() => {
    const pool = [...WORD_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.max(1, settings.wordsCount || 4));
  }, [settings.wordsCount]);

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
    remainingTime,
    timerRunning,
    elapsedTime,
  } = useGame({
    words,
    size: gameOpts.size,
    timerSeconds: gameOpts.timerSeconds,
  });

  React.useEffect(() => {
    if (page === "game") {
      init({
        words,
        size: gameOpts.size,
        directions: gameOpts.directions,
        maxWordLength: gameOpts.maxWordLength,
        timerSeconds: gameOpts.timerSeconds,
      });
    }
  }, [
    gameOpts.size,
    gameOpts.directions,
    gameOpts.maxWordLength,
    gameOpts.timerSeconds,
    words,
    page,
    init,
  ]);

  React.useEffect(() => {
    if (isGameOver) {
      setEndModalOpen(true);
      setPage("results");
    }
  }, [isGameOver]);

  const startGame = () => {
    init({
      words,
      size: gameOpts.size,
      directions: gameOpts.directions,
      maxWordLength: gameOpts.maxWordLength,
      timerSeconds: gameOpts.timerSeconds,
    });
    setPage("game");
  };

  const handlePlayAgain = () => {
    init({
      words,
      size: gameOpts.size,
      directions: gameOpts.directions,
      maxWordLength: gameOpts.maxWordLength,
      timerSeconds: gameOpts.timerSeconds,
    });
    setEndModalOpen(false);
    setPage("game");
  };

  const handleNext = () => {
    init({
      words,
      size: gameOpts.size,
      directions: gameOpts.directions,
      maxWordLength: gameOpts.maxWordLength,
      timerSeconds: gameOpts.timerSeconds,
    });
    setEndModalOpen(false);
    setPage("game");
  };

  return (
    <>
      <Header
        onNavigate={setPage}
        page={page}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <div className="container">
        {page === "start" && <StartPage onStart={startGame} />}
        {page === "game" && (
          <GamePage
            grid={grid}
            placedWords={placedWords}
            placedWordsMeta={placedWordsMeta}
            foundWords={foundWords}
            foundWordsMeta={foundWordsMeta}
            foundPositionsSet={foundPositionsSet}
            checkSelection={checkSelection}
            onFinish={() => setPage("results")}
            remainingTime={remainingTime}
            timerRunning={timerRunning}
          />
        )}
        {page === "results" && (
          <ResultsPage
            results={{
              score: foundWords.length,
              found: foundWords,
              missed: placedWords.filter((w) => !foundWords.includes(w)),
            }}
            onPlayAgain={() => {
              init({
                words,
                size: gameOpts.size,
                directions: gameOpts.directions,
                maxWordLength: gameOpts.maxWordLength,
                timerSeconds: gameOpts.timerSeconds,
              });
              setPage("start");
            }}
          />
        )}
      </div>
      {settingsOpen && (
        <Modal onClose={() => setSettingsOpen(false)}>
          <SettingsForm onClose={() => setSettingsOpen(false)} />
        </Modal>
      )}
      <GameEndModal
        isOpen={endModalOpen}
        onClose={() => setEndModalOpen(false)}
        stats={{
          score: foundWords.length,
          total: placedWords.length,
          time: elapsedTime,
        }}
        onNext={handleNext}
        onReplay={handlePlayAgain}
      />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  );
}
