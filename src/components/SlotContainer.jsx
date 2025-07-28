// src/components/SlotContainer.jsx
import React, { useState } from "react";
import "../styles/components/SlotContainer.scss";
import { useTranslation } from "react-i18next";
import WaveformViewer from "./WaveformViewer"; // 📈 waveform entegre

const SlotContainer = () => {
  const { t } = useTranslation();
  const [slots, setSlots] = useState([]);

  const addSlot = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const newSlot = {
          id: Date.now(),
          file,
          fileName: file.name,
          progress: 0,
          volume: 100,
          pan: 0,
          mute: false,
          solo: false,
        };
        setSlots((prev) => [...prev, newSlot]);
      }
    };
  };

  const removeSlot = (id) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  const updateSlot = (id, changes) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, ...changes } : slot))
    );
  };

  return (
    <div className="slot-container-wrapper">
      <div className="slot-container">
        {slots.map((slot, index) => (
          <div className="slot" key={slot.id}>
            {/* ÜST BAR */}
            <div className="slot-header">
              <span>🎵 Track #{index + 1}</span>
              <span className="slot-filename">{slot.fileName}</span>
              <button
                className="remove-slot-button"
                onClick={() => removeSlot(slot.id)}
              >
                {t("modals.cancel")}
              </button>
            </div>

            {/* ANA YAPI */}
            <div className="slot-body">
              {/* ALT BLOK: waveform + kontroller */}
              <div className="slot-bottom">
                {/* Sol: waveform */}
                <div className="slot-waveform">
                  {slot.file && (
                    <WaveformViewer audioUrl={URL.createObjectURL(slot.file)} />
                  )}
                </div>

                {/* Sağ: 3 satırlı kontroller */}
                <div className="slot-control-blocks">
                  <div className="slot-controls-compact">
                    <button
                      className={`control-btn ${slot.solo ? "active" : ""}`}
                      onClick={() => updateSlot(slot.id, { solo: !slot.solo })}
                      title="Solo"
                    >
                      S
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={slot.volume}
                      onChange={(e) =>
                        updateSlot(slot.id, {
                          volume: parseInt(e.target.value),
                        })
                      }
                      className="volume-slider tiny"
                      title="Volume"
                    />
                  </div>

                  <div className="slot-controls-compact">
                    <button
                      className={`control-btn ${slot.mute ? "active" : ""}`}
                      onClick={() => updateSlot(slot.id, { mute: !slot.mute })}
                      title="Mute"
                    >
                      M
                    </button>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.01"
                      value={slot.pan}
                      onChange={(e) =>
                        updateSlot(slot.id, { pan: parseFloat(e.target.value) })
                      }
                      className="pan-slider tiny"
                      title="Stereo Pan"
                    />
                  </div>

                  <div className="slot-controls-compact">
                    <span className="instrument-icon" title="Instrument">
                      🎹
                    </span>
                    <span className="bpm-placeholder">BPM: —</span>
                    <span className="note-placeholder">🎵 C#</span>
                  </div>
                </div>
              </div>
            </div>
            {/* WAVEFORM */}
            {slot.file && (
              <WaveformViewer audioUrl={URL.createObjectURL(slot.file)} />
            )}
          </div>
        ))}
        {/* ➕ Add Track */}
        <div className="add-track-container">
          <button className="add-slot-button" onClick={addSlot}>
            {t("controls.addTrack")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotContainer;
