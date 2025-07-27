import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/TrackUnit.scss";
import WaveSurfer from "wavesurfer.js";

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
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const waveContainerRef = useRef(null);
  const waveSurferRef = useRef(null);
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
      audioRef.current.volume = isMuted
        ? 0
        : isNaN(localVolume)
        ? 0
        : localVolume;
    }
  }, [localVolume, isMuted]);

  useEffect(() => {
    if (audioRef.current && audioRef.current.src) {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
      waveSurferRef.current = WaveSurfer.create({
        container: waveContainerRef.current,
        waveColor: "#444",
        progressColor: "#00f0ff",
        cursorColor: "#fff",
        height: 64,
        normalize: true,
        responsive: true,
      });

      waveSurferRef.current.load(audioRef.current.src);

      waveSurferRef.current.on("seek", (progress) => {
        if (audioRef.current.duration) {
          audioRef.current.currentTime = progress * audioRef.current.duration;
        }
      });
    }
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [track?.url]);

  useEffect(() => {
    if (audioRef.current) {
      const ctx = audioContextRef.current;
      const source = ctx.createMediaElementSource(audioRef.current);
      const panner = ctx.createStereoPanner();
      panner.pan.value = balance / 100;
      source.connect(panner).connect(ctx.destination);
    }
  }, [balance]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const audioURL = URL.createObjectURL(file);
    const newTrack = {
      id: Date.now(),
      file,
      url: audioURL,
      volume: 1,
      muted: false,
      soloed: false,
      balance: 0,
    };
    onAdd(newTrack);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onUpdate?.({ volume: newVolume });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    onUpdate?.({ muted: !isMuted });
  };

  const toggleSolo = () => {
    setIsSoloed(!isSoloed);
    onUpdate?.({ soloed: !isSoloed });
  };

  const handleBalanceChange = (e) => {
    const value = parseFloat(e.target.value);
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
      <audio
        ref={audioRef}
        src={track.url}
        preload="metadata"
        onLoadedMetadata={() => {
          if (isNaN(audioRef.current.duration)) {
            audioRef.current.currentTime = 0;
          }
        }}
      />

      <div className="waveform-container" ref={waveContainerRef}></div>

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
