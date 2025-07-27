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
              <button
                className="remove-slot-button"
                onClick={() => removeSlot(slot.id)}
              >
                {t("modals.cancel")}
              </button>
            </div>
            {/* Future content of slot can be rendered here */}

            {index === slots.length - 1 && (
              <button className="add-slot-button" onClick={addSlot}>
                {t("controls.addTrack")}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotContainer;
