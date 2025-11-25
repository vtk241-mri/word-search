import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultsPage from "../pages/ResultsPage";

export default function ResultsRoute() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    try {
      const key = `wordsearch:history:${userId}`;
      const raw = localStorage.getItem(key);
      setHistory(raw ? JSON.parse(raw) : []);
    } catch {
      setHistory([]);
    }
  }, [userId]);

  const last = history[0] || { score: 0, total: 0, time: 0 };
  const results = {
    score: last.score,
    found: [],
    missed: [],
    time: last.time,
    history,
  };

  return (
    <ResultsPage
      results={results}
      onPlayAgain={() => navigate(`/game/${userId}`)}
    />
  );
}
