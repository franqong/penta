import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import SongsPage from "./pages/Songs.jsx";
import MusicPlayer from "./components/features/MusicPlayer/MusicPlayer.jsx";
import { VinylIcon } from "./components/ui/icons";

function App() {
  const [track, setTrack] = useState({
    image: VinylIcon,
    song: "Selecciona una canción",
    artist: "Artista",
    deezerId: null
  });

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onPlayTrack={setTrack} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/songs" element={<SongsPage />} />
          </Routes>
        </main>
        <MusicPlayer track={track} setTrack={setTrack} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
