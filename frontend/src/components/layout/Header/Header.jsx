import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiWaveformBold, PiVinylRecord, PiArticleNyTimes, PiMagnifyingGlassBold, PiUserCircleFill } from "react-icons/pi";
import { PentaLogo, BandIcon, SettingsIcon, LogoutIcon } from "../../ui/icons";
import "./Header.css";

function Header() {
  const [shrink, setShrink] = useState(false);

  const navLinks = [
    { to: "/songs", Icon: PiWaveformBold },
    { to: "/albums", Icon: PiVinylRecord },
    { to: "/reviews", Icon: PiArticleNyTimes },
  ];

  const userMenuLinks = [
    { to: "/band", Icon: BandIcon, label: "Band" },
    { to: "/settings", Icon: SettingsIcon, label: "Settings" },
    { to: "/#", Icon: LogoutIcon, label: "Logout" },
  ];

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
        {navLinks.map(({ to, Icon }) => (
          <Link key={to} to={to}>
            <Icon />
          </Link>
        ))}
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
            {userMenuLinks.map(({ to, Icon, label }, index) => (
              <div key={to}>
                {index > 0 && <div className="menu-divider"></div>}
                <Link to={to} className="user-menu-item">
                  <Icon />
                  <span>{label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;