function Header() {
  return (
    <header>
      {/* ----- HEADER LEFT ------ */}
      <div className="header-left">
        <a href="/songs">
          <img src="/src/assets/icons/wave-sound.png" alt="Canciones" />
        </a>
        <a href="/albums">
          <img src="/src/assets/icons/music.png" alt="Álbumes" />
        </a>
        <a href="/reviews">
          <img src="/src/assets/icons/speech-bubble.png" alt="Reviews" />
        </a>
      </div>

      {/* ----- CENTRO ----- */}
      <div className="header-center">
        <img src="/src/assets/main/penta.png" alt="PENTA" className="logo" />
      </div>

      {/* ----- HEADER RIGHT ----- */}
      <div className="header-right">
        <div className="user-section">
          <a href="/profile">
          <img
            src="/src/assets/icons/avatar.png"
            alt="username"
            className="icon"
          />
          </a>
          <span className="username">Franco</span>

          {/* ----- DESPLEGABLE ----- */}
          <div className="user-menu">
            <p>Profile</p>
            <p>Settings</p>
            <p>Logout</p>
          </div>
        </div>

        <a href="/search">
        <img src="/src/assets/icons/search.png" alt="Search" className="icon" />
        </a>
      </div>
    </header>
  );
}

export default Header;
