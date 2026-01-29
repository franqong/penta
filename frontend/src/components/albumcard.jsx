import { useNavigate } from 'react-router-dom';
import vinylIcon from '../assets/icons/vinyl.png';

function AlbumCard({ image, song, artist, year }) {
  const navigate = useNavigate();

  return (
    <div className="album-card">
      <div className="album-wrapper">
        {/* Vinilo */}
        <div 
          className="vinyl-disk"
          onClick={() => navigate('/album-details')} 
          role="button"
          tabIndex={0}
        >
          <img src={vinylIcon} alt="Vinyl" />
        </div>

        {/* Imágen del álbum & overlay */}
        <div className="image-container">
          <img src={image} alt={song} className="album-cover" />
          
          <div className="album-overlay">
            <span className="overlay-song">{song}</span>
            <span className="overlay-artist">{artist}</span>
            <span className="overlay-year">{year}</span>
          </div>
        </div>
      </div>

      {/* Minireproductor */}
      <div className="album-controls">
        <button className="icon-btn play-btn" aria-label="Play">
          ▶
        </button>
        <button className="icon-btn options-btn" aria-label="Options">
          ⋮
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;
