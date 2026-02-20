import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

function App() {
  const [track, setTrack] = useState({
  image: "/src/assets/icons/vinyl.png", // Imagen por defecto en el reproductor
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
          </Routes>
        </main>
        <MusicPlayer track={track} setTrack={setTrack} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
