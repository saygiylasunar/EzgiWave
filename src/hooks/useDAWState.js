// src/hooks/useDawState.jsx
import { useRef, useState } from "react";

const useDAWState = () => {
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [globalVolume, setGlobalVolume] = useState(1);
  const [bpm, setBpm] = useState(null);
  const [note, setNote] = useState(null);
  const trackRefs = useRef({});

  const addTrack = (track) => {
    setTracks((prev) => [...prev, track]);
  };

  const removeTrack = (id) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
    delete trackRefs.current[id];
  };

  const updateTrack = (id, data) => {
    setTracks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const setTrackRef = (id, ref) => {
    trackRefs.current[id] = ref;
  };

  const playAll = () => {
    Object.values(trackRefs.current).forEach((ref) => {
      try {
        ref.current?.play?.();
      } catch {}
    });
    setIsPlaying(true);
  };

  const pauseAll = () => {
    Object.values(trackRefs.current).forEach((ref) => {
      try {
        ref.current?.pause?.();
      } catch {}
    });
    setIsPlaying(false);
  };

  const rewindAll = () => {
    Object.values(trackRefs.current).forEach((ref) => {
      try {
        ref.current.currentTime = 0;
      } catch {}
    });
  };

  const setAllVolume = (vol) => {
    Object.values(trackRefs.current).forEach((ref) => {
      if (ref?.current && !isNaN(vol)) {
        ref.current.volume = vol;
      }
    });
    setGlobalVolume(vol);
  };

  const analyzeTracks = () => {
    // Bu kısım gerçek analiz fonksiyonu entegresiyle değiştirilecek
    setBpm(120); // örnek değer
    setNote("C#"); // örnek değer
  };

  return {
    tracks,
    isPlaying,
    globalVolume,
    bpm,
    note,
    addTrack,
    removeTrack,
    updateTrack,
    setTrackRef,
    playAll,
    pauseAll,
    rewindAll,
    setAllVolume,
    analyzeTracks,
  };
};

export default useDAWState;
