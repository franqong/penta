import { useNavigate } from 'react-router-dom';
import { VinylIcon } from "../../ui/icons";

function AlbumTest({ image, song, artist, year, deezerId, onPlay }) {
  const navigate = useNavigate();

  return (
    <div className="songs-album-card">
      <div className="songs-album-wrapper">
        <div className="songs-vinyl-disk" onClick={() => navigate('/songs-album-details')}>
          <VinylIcon />
        </div>

        <div className="songs-image-container">
          <img src={image} alt={song} className="songs-album-cover" />
          <div className="songs-album-overlay">
            <span className="songs-overlay-song">{song}</span>
            <span className="songs-overlay-artist">{artist}</span>
            <span className="songs-overlay-year">{year}</span>
          </div>
        </div>
      </div>

      {/* Mini barra*/}
      <div className="songs-album-player">
        <button 
          className="songs-mini-btn-play" 
          onClick={() => onPlay({ image, song, artist, deezerId })}
        >
          ▶
        </button>
        <button className="songs-mini-btn-options">⋮</button>
      </div>
    </div>
  );
}

export default AlbumTest;