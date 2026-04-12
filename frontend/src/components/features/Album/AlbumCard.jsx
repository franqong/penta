import { useNavigate } from 'react-router-dom';
import vinylIcon from '../../../assets/icons/vinyl.png';

function AlbumCard({ image, song, artist, year, deezerId, onPlay }) {
  const navigate = useNavigate();

  return (
    <div className="album-card">
      <div className="album-wrapper">
        <div className="vinyl-disk" onClick={() => navigate('/album-details')}>
          <img src={vinylIcon} alt="Vinyl" />
        </div>

        <div className="image-container">
          <img src={image} alt={song} className="album-cover" />
          <div className="album-overlay">
            <span className="overlay-song">{song}</span>
            <span className="overlay-artist">{artist}</span>
            <span className="overlay-year">{year}</span>
          </div>
        </div>
      </div>

      {/* Mini barra*/}
      <div className="album-player">
        <button 
          className="mini-btn-play" 
          onClick={() => onPlay({ image, song, artist, deezerId })}
        >
          ▶
        </button>
        <button className="mini-btn-options">⋮</button>
      </div>
    </div>
  );
}

export default AlbumCard;