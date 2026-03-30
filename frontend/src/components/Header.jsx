import { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!shrink && scrollY > 80) {
        setShrink(true);
      } 
      else if (shrink && scrollY < 40) {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shrink]);

  return (
    <header className={shrink ? "shrink" : ""}>
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

      <div className="header-center">
        <Link to="/">
          <img src="/assets/main/penta.png" alt="PENTA" className="logo" />
        </Link>
      </div>

      <div className="header-right">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <img src="/src/assets/icons/search.png" alt="Search" className="search-icon-inside" />
        </div>

        <div className="user-section">
          <Link to="/profile" className="user-info-link">
            <img
              src="/src/assets/icons/avatar.png"
              alt="username"
            />
            <span className="username">Franco</span>
          </Link>

          <div className="user-menu">
            <div className="menu-divider"></div>
            <Link to="/band" className="user-menu-item">
              <img src="/src/assets/icons/profile-dark.png" alt="Profile" />
              <span>Band</span>
            </Link>
            <div className="menu-divider"></div>
            <Link to="/settings" className="user-menu-item">
              <img src="/src/assets/icons/settings-dark.png" alt="Settings" />
              <span>Settings</span>
            </Link>
            <div className="menu-divider"></div>
            <Link to="/#" className="user-menu-item">
              <img src="/src/assets/icons/logout-dark.png" alt="Logout" />
              <span>Logout</span>
            </Link>
          </div>
        </div>

        {/* <div className="band-section">
          <img
            src="/src/assets/icons/avatar.png"
            alt="band"            
          />
          <span className="bandname">Band</span>
        </div> */}
      </div>
    </header>
  );
}

export default Header;