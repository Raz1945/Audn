import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const cover = {
  wos: {
    img: "https://i.scdn.co/image/ab67616d0000b27314c89c39a1e89b7efc61e9ad",
    alt: "Wos artista"
  }
};

const tracks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Track ${i + 1}`
}));



export const PlaylistTop = () => {
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 50);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="playlist-container">
      {/* SearchBar animada */}
      <div className={`playlist-search ${scrolled ? "visible" : ""}`}>
        <input type="text" placeholder="Buscar en playlist..." />
      </div>

      {/* Cover */}
      <div className="playlist-cover">
        <img src={cover.wos.img} alt={cover.wos.alt} />
      </div>

      {/* Lista scrollable */}
      <div ref={listRef} className="playlist-tracks">
        {tracks.map((track) => (
          <div key={track.id} className="track">
            {track.name}
          </div>
        ))}
      </div>
    </div>
  );
}
