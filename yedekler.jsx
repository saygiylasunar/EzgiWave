            <div className="slot-controls-compact">
              <button
                className={`control-btn ${slot.solo ? "active" : ""}`}
                onClick={() => updateSlot(slot.id, { solo: !slot.solo })}
                title="Solo"
              >
                S
              </button>
              <button
                className={`control-btn ${slot.mute ? "active" : ""}`}
                onClick={() => updateSlot(slot.id, { mute: !slot.mute })}
                title="Mute"
              >
                M
              </button>
              <span className="instrument-icon" title="Instrument">
                🎹
              </span>

              <input
                type="range"
                min="0"
                max="100"
                value={slot.volume}
                onChange={(e) =>
                  updateSlot(slot.id, { volume: parseInt(e.target.value) })
                }
                className="volume-slider tiny"
                title="Volume"
              />

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
            <div className="slot-controls">
              <button
                className={`control-btn ${slot.mute ? "active" : ""}`}
                onClick={() => updateSlot(slot.id, { mute: !slot.mute })}
              >
                M
              </button>
              <button
                className={`control-btn ${slot.solo ? "active" : ""}`}
                onClick={() => updateSlot(slot.id, { solo: !slot.solo })}
              >
                S
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={slot.volume}
                onChange={(e) =>
                  updateSlot(slot.id, { volume: parseInt(e.target.value) })
                }
                className="volume-slider"
                title="Volume"
              />

              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={slot.pan}
                onChange={(e) =>
                  updateSlot(slot.id, { pan: parseFloat(e.target.value) })
                }
                className="pan-slider"
                title="Stereo Pan"
              />

              <div className="detect-placeholder" title="Detection Icon">
                🎤
              </div>
            </div>
            {slot.fileName && (
              <div className="slot-filename">🎧 {slot.fileName}</div>
            )}
            <div className="progress-bar-wrapper">
              <input
                type="range"
                min="0"
                max="100"
                value={slot.progress}
                onChange={(e) =>
                  updateSlot(slot.id, {
                    progress: parseFloat(e.target.value),
                  })
                }
                className="progress-bar"
              />
            </div>

            {/* 🎧 WAVEFORM */}
            {slot.file && (
              <WaveformViewer audioUrl={URL.createObjectURL(slot.file)} />
            )}
          </div>
        ))}