// src/hooks/useDAWState.js
import { useState, useRef, useEffect } from "react";

const useDAWState = () => {
  const [tracks, setTracks] = useState([]); // her track { id, audioRef, file, volume, muted, soloed, balance }
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [detectInfo, setDetectInfo] = useState({ bpm: null, note: null });

  const updateDurations = () => {
    const maxDuration = tracks.reduce((max, t) => {
      if (t.audioRef?.current) {
        return Math.max(max, t.audioRef.current.duration || 0);
      }
      return max;
    }, 0);
    setDuration(maxDuration);
  };

  const playAll = () => {
    tracks.forEach((t) => {
      if (t.audioRef?.current) {
        t.audioRef.current.play();
      }
    });
    setIsPlaying(true);
  };

  const pauseAll = () => {
    tracks.forEach((t) => {
      if (t.audioRef?.current) {
        t.audioRef.current.pause();
      }
    });
    setIsPlaying(false);
  };

  const rewindAll = () => {
    tracks.forEach((t) => {
      if (t.audioRef?.current) {
        t.audioRef.current.currentTime = 0;
      }
    });
    setCurrentTime(0);
  };

  const updateTrackVolume = (id, volume) => {
    setTracks((prev) => prev.map((t) => (t.id === id ? { ...t, volume } : t)));
  };

  const setTrackAudioRef = (id, ref) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, audioRef: ref } : t))
    );
  };

  useEffect(() => {
    if (tracks.length > 0) {
      updateDurations();
    }
  }, [tracks]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        const maxTime = Math.max(
          ...tracks.map((t) => t.audioRef?.current?.currentTime || 0)
        );
        setCurrentTime(maxTime);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, tracks]);

  return {
    tracks,
    setTracks,
    isPlaying,
    playAll,
    pauseAll,
    rewindAll,
    masterVolume,
    setMasterVolume,
    currentTime,
    duration,
    detectInfo,
    setDetectInfo,
    updateTrackVolume,
    setTrackAudioRef,
  };
};

export default useDAWState;
