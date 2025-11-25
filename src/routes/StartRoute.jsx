import React from "react";
import { useNavigate } from "react-router-dom";
import StartPage from "../pages/StartPage";
import { useUser } from "../context/UserContext";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "u" + Date.now().toString(36);
}

export default function StartRoute() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [name, setName] = React.useState("");

  const handleStart = () => {
    const id = makeId();
    const user = { id, name: name.trim() || `Player_${id.slice(0, 6)}` };
    setUser(user);
    navigate(`/game/${id}`);
  };

  return <StartPage onStart={handleStart} name={name} setName={setName} />;
}
