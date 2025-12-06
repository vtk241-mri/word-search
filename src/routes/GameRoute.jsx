import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GamePage from "../pages/GamePage";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setUser } from "../store/userSlice";
import { addResult } from "../store/historySlice";
import { WORD_POOL } from "../data/wordPool";
import { deriveGameOptions } from "../utils/deriveGameOptions";
import { useGame } from "../hooks/useGame";
import { generatePseudoWords } from "../utils/generateWords";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickFromPool(pool, count, maxLen, difficulty) {
  const normalized = pool.map((w) => String(w).toUpperCase());
  let candidates = normalized.filter((w) => w.length <= Math.max(1, maxLen));
  if (candidates.length < count) {
    const extra = normalized.filter((w) => !candidates.includes(w));
    candidates = candidates
      .concat(shuffle(extra))
      .slice(0, Math.max(count, candidates.length));
  }
  if (difficulty === "easy") {
    candidates.sort((a, b) => a.length - b.length);
    return candidates.slice(0, count);
  }
  if (difficulty === "hard") {
    candidates.sort((a, b) => {
      if (b.length !== a.length) return b.length - a.length;
      return a.localeCompare(b);
    });
    return shuffle(
      candidates.slice(
        0,
        Math.max(count, Math.min(candidates.length, count * 2))
      )
    ).slice(0, count);
  }
  return shuffle(candidates).slice(0, count);
}

export default function GameRoute() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);
  const settings = useAppSelector((s) => s.settings);

  React.useEffect(() => {
    if (!user || user.id !== userId) {
      const name =
        user?.name ||
        `Player_${
          String(userId || "").slice(0, 6) ||
          Date.now().toString(36).slice(0, 6)
        }`;
      dispatch(setUser({ id: userId, name }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]);

  const gameOpts = React.useMemo(() => deriveGameOptions(settings), [settings]);

  const words = React.useMemo(() => {
    const count = Math.max(
      1,
      Number(settings.wordsCount || gameOpts.wordsCount || 4)
    );
    if (settings.generatedWords) {
      const minLen = 3;
      const maxLen = Math.min(gameOpts.maxWordLength, gameOpts.size + 2);
      return generatePseudoWords(count, minLen, maxLen, gameOpts.difficulty);
    } else {
      return pickFromPool(
        WORD_POOL,
        count,
        gameOpts.maxWordLength,
        gameOpts.difficulty
      );
    }
  }, [
    settings.generatedWords,
    settings.wordsCount,
    gameOpts.maxWordLength,
    gameOpts.size,
    gameOpts.difficulty,
    gameOpts.wordsCount,
  ]);

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
    stopTimer,
    resumeTimer,
  } = useGame({
    words,
    size: gameOpts.size,
    timerSeconds: gameOpts.timerSeconds,
  });

  React.useEffect(() => {
    init({
      words,
      size: gameOpts.size,
      directions: gameOpts.directions,
      maxWordLength: gameOpts.maxWordLength,
      timerSeconds: gameOpts.timerSeconds,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    init,
    words,
    gameOpts.size,
    gameOpts.directions,
    gameOpts.maxWordLength,
    gameOpts.timerSeconds,
  ]);

  const reportedRef = React.useRef(false);

  React.useEffect(() => {
    if (!isGameOver) {
      reportedRef.current = false;
      return;
    }
    if (reportedRef.current) return;
    reportedRef.current = true;

    const summary = {
      userId,
      date: new Date().toISOString(),
      score: foundWords.length,
      total: placedWords.length,
      time: elapsedTime,
    };

    dispatch(addResult({ userId, result: summary }));
    navigate(`/results/${userId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGameOver,
    foundWords.length,
    placedWords.length,
    elapsedTime,
    dispatch,
    navigate,
    userId,
  ]);

  return (
    <GamePage
      grid={grid}
      placedWords={placedWords}
      placedWordsMeta={placedWordsMeta}
      foundWords={foundWords}
      foundWordsMeta={foundWordsMeta}
      foundPositionsSet={foundPositionsSet}
      checkSelection={checkSelection}
      remainingTime={remainingTime}
      timerRunning={timerRunning}
      stopTimer={stopTimer}
      resumeTimer={resumeTimer}
    />
  );
}
