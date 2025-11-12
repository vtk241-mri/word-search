import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettings } from "../context/SettingsContext";

const schema = yup.object({
  difficulty: yup.string().oneOf(["easy", "medium", "hard"]).required(),
  boardSize: yup.number().min(3).max(8).required(),
  wordsCount: yup.number().min(1).max(12).required(),
  timerSeconds: yup.number().min(0).max(3600).required(),
  speed: yup.string().oneOf(["slow", "normal", "fast"]).required(),
});

export default function SettingsForm({ onClose }) {
  const { settings, setSettings, resetSettings } = useSettings();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings,
  });

  function onSubmit(data) {
    setSettings(data);
    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Налаштування гри</h3>

      <label className="form-row">
        <div className="form-label">Рівень</div>
        <select {...register("difficulty")} className="form-input">
          <option value="easy">Легкий</option>
          <option value="medium">Середній</option>
          <option value="hard">Важкий</option>
        </select>
        <div className="form-error">{errors.difficulty?.message}</div>
      </label>

      <label className="form-row">
        <div className="form-label">Розмір поля</div>
        <input
          type="number"
          {...register("boardSize")}
          min={3}
          max={8}
          className="form-input"
        />
        <div className="form-error">{errors.boardSize?.message}</div>
      </label>

      <label className="form-row">
        <div className="form-label">К-ть слів</div>
        <input
          type="number"
          {...register("wordsCount")}
          min={1}
          max={12}
          className="form-input"
        />
        <div className="form-error">{errors.wordsCount?.message}</div>
      </label>

      <label className="form-row">
        <div className="form-label">Таймер (секунд, 0 — без таймеру)</div>
        <input
          type="number"
          {...register("timerSeconds")}
          min={0}
          max={3600}
          className="form-input"
        />
        <div className="form-error">{errors.timerSeconds?.message}</div>
      </label>

      <label className="form-row">
        <div className="form-label">Швидкість</div>
        <select {...register("speed")} className="form-input">
          <option value="slow">Повільно</option>
          <option value="normal">Нормально</option>
          <option value="fast">Швидко</option>
        </select>
        <div className="form-error">{errors.speed?.message}</div>
      </label>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
          marginTop: 12,
        }}
      >
        <button
          type="button"
          className="btn"
          onClick={() => {
            resetSettings();
            if (onClose) onClose();
          }}
        >
          Скинути
        </button>
        <button type="button" className="btn" onClick={onClose}>
          Скасувати
        </button>
        <button type="submit" className="btn primary">
          Зберегти
        </button>
      </div>
    </form>
  );
}
