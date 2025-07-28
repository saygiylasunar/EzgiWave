// src/components/SlotContainer.jsx
import React, { useState } from "react";
import "../styles/components/SlotContainer.scss";
import { useTranslation } from "react-i18next";

const SlotContainer = () => {
  const { t } = useTranslation();
  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    setSlots([...slots, { id: Date.now() }]);
  };

  const removeSlot = (id) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  return (
    <div className="slot-container-wrapper">
      <div className="slot-container">
        {slots.length === 0 && (
          <button className="add-slot-button" onClick={addSlot}>
            {t("controls.addTrack")}
          </button>
        )}

        {slots.map((slot, index) => (
          <div className="slot" key={slot.id}>
            <div className="slot-header">
              <span>
                {t("track.track")} #{index + 1}
              </span>

              {/* Instrument Icon Placeholder */}
              <div className="instrument-icon" title="Detected Instrument">
                🎸
              </div>

              <button
                className="remove-slot-button"
                onClick={() => removeSlot(slot.id)}
              >
                {t("modals.cancel")}
              </button>
            </div>

            <div className="slot-controls">
              <div className="toggle-buttons">
                <button className="slot-toggle">S</button>
                <button className="slot-toggle">M</button>
              </div>

              <div className="sliders">
                <div className="slider-group">
                  <label>Vol</label>
                  <input type="range" min="0" max="100" defaultValue="80" />
                </div>
                <div className="slider-group">
                  <label>Pan</label>
                  <input type="range" min="-50" max="50" defaultValue="0" />
                </div>
              </div>
            </div>

            {/* Track Progress Bar (visual only for now) */}
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "45%" }}></div>
            </div>
          </div>
        ))}

        {slots.length > 0 && (
          <div className="add-track-container">
            <button className="add-slot-button" onClick={addSlot}>
              {t("controls.addTrack")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotContainer;
