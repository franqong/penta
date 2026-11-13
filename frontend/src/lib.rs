use leptos::prelude::*;
use leptos_router::{
    components::{Route, Router, Routes},
    path,
};
use wasm_bindgen::{JsCast, closure::Closure};

mod icons;

use icons::{BandIcon, LogoutIcon, SettingsIcon};

#[component]
pub fn App() -> impl IntoView {
    let player = PlayerState {
        track: RwSignal::new(None),
        playing: RwSignal::new(false),
        minimized: RwSignal::new(false),
        scrolled: RwSignal::new(false),
        docked_by_scroll: RwSignal::new(false),
        page_short: RwSignal::new(false),
    };
    provide_context(player);

    let scrolled = player.scrolled;
    if let Some(window) = web_sys::window() {
        scrolled.set(window.scroll_y().unwrap_or(0.0) > 80.0);

        let callback = Closure::wrap(Box::new(move |_event: web_sys::Event| {
            scrolled.set(web_sys::window().and_then(|window| window.scroll_y().ok()).unwrap_or(0.0) > 80.0);
        }) as Box<dyn FnMut(_)>);
        let _ = window.add_event_listener_with_callback("scroll", callback.as_ref().unchecked_ref());
        callback.forget();
    }

    view! {
        <Router>
            <div class="app-wrapper">
                <Header scrolled=player.scrolled />
                <main class="main-content">
                    <Routes fallback=|| view! { <NotFound /> }>
                        <Route path=path!("/") view=Home />
                        <Route path=path!("/songs") view=Songs />
                        <Route path=path!("/profile") view=Profile />
                        <Route path=path!("/settings") view=Settings />
                    </Routes>
                </main>
                <MusicPlayer />
                <Footer />
            </div>
        </Router>
    }

}

#[component]
fn SocialIcon(platform: &'static str) -> impl IntoView {
    view! {
        <img class="social-icon" src=format!("/socials/{platform}.svg") alt="" aria-hidden="true" />
    }
}

#[component]
fn Header(scrolled: RwSignal<bool>) -> impl IntoView {
    view! {
        <header class:shrink=move || scrolled.get() class="site-header">
            <nav class="header-left" aria-label="Primary navigation">
                <a href="/songs" aria-label="Songs">
                    <NavIcon name="songs" />
                </a>
                <a href="/albums" aria-label="Albums">
                    <NavIcon name="albums" />
                </a>
                <a href="/reviews" aria-label="Reviews">
                    <NavIcon name="reviews" />
                </a>
            </nav>

            <a class="header-logo" href="/" aria-label="Penta home">
                <img src="/assets/main/penta.svg" alt="Penta" />
            </a>

            <div class="header-right">
                <label class="search-container">
                    <span class="sr-only">"Search"</span>
                    <input type="search" placeholder="Search..." />
                    <SearchIcon />
                </label>
                <div class="user-section">
                    <a class="user-info" href="/profile">
                        <UserIcon />
                        <span>"Franco"</span>
                    </a>
                    <div class="user-menu">
                        <a href="/band"><BandIcon />"Band"</a>
                        <div class="menu-divider"></div>
                        <a href="/settings"><SettingsIcon />"Settings"</a>
                        <div class="menu-divider"></div>
                        <a href="/#" class="logout-link"><LogoutIcon />"Logout"</a>
                    </div>
                </div>
            </div>
        </header>
    }
}

#[component]
fn Footer() -> impl IntoView {
    view! {
        <footer class="site-footer">
            <div class="footer-container">
                <nav class="footer-links" aria-label="Footer navigation">
                    <a href="/about">"About"</a>
                    <a href="/news">"News"</a>
                    <a href="/apps">"Apps"</a>
                    <a href="/contact">"Contact"</a>
                    <a href="/downloads">"Downloads"</a>
                </nav>
                <div class="footer-socials">
                    <a href="https://github.com/franqong/penta" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <SocialIcon platform="github" />
                    </a>
                    <a href="https://mastodon.social/home" target="_blank" rel="noreferrer" aria-label="Mastodon">
                        <SocialIcon platform="mastodon" />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                        <SocialIcon platform="x" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                        <SocialIcon platform="facebook" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <SocialIcon platform="instagram" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                        <SocialIcon platform="tiktok" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                        <SocialIcon platform="youtube" />
                    </a>
                </div>
            </div>
        </footer>
    }
}

