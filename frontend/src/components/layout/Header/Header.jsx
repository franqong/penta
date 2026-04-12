import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiWaveformBold, PiVinylRecord, PiArticleNyTimes, PiMagnifyingGlassBold, PiUserCircleFill } from "react-icons/pi";
import { PentaLogo } from "../../ui/icons";
import "./Header.css";

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
          <PiWaveformBold />
        </Link>
        <Link to="/albums">
          <PiVinylRecord />
        </Link>
        <Link to="/reviews">
          <PiArticleNyTimes />
        </Link>
      </div>

      <div className="header-center">
        <Link to="/">
          <PentaLogo className="logo" />
        </Link>
      </div>

      <div className="header-right">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <PiMagnifyingGlassBold className="search-icon-inside"/>
        </div>

        <div className="user-section">
          <Link to="/profile" className="user-info-link">
            <PiUserCircleFill className="user-avatar-icon" />
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