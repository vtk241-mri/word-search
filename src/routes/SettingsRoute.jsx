import React from "react";
import SettingsForm from "../components/SettingsForm";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function SettingsRoute() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate(-1)}>
      <SettingsForm onClose={() => navigate(-1)} />
    </Modal>
  );
}
