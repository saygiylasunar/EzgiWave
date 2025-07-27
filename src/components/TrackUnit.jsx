import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/TrackUnit.scss";

const TrackUnit = ({
  isEmpty,
  onAdd,
  track,
  index,
  onUpdate,
  onRemove,
  onRef,
}) => {
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [localVolume, setLocalVolume] = useState(track?.volume || 1);
  const [hoverTime, setHoverTime] = useState(null);
  const [isMuted, setIsMuted] = useState(track?.muted || false);
  const [isSoloed, setIsSoloed] = useState(track?.soloed || false);
  const [balance, setBalance] = useState(track?.balance || 0);

  useEffect(() => {
    if (audioRef.current && onRef) {
      onRef(audioRef);
    }
  }, [audioRef, onRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : localVolume;
    }
  }, [localVolume, isMuted]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const audioURL = URL.createObjectURL(file);
    const newTrack = {
      id: Date.now(),
      file,
      audioRef: audioRef,
      volume: 1,
      muted: false,
      soloed: false,
      balance: 0,
      url: audioURL,
    };
    onAdd(newTrack);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onUpdate?.({ volume: newVolume });
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const handleHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      const seconds = percent * audioRef.current.duration;
      setHoverTime(seconds);
    }
  };

  const resetHover = () => setHoverTime(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    onUpdate?.({ muted: !isMuted });
  };

  const toggleSolo = () => {
    setIsSoloed(!isSoloed);
    onUpdate?.({ soloed: !isSoloed });
  };

  const handleBalanceChange = (e) => {
    const value = parseInt(e.target.value);
    setBalance(value);
    onUpdate?.({ balance: value });
  };

  const resetBalance = () => {
    setBalance(0);
    onUpdate?.({ balance: 0 });
  };

  if (isEmpty) {
    return (
      <div className="track-unit empty">
        <label className="upload-label">
          {t("track.addTrack")}
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </label>
      </div>
    );
  }

  return (
    <div className="track-unit">
      <audio ref={audioRef} src={track.url} preload="metadata" />

      <div
        className="progress-bar"
        onClick={handleProgressClick}
        onMouseMove={handleHover}
        onMouseLeave={resetHover}
      >
        <div className="progress-indicator" />
        {hoverTime !== null && audioRef.current?.duration && (
          <div
            className="hover-time"
            style={{
              left: `${(hoverTime / audioRef.current.duration) * 100}%`,
            }}
          >
            {Math.floor(hoverTime / 60)}:
            {Math.floor(hoverTime % 60)
              .toString()
              .padStart(2, "0")}
          </div>
        )}
      </div>

      <div className="track-controls">
        <button onClick={onRemove}>{t("track.removeTrack")}</button>

        <button onClick={toggleMute}>
          {isMuted ? t("track.unmute") : t("track.mute")}
        </button>

        <button onClick={toggleSolo}>
          {isSoloed ? t("track.unsolo") : t("track.solo")}
        </button>

        <label>
          {t("track.volume")}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localVolume}
            onChange={handleVolumeChange}
          />
        </label>

        <label>
          {t("track.balance")}
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={balance}
            onChange={handleBalanceChange}
          />
          <span onClick={resetBalance} className="balance-reset">
            {balance === 0 ? t("track.balanceIcon") : balance}
          </span>
        </label>
      </div>
    </div>
  );
};

export default TrackUnit;