#[component]
fn Home() -> impl IntoView {
    let popular = vec![
        Song::new("SilverSideUp-Nickelback.jpg", "How You Remind Me", "Nickelback", "2001"),
        Song::new("Core-StoneTemplePilots.jpg", "Plush", "Stone Temple Pilots", "1992"),
        Song::new("HybridTheory-LinkinPark.jpg", "In the End", "Linkin Park", "2000"),
        Song::new("10000Days-Tool.jpg", "The Pot", "Tool", "2006"),
        Song::new("MerDeNoms-APerfectCircle.jpg", "3 Libras", "A Perfect Circle", "2000"),
        Song::new("Audioslave-Audioslave.jpg", "Like a Stone", "Audioslave", "2002"),
    ];
    let monthly = vec![
        Song::new("BlackWaterPark-Opeth.jpg", "Blackwater Park", "Opeth", "2001"),
        Song::new("FromMarsToSirius-Gojira.jpg", "From Mars to Sirius", "Gojira", "2005"),
        Song::new("AllHopeIsGone-Slipknot.jpg", "All Hope Is Gone", "Slipknot", "2008"),
        Song::new("CowboysFromHell-Pantera.jpg", "Cowboys from Hell", "Pantera", "1990"),
        Song::new("WakingtheFallen-AvengedSevenfold.jpg", "Waking the Fallen", "Avenged Sevenfold", "2003"),
        Song::new("ThePoison-BulletforMyValentine.jpg", "The Poison", "Bullet for My Valentine", "2005"),
    ];
    let coming_soon = vec![
        Song::new("MakingLoveToMorganWallen-LimpBizkit.jpg", "Making Love To Morgan Wallen", "Limp Bizkit", "2025"),
        Song::new("Skeleta-Ghost.jpg", "Skeletá", "Ghost", "2025"),
        Song::new("TsunamiSea-Spiritbox.jpg", "Tsunami Sea", "Spiritbox", "2025"),
        Song::new("Parasomnia-DreamTheater.jpg", "Parasomnia", "Dream Theater", "2025"),
    ];

    view! {
        <div class="home-grid">
            <section class="home-heading">
                <h1>
                    {"\"What's the worst that I can say? Things are better if I stay"}
                    <br />
                    {"So long and goodnight, so long not goodnight.\""}
                </h1>
            </section>
            <AlbumSection title="Popular This Week" songs=popular />
            <AlbumSection title="Albums of the Month" songs=monthly />
            <InfoSection title="Best Reviews">
                <InfoCard title="Three Cheers for Sweet Revenge (2004) • My Chemical Romance"
                    body="Que vuelvan los emos, no les hacemos más bullying." />
                <InfoCard title="Dookie (1994) • Green Day"
                    body="Cuando Billie Joe no estaba entongado con el Partido Demócrata." />
                <InfoCard title="Made in Japan (1972) • Deep Purple"
                    body="Locura lo del muchachito Ritchie, el solo de Child in Time es otra cosa." />
            </InfoSection>
            <AlbumSection title="Coming Soon" songs=coming_soon />
            <InfoSection title="Communities">
                <InfoCard title="Rock Classics"
                    body="Debates sobre los mejores discos de rock clásico." />
                <InfoCard title="Nu-Metal Heads"
                    body="Linkin Park, Korn, Limp Bizkit y más." />
                <InfoCard title="Prog Lovers"
                    body="Discusión de discos progresivos modernos." />
            </InfoSection>
            <InfoSection title="Your Space">
                <InfoCard title="Canción más escuchada" body="In the End" />
                <InfoCard title="Álbum más escuchado" body="Hybrid Theory" />
                <InfoCard title="Comunidad más activa" body="Rock Classics" />
            </InfoSection>
        </div>
    }
}

#[component]
fn Songs() -> impl IntoView {
    let songs = [
        ("SilverSideUp-Nickelback.jpg", "How You Remind Me", "Nickelback", "2001"),
        ("Core-StoneTemplePilots.jpg", "Plush", "Stone Temple Pilots", "1992"),
        ("HybridTheory-LinkinPark.jpg", "In the End", "Linkin Park", "2000"),
        ("10000Days-Tool.jpg", "The Pot", "Tool", "2006"),
        ("MerDeNoms-APerfectCircle.jpg", "3 Libras", "A Perfect Circle", "2000"),
    ];

    view! {
        <section class="songs-layout" aria-labelledby="songs-title">
            <div class="songs-section">
                <h1 id="songs-title">"Songs of the Week"</h1>
                <div class="songs-covers-grid">
                    {songs
                        .into_iter()
                        .map(|(image, song, artist, year)| {
                            view! {
                                <SongCard image song artist year />
                            }
                        })
                        .collect_view()}
                </div>
            </div>
        </section>
    }
}

