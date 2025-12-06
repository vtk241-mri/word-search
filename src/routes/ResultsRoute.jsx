import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultsPage from "../pages/ResultsPage";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loadHistoryForUser, clearHistoryForUser } from "../store/historySlice";

export default function ResultsRoute() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const historyForUser = useAppSelector(
    (s) => s.history.byUserId[userId] || []
  );

  React.useEffect(() => {
    if (userId) dispatch(loadHistoryForUser(userId));
  }, [userId, dispatch]);

  const last = historyForUser[0] || { score: 0, total: 0, time: 0 };
  const results = {
    score: last.score,
    found: [], // optional
    missed: [],
    time: last.time,
    history: historyForUser,
  };

  return (
    <ResultsPage
      results={results}
      onPlayAgain={() => navigate(`/game/${userId}`)}
      onClearHistory={() => dispatch(clearHistoryForUser(userId))}
    />
  );
}
