import React from "react";
import { useNavigate } from "react-router-dom";
import StartPage from "../pages/StartPage";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setUser } from "../store/userSlice";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "u" + Date.now().toString(36);
}

export default function StartRoute() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");

  const handleStart = () => {
    const id = makeId();
    const user = { id, name: name.trim() || `Player_${id.slice(0, 6)}` };
    dispatch(setUser(user));
    navigate(`/game/${id}`);
  };

  return <StartPage onStart={handleStart} name={name} setName={setName} />;
}
