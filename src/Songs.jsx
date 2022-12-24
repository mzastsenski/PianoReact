import { useState, useEffect } from "react";

export default function Songs({ song, playSong, deleteSong, idx, isPlaying }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isPlaying) setActive(false);
  }, [isPlaying]);

  const click = () => {
    playSong(song);
    setActive(true);
  };

  return (
    <div
      className="song"
      style={isPlaying && active ? { background: "green", color: "white" } : {}}
      onClick={click}
    >
      <h2> Song {idx + 1}</h2>
      <button className="delete_button" onClick={(e) => deleteSong(e, idx)}>
        X
      </button>
    </div>
  );
}
