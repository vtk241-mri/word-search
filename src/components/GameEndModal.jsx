import React from "react";
import Modal from "./Modal";

export default function GameEndModal({
  isOpen,
  onClose,
  stats = {},
  onNext,
  onReplay,
}) {
  if (!isOpen) return null;
  const { score = 0, total = 0, time = null } = stats;

  return (
    <Modal onClose={onClose}>
      <div style={{ padding: 20 }}>
        <h3 style={{ marginTop: 0 }}>Гра завершена</h3>
        <p>
          Знайдено слів: <strong>{score}</strong> / {total}
        </p>
        {time != null && (
          <p>
            Час: <strong>{time}s</strong>
          </p>
        )}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button className="btn" onClick={onClose}>
            Закрити
          </button>
          <button className="btn" onClick={onReplay}>
            Повторити
          </button>
          <button className="btn primary" onClick={onNext}>
            Наступний тур
          </button>
        </div>
      </div>
    </Modal>
  );
}