#[component]
fn Profile() -> impl IntoView {
    view! {
        <div class="profile-page">
            <section class="profile-section">
                <div class="profile-left">
                    <UserIcon />
                    <div class="profile-info">
                        <div class="profile-info-user">
                            <h1 class="profile-name">"Franco"</h1>
                            <VerifiedIcon />
                            <a class="band-info" href="/band">"Black Label Society"</a>
                        </div>
                        <span class="profile-user">"@franqo"</span>
                        <p class="profile-bio">
                            "Hermética no es la mejor banda heavy de Argentina. No escucho lloros."
                        </p>
                        <p class="profile-location">
                            <LocationIcon />
                            "Santa Fe, Argentina"
                        </p>
                    </div>
                </div>
            </section>
            <section class="profile-section profile-right">
                <div class="profile-stats">
                    <div class="profile-stat profile-follow">
                        <button class="follow-button" type="button">"Follow"</button>
                        <span class="follows-you">"Follows you"</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-number">"120"</span>
                        <span class="stat-label">"Following"</span>
                    </div>
                    <div class="profile-stat">
                        <span class="stat-number">"98"</span>
                        <span class="stat-label">"Followers"</span>
                    </div>
                </div>
            </section>
            <nav class="profile-tabs" aria-label="Profile sections">
                <a href="/reviews">"Reviews"</a>
                <a href="/communities">"Communities"</a>
                <a href="/songs">"Songs"</a>
                <a href="/albums">"Albums"</a>
                <a href="/band">"Band"</a>
            </nav>
        </div>
    }
}

#[component]
fn Settings() -> impl IntoView {
    view! {
        <section class="settings-page">
            <h1>"Settings"</h1>
            <div class="settings-card">
                <h2>"Account"</h2>
                <label>
                    <span>"Display name"</span>
                    <input type="text" value="Franco" />
                </label>
                <label>
                    <span>"Username"</span>
                    <input type="text" value="@franqo" />
                </label>
                <button type="button" class="settings-button">"Save changes"</button>
            </div>
            <div class="settings-card">
                <h2>"Preferences"</h2>
                <label class="checkbox-row">
                    <input type="checkbox" />
                    <span>"Reduce motion"</span>
                </label>
                <label class="checkbox-row">
                    <input type="checkbox" />
                    <span>"Enable email notifications"</span>
                </label>
            </div>
        </section>
    }
}

#[component]
fn NotFound() -> impl IntoView {
    page("Page not found", "This route is not available in the Rust frontend yet.")
}

fn page(title: &'static str, description: &'static str) -> impl IntoView {
    view! {
        <section class="page-placeholder">
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    }
}

#[component]
fn NavIcon(name: &'static str) -> impl IntoView {
    match name {
        "songs" => view! {
            <svg viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
                <path d="M60 96v64a12 12 0 0 1-24 0V96a12 12 0 0 1 24 0ZM88 20a12 12 0 0 0-12 12v192a12 12 0 0 0 24 0V32a12 12 0 0 0-12-12Zm40 32a12 12 0 0 0-12 12v128a12 12 0 0 0 24 0V64a12 12 0 0 0-12-12Zm40 32a12 12 0 0 0-12 12v64a12 12 0 0 0 24 0V96a12 12 0 0 0-12-12Zm40-16a12 12 0 0 0-12 12v96a12 12 0 0 0 24 0V80a12 12 0 0 0-12-12Z"/>
            </svg>
        }.into_any(),
        "albums" => view! {
            <svg viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm0-144a56.06 56.06 0 0 0-56 56 8 8 0 0 1-16 0 72.08 72.08 0 0 1 72-72 8 8 0 0 1 0 16Zm72 56a72.08 72.08 0 0 1-72 72 8 8 0 0 1 0-16 56.06 56.06 0 0 0 56-56 8 8 0 0 1 16 0Zm-40 0a32 32 0 1 0-32 32 32 32 0 0 0 32-32Zm-48 0a16 16 0 1 1 16 16 16 16 0 0 1-16-16Z"/>
            </svg>
        }.into_any(),
        _ => view! {
            <svg viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
                <path d="M128 96h104a8 8 0 0 1 0 16H128a8 8 0 0 1 0-16Zm104 32H128a8 8 0 0 0 0 16h104a8 8 0 0 0 0-16Zm0 32H80a8 8 0 0 0 0 16h152a8 8 0 0 0-8-16Zm0 32H80a8 8 0 0 0 0 16h152a8 8 0 0 0-8-16ZM96 144a8 8 0 0 0 0-16h-8V64h32v8a8 8 0 0 0 16 0V56a8 8 0 0 0-8-8H32a8 8 0 0 0-8 8v16a8 8 0 0 0 16 0V64h32v64h-8a8 8 0 0 0 0 16Z"/>
            </svg>
        }.into_any(),
    }
}

