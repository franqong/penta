import { useNavigate } from 'react-router-dom';
import vinylIcon from '../assets/icons/vinyl.png';

function AlbumCard({ image, song, artist, year, deezerId }) {
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

      {/* Reproductor Real de Deezer */}
      <div className="album-player">
        <iframe
          title={`deezer-player-${deezerId}`}
          src={`https://widget.deezer.com/widget/dark/track/${deezerId}?tracklist=false`}
          width="100%"
          height="150"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media; clipboard-write"
        ></iframe>
      </div>
    </div>
  );
}

export default AlbumCard;
