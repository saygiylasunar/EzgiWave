import React from "react";
import GlobalControls from "./components/GlobalControls";
import TrackUnit from "./components/TrackUnit";
import useDAWState from "./hooks/useDAWState";
import "./styles/main.scss";

const App = () => {
  const {
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
    updateTrackVolume,
    setTrackAudioRef,
  } = useDAWState();

  return (
    <div className="app-container">
      <h1>EzgiWave</h1>

      <div className="track-list">
        {tracks.length === 0 ? (
          <TrackUnit
            isEmpty
            onAdd={(newTrack) => setTracks([...tracks, newTrack])}
          />
        ) : (
          tracks.map((track, index) => (
            <TrackUnit
              key={track.id}
              index={index}
              track={track}
              onUpdate={(updated) => {
                const updatedTracks = [...tracks];
                updatedTracks[index] = { ...updatedTracks[index], ...updated };
                setTracks(updatedTracks);
              }}
              onRemove={() => {
                const updated = [...tracks];
                updated.splice(index, 1);
                setTracks(updated);
              }}
              onRef={(ref) => setTrackAudioRef(track.id, ref)}
            />
          ))
        )}
      </div>

      <GlobalControls
        isPlaying={isPlaying}
        onPlayPause={() => (isPlaying ? pauseAll() : playAll())}
        onRewindAll={rewindAll}
        currentTime={currentTime}
        duration={duration}
        masterVolume={masterVolume}
        onMasterVolumeChange={setMasterVolume}
        detectInfo={detectInfo}
      />
    </div>
  );
};

export default App;
