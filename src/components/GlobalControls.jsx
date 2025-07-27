import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/GlobalControls.scss";

const GlobalControls = ({
  isPlaying,
  onPlayPause,
  onRewindAll,
  currentTime,
  duration,
  masterVolume,
  onMasterVolumeChange,
  detectInfo = { bpm: null, note: null },
}) => {
  const { t } = useTranslation();

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const remaining = duration - currentTime;

  return (
    <div className="global-controls">
      <div className="global-buttons">
        <button onClick={onPlayPause}>
          {isPlaying ? t("global.pause") : t("global.play")}
        </button>
        <button onClick={onRewindAll}>{t("global.rewind")}</button>
      </div>

      <div className="global-status">
        <span>{t("global.time")}:</span>
        <span>
          {formatTime(currentTime)} / {formatTime(duration)} / -
          {formatTime(remaining)}
        </span>
      </div>

      <div className="global-volume">
        <label>{t("global.volume")}:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={masterVolume}
          onChange={(e) => onMasterVolumeChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="global-detect">
        <span>
          {t("global.bpm")}: {detectInfo.bpm || "--"}
        </span>
        <span>
          {t("global.note")}: {detectInfo.note || "--"}
        </span>
      </div>
    </div>
  );
};

export default GlobalControls;
