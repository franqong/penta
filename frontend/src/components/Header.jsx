import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>

      {/* ----- LEFT ------ */}
      <div className="header-left">
        <Link to="/songs">
          <img src="/src/assets/icons/wave-sound.png" alt="Canciones" />
        </Link>
        <Link to="/albums">
          <img src="/src/assets/icons/music.png" alt="Álbumes" />
        </Link>
        <Link to="/reviews">
          <img src="/src/assets/icons/speech-bubble.png" alt="Reviews" />
        </Link>
      </div>

      {/* ----- CENTER ----- */}
      <div className="header-center">
        <Link to="/">
          <img src="/assets/main/penta.png" alt="PENTA" className="logo" />
        </Link>
      </div>

      {/* ----- RIGHT ----- */}
      <div className="header-right">
        <div className="user-section">
          <img
            src="/src/assets/icons/avatar.png"
            alt="username"            
          />
          <span className="username">Franco</span>

          {/* ----- DESPLEGABLE ----- */}
          <div className="user-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/#">Logout</Link>
          </div>
        </div>

          {/* ----- SEARCH ----- */}
        <Link to="/search">
          <img
            src="/src/assets/icons/search.png"
            alt="Search"            
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;