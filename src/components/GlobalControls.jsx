import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/GlobalControls.scss";

const GlobalControls = ({
  isPlaying,
  onPlay,
  onPause,
  onRewind,
  onSetVolume,
  globalVolume,
  bpm,
  note,
  onDetect,
}) => {
  const { t } = useTranslation();

  const handlePlayPause = () => {
    isPlaying ? onPause() : onPlay();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (!isNaN(newVolume)) {
      onSetVolume(newVolume);
    }
  };

  return (
    <div className="global-controls">
      <button onClick={handlePlayPause}>
        {isPlaying ? t("global.pause") : t("global.play")}
      </button>

      <button onClick={onRewind}>{t("global.rewind")}</button>

      <label>
        {t("global.volume")}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={globalVolume}
          onChange={handleVolumeChange}
        />
      </label>

      <div className="detect-info">
        <span>BPM: {bpm ?? "–"}</span>
        <span>
          {t("global.note")}: {note ?? "–"}
        </span>
        <button onClick={onDetect}>{t("global.detect")}</button>
      </div>
    </div>
  );
};

export default GlobalControls;
