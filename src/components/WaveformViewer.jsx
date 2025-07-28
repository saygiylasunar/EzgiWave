// src/components/WaveformViewer.jsx
import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformViewer = ({ audioUrl }) => {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) return;

    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#4fd1c5",
      progressColor: "#805ad5",
      cursorColor: "#f6ad55",
      barWidth: 2,
      barRadius: 2,
      height: 64,
      responsive: true,
    });

    waveSurferRef.current.load(audioUrl);

    return () => waveSurferRef.current?.destroy();
  }, [audioUrl]);

  return <div className="waveform-container" ref={containerRef}></div>;
};

export default WaveformViewer;
