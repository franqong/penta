import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        
        {/* ----- LEFT ----- */}
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/news">News</Link>
          <Link to="/apps">Apps</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/downloads">Downloads</Link>
        </div>

        {/* ----- RIGHT ----- */}
        <div className="footer-socials">
          <Link to="https://x.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/x.png" alt="X" />
          </Link>
          <Link to="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/fb.png" alt="Facebook" />
          </Link>
          <Link to="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/ig.png" alt="Instagram" />
          </Link>
          <Link to="https://tiktok.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/tt.png" alt="TikTok" />
          </Link>
          <Link to="https://youtube.com" target="_blank" rel="noreferrer">
            <img src="/src/assets/icons/yt.png" alt="YouTube" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
