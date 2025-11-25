import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import StartRoute from "./routes/StartRoute";
import GameRoute from "./routes/GameRoute";
import ResultsRoute from "./routes/ResultsRoute";
import SettingsRoute from "./routes/SettingsRoute";
import { useUser } from "./context/UserContext";

export default function App() {
  const { user } = useUser();

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<StartRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
          <Route path="/game/:userId" element={<GameRoute />} />
          <Route path="/results/:userId" element={<ResultsRoute />} />
          <Route
            path="*"
            element={<Navigate to={user ? `/game/${user.id}` : "/"} replace />}
          />
        </Routes>
      </div>
    </>
  );
}
