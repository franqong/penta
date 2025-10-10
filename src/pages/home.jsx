import AlbumCard from "../components/AlbumCard.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import CommunityCard from "../components/CommunityCard.jsx";
import StatCard from "../components/StatCard.jsx";

function Home() {
  return (
    <div className="home-grid">
      
      {/* ----- PHRASE ----- */}
      <div class="heading" style={{ gridColumn: "1 / -1" }}>
        <h1> "What's the worst that I can say? Things are better if I stay <br />
          So long and goodnight, so long not goodnight."
        </h1>
      </div>

      {/* ----- POPULAR THIS WEEK ----- */}
      <div className="section">
        <h2>Popular This Week</h2>
        <div className="album-grid">
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/a/aa/Nickelback_-_Silver_Side_Up_-_CD_cover.jpg"
            title="How You Remind Me"
          />
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/1/19/Stonetemplepilotscore.jpeg"
            title="Plush"
          />
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
            title="In the End"
          />
          <AlbumCard
            image="https://akamai.sscdn.co/uploadfile/letras/albuns/4/8/b/f/17846.jpg"
            title="The Pot"
          />
        </div>
      </div>

      {/* ----- ALBUMS OF THE MONTH ----- */}
      <div className="section">
        <h2>Albums of the Month</h2>
        <div className="album-grid">
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/4/45/Blackwaterpark.jpg"
            title="Blackwater Park (2001)"
          />
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/f/f6/From_Mars_to_Sirius.jpg"
            title="From Mars to Sirius (2005)"
          />
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/a/a9/All_Hope_is_Gone_%28original%29.jpg"
            title="All Hope Is Gone (2008)"
          />
          <AlbumCard
            image="https://upload.wikimedia.org/wikipedia/en/a/a8/CowboysFromHell.jpg"
            title="Cowboys from Hell (1990)"
          />
        </div>
      </div>

      {/* ----- BEST REVIEWS ----- */}
      <div className="section">
        <h2>Best Reviews</h2>
        <div className="review-grid">
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
        <div className="album-grid">
          <AlbumCard
            image="https://i.scdn.co/image/ab67616d0000b273116f4de21acf6c25910fda92"
            title="Making Love To Morgan Wallen by Limp Bizkit"
          />
          <AlbumCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCYSymfURA3DrT5GNK4NeYfv2utDik_E0rA&s"
            title="Skeletá by Ghost"
          />
          <AlbumCard
            image="https://i.scdn.co/image/ab67616d0000b273ca5c3280d995a78c34bdf210"
            title="Tsunami Sea by Spiritbox"
          />
          <AlbumCard
            image="https://cdn-images.dzcdn.net/images/cover/e238857de027080281ecd2e24c8f4d1d/500x500.jpg"
            title="Parasomnia by Dream Theater"
          />
        </div>
      </div>

      {/* ----- COMMUNITIES ----- */}
      <div className="section">
        <h2>Communities</h2>
        <div className="community-grid">
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
        <div className="stat-grid">
          <StatCard title="Canción más escuchada" value="In the End" />
          <StatCard title="Álbum más escuchado" value="Hybrid Theory" />
          <StatCard title="Comunidad más activa" value="Rock Classics" />
        </div>
      </div>

      {/* ----- SUGGESTED PLAYLIST ----- */}
      <div className="section deezer-wrapper" style={{ gridColumn: "1 / -1" }}>
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
      </div>
    </div>
  );
}

export default Home;