#[component]
fn SearchIcon() -> impl IntoView {
    view! {
        <svg class="search-icon" viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
            <path d="M232.49 215.51 185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68 68.07 68.07 0 0 1-68-68Z"/>
        </svg>
    }
}

#[component]
fn UserIcon() -> impl IntoView {
    view! {
        <svg class="user-icon" viewBox="0 0 256 256" aria-hidden="true" fill="currentColor">
            <path d="M172 120a44 44 0 1 1-44-44 44.05 44.05 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88.09 88.09 0 0 0-91.47-87.93C77.43 41.89 39.87 81.12 40 128.25a87.65 87.65 0 0 0 22.24 58.16A79.71 79.71 0 0 1 84 165.1a4 4 0 0 1 4.83.32 59.83 59.83 0 0 0 78.28 0 4 4 0 0 1 4.83-.32 79.71 79.71 0 0 1 21.79 21.31A87.62 87.62 0 0 0 216 128Z"/>
        </svg>
    }
}

#[component]
fn VerifiedIcon() -> impl IntoView {
    view! {
        <img
            class="profile-inline-icon verified-icon"
            src="/profile-icons/badge-verified.svg"
            alt=""
            aria-hidden="true"
        />
    }
}

#[component]
fn LocationIcon() -> impl IntoView {
    view! {
        <img
            class="profile-inline-icon location-icon"
            src="/profile-icons/location.svg"
            alt=""
            aria-hidden="true"
        />
    }
}

#[derive(Clone, Copy)]
struct Track {
    image: &'static str,
    song: &'static str,
    artist: &'static str,
}

#[derive(Clone, Copy)]
struct PlayerState {
    track: RwSignal<Option<Track>>,
    playing: RwSignal<bool>,
    minimized: RwSignal<bool>,
    scrolled: RwSignal<bool>,
    docked_by_scroll: RwSignal<bool>,
    page_short: RwSignal<bool>,
}

fn refresh_player_layout(page_short: RwSignal<bool>, docked_by_scroll: RwSignal<bool>) {
    let Some(window) = web_sys::window() else {
        return;
    };
    let Some(document) = window.document() else {
        return;
    };
    let viewport_height = window
        .inner_height()
        .ok()
        .and_then(|height| height.as_f64())
        .unwrap_or(0.0);
    let document_height = document
        .document_element()
        .map(|element| element.scroll_height() as f64)
        .unwrap_or(0.0);
    let short = document_height <= viewport_height + 1.0;
    let scroll_y = window.scroll_y().unwrap_or(0.0);
    let at_end = scroll_y + viewport_height >= document_height - 80.0;

    page_short.set(short);
    docked_by_scroll.set(at_end && !short);
}

