import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
      {/* ----- LEFT - PROFILE ----- */}

      <div className="section">
        <div className="profile-left">
          <img
            src="/src/assets/icons/avatar.png"
            alt="Foto de perfil"
            className="profile-avatar"
          />

          <div className="profile-info">
            <h1 className="profile-name">Franco</h1>
            <p className="profile-bio">
              Hermética no es la mejor banda heavy de Argentina. No escucho
              lloros.
            </p>
            <p className="profile-location">📍 Santa Fe, Argentina</p>
          </div>
        </div>
      </div>

      {/* ----- RIGHT - STATS ----- */}
      <div className="section">
        <div className="profile-right">
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">45</span>
              <span className="stat-label">Reviews</span>
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
    </div>
  );
}

export default Profile;
