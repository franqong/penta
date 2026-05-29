import { useState, useEffect } from "react";
import "./Home.css";
import AlbumCard from "../components/features/Album/AlbumCard.jsx";
import ReviewCard from "../components/features/Review/ReviewCard.jsx";
import CommunityCard from "../components/features/Community/CommunityCard.jsx";
import StatCard from "../components/features/Stat/StatCard.jsx";

function Home({ onPlayTrack }) {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // URL de la API de recomendaciones en Python.
    // Asegúrate de que el servicio de Python esté corriendo en el puerto 8000.
    fetch("http://localhost:8000/recommend")
      .then((res) => res.json())
      .then((data) => setRecommendation(data))
      .catch((err) => console.error("Error fetching recommendation:", err));
  }, []);

  return (
    <main className="home-grid">
      
      {/* ----- PHRASE ----- */}
      <div className="heading" style={{ gridColumn: "1 / -1" }}>
        <h1> "What's the worst that I can say? Things are better if I stay <br />
          So long and goodnight, so long not goodnight."
        </h1>
      </div>

      {/* ----- PYTHON RECOMMENDATION ----- */}
      {recommendation && (
        <div className="section recommendation-day" style={{ gridColumn: "1 / -1", backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "20px", borderRadius: "8px", border: "1px solid var(--accent-color)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ color: "var(--accent-color)", marginBottom: "10px" }}>Recomendación de tu API de Python</h2>
              <p>Basado en tus gustos, hoy te sugerimos: <strong>{recommendation.song}</strong> de <strong>{recommendation.artist}</strong> ({recommendation.year})</p>
            </div>
            <button
              onClick={() => onPlayTrack(recommendation)}
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Reproducir ahora
            </button>
          </div>
        </div>
      )}

      {/* ----- POPULAR THIS WEEK ----- */}
      <div className="section">
        <h2>Popular This Week</h2>
        <div className="covers-grid">
          <AlbumCard
            image="/src/assets/covers/SilverSideUp-Nickelback.jpg"
            song="How You Remind Me"
            artist="Nickelback"
            year="2001"
            deezerId="810179"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/Core-StoneTemplePilots.jpg"
            song="Plush"
            artist="Stone Temple Pilots"
            year="1992"
            deezerId="2794367"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/HybridTheory-LinkinPark.jpg"
            song="In the End"
            artist="Linkin Park"
            year="2000"
            deezerId="676183"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/10000Days-Tool.jpg"
            song="The Pot"
            artist="Tool"
            year="2006"
            deezerId="722078382"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/MerDeNoms-APerfectCircle.jpg"
            song="3 Libras"
            artist="A Perfect Circle"
            year="2000"
            deezerId=""
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/Audioslave-Audioslave.jpg"
            song="Like a Stone"
            artist="Audioslave"
            year="2002"
            deezerId=""
            onPlay={onPlayTrack}
          />
        </div>
      </div>

      {/* ----- ALBUMS OF THE MONTH ----- */}
      <div className="section">
        <h2>Albums of the Month</h2>
        <div className="covers-grid">
          <AlbumCard
            image="/src/assets/covers/BlackWaterPark-Opeth.jpg"
            song="Blackwater Park"
            artist="Opeth"
            year="2001"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/FromMarsToSirius-Gojira.jpg"
            song="From Mars to Sirius"
            artist="Gojira"
            year="2005"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/AllHopeIsGone-Slipknot.jpg"
            song="All Hope Is Gone"
            artist="Slipknot"
            year="2008"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/CowboysFromHell-Pantera.jpg"
            song="Cowboys from Hell"
            artist="Pantera"
            year="1990"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/WakingtheFallen-AvengedSevenfold.jpg"
            song="Waking the Fallen"
            artist="Avenged Sevenfold"
            year="2003"
            deezerId=""
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/ThePoison-BulletforMyValentine.jpg"
            song="The Poison"
            artist="Bullet for My Valentine"
            year="2005"
            deezerId=""
            onPlay={onPlayTrack}
          />
        </div>
      </div>

      {/* ----- BEST REVIEWS ----- */}
      <div className="section">
        <h2>Best Reviews</h2>
        <div className="grid-basic">
          <ReviewCard
            title="Three Cheers for Sweet Revenge (2004) &nbsp; • &nbsp; My Chemical Romance"
            comment="Que vuelvan los emos, no les hacemos más bullying."
          />
          <ReviewCard
            title="Dookie (1994) &nbsp; • &nbsp; Green Day"
            comment="Cuando Billie Joe no estaba entongado con el Partido Demócrata."
          />
          <ReviewCard
            title="Made in Japan (1972) &nbsp; • &nbsp; Deep Purple"
            comment="Locura lo del muchachito Ritchie, el solo de Child in Time es otra cosa."
          />
        </div>
      </div>

      {/* ----- COMING SOON ----- */}
      <div className="section">
        <h2>Coming Soon</h2>
        <div className="covers-grid">
          <AlbumCard
            image="/src/assets/covers/MakingLoveToMorganWallen-LimpBizkit.jpg"
            song="Making Love To Morgan Wallen"
            artist="Limp Bizkit"
            year="2025"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/Skeleta-Ghost.jpg"
            song="Skeletá"
            artist="Ghost"
            year="2025"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/TsunamiSea-Spiritbox.jpg"
            song="Tsunami Sea"
            artist="Spiritbox"
            year="2025"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/src/assets/covers/Parasomnia-DreamTheater.jpg"
            song="Parasomnia"
            artist="Dream Theater"
            year="2025"
            onPlay={onPlayTrack}
          />
        </div>
      </div>

      {/* ----- COMMUNITIES ----- */}
      <div className="section">
        <h2>Communities</h2>
        <div className="grid-basic">
          <CommunityCard
            name="Rock Classics"
            description="Debates sobre los mejores discos de rock clásico."
          />
          <CommunityCard
            name="Nu-Metal Heads"
            description="Linkin Park, Korn, Limp Bizkit y más."
          />
          <CommunityCard
            name="Prog Lovers"
            description="Discusión de discos progresivos modernos."
          />
        </div>
      </div>

      {/* ----- YOUR SPACE ----- */}
      <div className="section">
        <h2>Your Space</h2>
        <div className="grid-basic">
          <StatCard title="Canción más escuchada" value="In the End" />
          <StatCard title="Álbum más escuchado" value="Hybrid Theory" />
          <StatCard title="Comunidad más activa" value="Rock Classics" />
        </div>
      </div>

      {/* ----- SUGGESTED PLAYLIST ----- */}
      
      {/* <div className="section deezer-wrapper" style={{ gridColumn: "1 / -1" }}>
        <h2>Playlist destacada</h2>
        <iframe
          className="deezer-player"
          title="deezer-widget"
          src="https://widget.deezer.com/widget/dark/playlist/1306931615?tracklist=false"
          width="100%"
          height="150"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media; clipboard-write"
        ></iframe>
      </div> */}
    </main>
  );
}

export default Home;