#[component]
fn MusicPlayer() -> impl IntoView {
    let player = expect_context::<PlayerState>();
    let fallback = Track {
        image: "",
        song: "No song selected",
        artist: "Penta player",
    };

    let docked_by_scroll = player.docked_by_scroll;
    let page_short = player.page_short;
    refresh_player_layout(page_short, docked_by_scroll);
    if let Some(window) = web_sys::window() {
        let refresh_on_event = Closure::wrap(Box::new(move |_event: web_sys::Event| {
            refresh_player_layout(page_short, docked_by_scroll);
        }) as Box<dyn FnMut(_)>);
        let callback = refresh_on_event.as_ref().unchecked_ref();
        let _ = window.add_event_listener_with_callback("scroll", callback);
        let _ = window.add_event_listener_with_callback("resize", callback);
        let _ = window.add_event_listener_with_callback("popstate", callback);
        let _ = window.add_event_listener_with_callback("click", callback);
        refresh_on_event.forget();

        let refresh_after_navigation = Closure::wrap(Box::new(move || {
            refresh_player_layout(page_short, docked_by_scroll);
        }) as Box<dyn FnMut()>);
        let _ = window.set_timeout_with_callback_and_timeout_and_arguments_0(
            refresh_after_navigation.as_ref().unchecked_ref(),
            0,
        );
        refresh_after_navigation.forget();
    }

    view! {
        <section
            class:player-docked=move || player.page_short.get() || player.docked_by_scroll.get() || player.minimized.get()
            class="music-player-placeholder"
            aria-label="Music player"
        >
            {move || {
                let selected = player.track.get();
                let track = selected.unwrap_or(fallback);
                let image = selected
                    .map(|track| format!("/covers/{}", track.image))
                    .unwrap_or_else(|| "/assets/vinyl.svg".to_string());
                view! {
                    <div class="global-player-bar">
                        <div class="player-info-global">
                            <img src=image alt=track.song />
                            <div class="global-details">
                                <span class="player-song">{track.song}</span>
                                <span class="player-artist">{track.artist}</span>
                            </div>
                        </div>
                        <div class="player-center-controls">
                            <div class="control-buttons">
                                <button type="button" class="btn-skip">"prev"</button>
                                <button
                                    type="button"
                                    class="btn-play-pause"
                                    on:click=move |_| player.playing.update(|playing| *playing = !*playing)
                                >
                                    {move || if player.playing.get() { "pause" } else { "play" }}
                                </button>
                                <button type="button" class="btn-skip">"next"</button>
                            </div>
                            <div class="playback-bar-container">
                                <span class="time">"0:00"</span>
                                <div class="progress-bar-bg"><div class="progress-bar-fill"></div></div>
                                <span class="time">"3:30"</span>
                            </div>
                        </div>
                        <div class="player-right-options">
                            <Show
                                when=move || !player.page_short.get() && !player.docked_by_scroll.get()
                                fallback=move || {
                                    if player.minimized.get() {
                                        view! {
                                            <button
                                                type="button"
                                                class="minimize-player"
                                                on:click=move |_| player.minimized.set(false)
                                            >
                                                "RESTORE"
                                            </button>
                                        }.into_any()
                                    } else {
                                        ().into_any()
                                    }
                                }
                            >
                                <button
                                    type="button"
                                    class="minimize-player"
                                    on:click=move |_| player.minimized.set(true)
                                >
                                    "MINIMIZE"
                                </button>
                            </Show>
                        </div>
                    </div>
                }
            }}
        </section>
    }
}

#[component]
fn SongCard(
    image: &'static str,
    song: &'static str,
    artist: &'static str,
    year: &'static str,
) -> impl IntoView {
    let player = expect_context::<PlayerState>();
    let track = Track {
        image,
        song,
        artist,
    };

    view! {
        <article class="album-card">
            <div class="album-wrapper">
                <div class="vinyl-disk" aria-hidden="true">
                    <img src="/assets/vinyl.svg" alt="" />
                </div>
                <div class="image-container">
                    <img src=format!("/covers/{image}") alt=song class="album-cover" />
                    <div class="album-overlay">
                        <span class="overlay-song">{song}</span>
                        <span class="overlay-artist">{artist}</span>
                        <span class="overlay-year">{year}</span>
                    </div>
                </div>
            </div>
            <div class="album-player">
                <button
                    class="mini-btn-play"
                    type="button"
                    aria-label=format!("Listen to {song}")
                    on:click=move |_| {
                        player.track.set(Some(track));
                        player.playing.set(false);
                        player.minimized.set(false);
                    }
                >
                    "LISTEN"
                </button>
            </div>
        </article>
    }
}

#[derive(Clone, Copy)]
struct Song {
    image: &'static str,
    title: &'static str,
    artist: &'static str,
    year: &'static str,
}

impl Song {
    const fn new(
        image: &'static str,
        title: &'static str,
        artist: &'static str,
        year: &'static str,
    ) -> Self {
        Self {
            image,
            title,
            artist,
            year,
        }
    }
}

#[component]
fn AlbumSection(title: &'static str, songs: Vec<Song>) -> impl IntoView {
    view! {
        <section class="home-section">
            <h2>{title}</h2>
            <div class="covers-grid">
                {songs
                    .into_iter()
                    .map(|song| view! {
                        <SongCard
                            image=song.image
                            song=song.title
                            artist=song.artist
                            year=song.year
                        />
                    })
                    .collect_view()}
            </div>
        </section>
    }
}

#[component]
fn InfoSection(title: &'static str, children: Children) -> impl IntoView {
    view! {
        <section class="home-section">
            <h2>{title}</h2>
            <div class="info-grid">{children()}</div>
        </section>
    }
}

#[component]
fn InfoCard(title: &'static str, body: &'static str) -> impl IntoView {
    view! {
        <article class="info-card">
            <h3>{title}</h3>
            <p>{body}</p>
        </article>
    }
}
