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
        <div className="user-section">
          <img
            src="/src/assets/icons/avatar.png"
            alt="username"            
          />
          <span className="username">Franco</span>

          <div className="user-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/#">Logout</Link>
          </div>
        </div>

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