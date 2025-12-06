import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  setUser as setUserAction,
  clearUser as clearUserAction,
} from "../store/userSlice";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "u" + Date.now().toString(36);
}

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);

  const quickStart = () => {
    const id = makeId();
    const newUser = { id, name: `Player_${id.slice(0, 6)}` };
    dispatch(setUserAction(newUser));
    navigate(`/game/${id}`);
  };

  return (
    <header className="header container">
      <div className="brand">
        <div className="logo">WS</div>
        <div>
          <h1 style={{ margin: 0 }}>Word Search</h1>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 12 }}>
            5×5 — знайди всі слова
          </p>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" className="btn">
          Головна
        </NavLink>
        {user ? (
          <>
            <NavLink to={`/game/${user.id}`} className="btn">
              Гра
            </NavLink>
            <NavLink to={`/results/${user.id}`} className="btn">
              Результати
            </NavLink>
            <button className="btn" onClick={() => navigate("/settings")}>
              Налаштування
            </button>
            <button
              className="btn"
              onClick={() => {
                dispatch(clearUserAction());
                navigate("/");
              }}
            >
              Вийти
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("/")}>
              Почати
            </button>
            <button className="btn" onClick={quickStart}>
              Швидкий старт
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
