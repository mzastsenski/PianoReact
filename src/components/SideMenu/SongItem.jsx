import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";

export default function Songs({ song }) {
  const { deleteSong, isPlaying, playSong, saveTitle, stop } =
    useContext(Context);
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    if (!isPlaying) setActive(false);
  }, [isPlaying]);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  return (
    <div
      className="song_item"
      style={isPlaying && active ? { background: "green", color: "white" } : {}}
      // onClick={click}
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        // onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => saveTitle(e.target.value, song)}
      />
      <button onClick={() => playSong(song.song)}>P</button>
      <button onClick={() => stop()}>S</button>
      <button onClick={(e) => deleteSong(e, song.id)}>X</button>
    </div>
  );
}
