import "./Songs.css";
import AlbumCard from "../components/features/Album/AlbumCard.jsx";
import { Link } from "react-router-dom";

function SongsPage({ onPlayTrack }) {
  return (
    <main className="songs-layout">
      {/* ----- WEEK ----- */}

      <div className="songs-section">
        <h2>Songs of the Week</h2>
        <div className="songs-covers-grid">
          <AlbumCard
            image="/covers/SilverSideUp-Nickelback.jpg"
            song="How You Remind Me"
            artist="Nickelback"
            year="2001"
            deezerId="810179"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/covers/Core-StoneTemplePilots.jpg"
            song="Plush"
            artist="Stone Temple Pilots"
            year="1992"
            deezerId="2794367"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/covers/HybridTheory-LinkinPark.jpg"
            song="In the End"
            artist="Linkin Park"
            year="2000"
            deezerId="676183"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/covers/10000Days-Tool.jpg"
            song="The Pot"
            artist="Tool"
            year="2006"
            deezerId="722078382"
            onPlay={onPlayTrack}
          />
          <AlbumCard
            image="/covers/MerDeNoms-APerfectCircle.jpg"
            song="3 Libras"
            artist="A Perfect Circle"
            year="2000"
            deezerId=""
            onPlay={onPlayTrack}
          />          
        </div>
      </div>
    </main>
  );
}

export default SongsPage;
