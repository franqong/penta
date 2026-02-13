import { useState } from "react"; // <--- Faltaba esto
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

function App() {
  const [track, setTrack] = useState({
  image: "https://via.placeholder.com/45", // Imagen por defecto
  song: "Selecciona una canción",
  artist: "Artista",
  deezerId: null
});

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
