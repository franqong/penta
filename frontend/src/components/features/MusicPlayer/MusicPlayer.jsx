import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './MusicPlayer.css';

function MusicPlayer({ track, setTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dockedByScroll, setDockedByScroll] = useState(false);
  const placeholderRef = useRef(null);
  const location = useLocation();

  const docked = dockedByScroll || isMinimized;

  useEffect(() => {
    setIsMinimized(false);
  }, [track]);

  useEffect(() => {
    const handleScroll = () => {
      if (!placeholderRef.current) return;

      const rect = placeholderRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isVisible = rect.top <= viewportHeight - 80;

      setDockedByScroll(prev => prev !== isVisible ? isVisible : prev);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Pequeño delay para asegurar la posición tras el render
    handleScroll();
    const timeoutId = setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [location]);

  if (!track) return null;
  
  const VisualContent = track.image;

  return (
    <div className="music-player-placeholder" ref={placeholderRef}>
      <div className={`global-player-container ${docked ? 'docked' : 'floating'}`}>
        <div className="global-player-bar">
          
          {/* LEFT */}
          <div className="player-info-global">
            {/* 2. Renderizado condicional híbrido */}
            <div className="player-visual-wrapper">
              {typeof VisualContent === 'string' ? (
                <img src={VisualContent} alt={track.song} />
              ) : (
                <VisualContent />
              )}
            </div>

            <div className="global-details">
              <span className="song">{track.song}</span>
              <span className="artist">{track.artist}</span>
            </div>
          </div>

          {/* CENTER */}
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

          {/* RIGHT */}
          <div className="player-right-options">
            {isMinimized ? (
              <button className="minimize-player" onClick={() => setIsMinimized(false)}>
                restore
              </button>
            ) : (
              !dockedByScroll && (
                <button className="minimize-player" onClick={() => setIsMinimized(true)}>
                  minimize
                </button>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;