import React from "react";
import GlobalControls from "./components/GlobalControls";
import TrackUnit from "./components/TrackUnit";
import useDAWState from "./hooks/useDAWState";
import "./styles/App.scss";
import { useTranslation } from "react-i18next";

const App = () => {
  const {
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
  } = useDAWState();

  const { t } = useTranslation();

  return (
    <div className="app">
      <h1>{t("app.title")}</h1>

      <div className="tracks-wrapper">
        {tracks.length === 0 ? (
          <TrackUnit isEmpty onAdd={addTrack} />
        ) : (
          tracks.map((track, idx) => (
            <TrackUnit
              key={track.id}
              index={idx}
              track={track}
              onRemove={() => removeTrack(track.id)}
              onUpdate={(data) => updateTrack(track.id, data)}
              onRef={(ref) => setTrackRef(track.id, ref)}
              onAdd={addTrack}
            />
          ))
        )}
      </div>

      <GlobalControls
        isPlaying={isPlaying}
        onPlay={playAll}
        onPause={pauseAll}
        onRewind={rewindAll}
        onSetVolume={setAllVolume}
        globalVolume={globalVolume}
        bpm={bpm}
        note={note}
        onDetect={analyzeTracks}
      />
    </div>
  );
};

export default App;
