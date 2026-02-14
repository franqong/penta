import React, { useState } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ track, setTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="global-player-container">
      <div className="global-player-bar">
        
        {/* IZQUIERDA: Info de la canción */}
        <div className="player-info-global">
          <img src={track.image} alt={track.song} />
          <div className="global-details">
            <span className="song">{track.song}</span>
            <span className="artist">{track.artist}</span>
          </div>
        </div>

        {/* CENTRO: Controles esenciales y barra de progreso */}
        <div className="player-center-controls">
          <div className="control-buttons">
            <button className="btn-skip">prev</button>
            <button 
              className="btn-play-pause" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'pause' : 'play'}
            </button>
            <button className="btn-skip">next</button>
          </div>
          
          <div className="playback-bar-container">
            <span className="time">0:00</span>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="time">3:30</span>
          </div>
        </div>

        {/* DERECHA: Cerrar */}
        <div className="player-right-options">
          <button className="close-player" onClick={() => setTrack(null)}>close</button>
        </div>

      </div>
    </div>
  );
}

export default MusicPlayer;