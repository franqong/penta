import { Link } from "react-router-dom";
import { FaXTwitter, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import './Footer.css';

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
            <FaXTwitter />
          </Link>
          <Link to="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </Link>
          <Link to="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </Link>
          <Link to="https://tiktok.com" target="_blank" rel="noreferrer">
            <FaTiktok />
          </Link>
          <Link to="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
