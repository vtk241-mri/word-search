import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsentBanner";
import StartRoute from "./routes/StartRoute";
import GameRoute from "./routes/GameRoute";
import ResultsRoute from "./routes/ResultsRoute";
import SettingsRoute from "./routes/SettingsRoute";
import ProjectDocumentPage from "./pages/ProjectDocumentPage";
import { useAppSelector } from "./hooks/reduxHooks";

export default function App() {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<StartRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
          <Route
            path="/documents/:documentId"
            element={<ProjectDocumentPage />}
          />
          <Route path="/game/:userId" element={<GameRoute />} />
          <Route path="/results/:userId" element={<ResultsRoute />} />
          <Route
            path="*"
            element={<Navigate to={user ? `/game/${user.id}` : "/"} replace />}
          />
        </Routes>
      </div>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
