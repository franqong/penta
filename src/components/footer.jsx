function Footer() {
  return (
    <footer>
      <div className="footer-container">
        
        {/* IZQUIERDA - LINKS */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/apps">Apps</a>
          <a href="/contact">Contact</a>
          <a href="/downloads">Downloads</a>
        </div>

        {/* DERECHA - SOCIAL MEDIA */}
        <div className="footer-socials">
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/x.png" alt="X" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/fb.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/ig.png" alt="Instagram" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/tt.png" alt="TikTok" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/yt.png" alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
