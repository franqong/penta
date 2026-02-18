import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ track, setTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [docked, setDocked] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current) return;

      const rect = placeholderRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Determinamos si el lugar donde debe "aterrizar" la barra ya es visible.
      // Usamos un pequeño margen para que el aterrizaje sea suave.
      const isVisible = rect.top <= viewportHeight - 90;

      if (isVisible) {
        setDocked(true);
      } else {
        setDocked(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Chequeo inicial
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!track) return null;

  return (
    <div className="music-player-placeholder" ref={placeholderRef}>
      <div className={`global-player-container ${docked ? 'docked' : 'floating'}`}>
        <div className="global-player-bar">
          
          {/* IZQUIERDA */}
          <div className="player-info-global">
            <img src={track.image} alt={track.song} />
            <div className="global-details">
              <span className="song">{track.song}</span>
              <span className="artist">{track.artist}</span>
            </div>
          </div>

          {/* CENTRO */}
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

          {/* DERECHA */}
          <div className="player-right-options">
            <button className="close-player" onClick={() => setTrack(null)}>close</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;