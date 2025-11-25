import React from "react";
import ReactDOM from "react-dom";
import "../styles/components.css";

export default function Modal({ children, onClose }) {
  const el =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;
  if (!el) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    el
  );
}
