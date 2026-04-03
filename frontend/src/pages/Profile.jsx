import { Link } from "react-router-dom";
import { PiUserCircleFill, PiSealCheckFill, PiMapPinAreaFill } from "react-icons/pi";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
      {/* ----- LEFT - PROFILE ----- */}

      <div className="section">
        <div className="profile-left">
          <PiUserCircleFill className="profile-avatar"/>

          <div className="profile-info">
            <div className="profile-info-user">
              <h1 className="profile-name">Franco</h1>
              <PiSealCheckFill />
              <Link to="/band" className="band-info">
                Black Label Society
              </Link>
            </div>
            <h1 className="profile-user">@franqo</h1>
            <p className="profile-bio">
              Hermética no es la mejor banda heavy de Argentina. No escucho
              lloros.
            </p>
            <p className="profile-location"> <PiMapPinAreaFill /> Santa Fe, Argentina</p>
          </div>
        </div>
      </div>

      {/* ----- RIGHT - STATS ----- */}
      <div className="section">
        <div className="profile-right">
          <div className="profile-stats">
            <div className="stat">
              <span className="follow-button">Follow</span>
              <span className="follows-you">Follows you</span>
            </div>
            <div className="stat">
              <span className="stat-number">120</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-number">98</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-buttons" style={{ gridColumn: "1 / -1" }}>
        <Link to="/reviews" className="buttons">
          Reviews
        </Link>
        <Link to="/communities" className="buttons">
          Communities
        </Link>
        <Link to="/songs" className="buttons">
          Songs
        </Link>
        <Link to="/albums" className="buttons">
          Albums
        </Link>
        <Link to="/band" className="buttons">
          Band
        </Link>
      </div>
    </div>
  );
}

export default Profile;
