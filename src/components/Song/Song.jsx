import "./Song.sass";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";

export default function Songs({ song, idx }) {
  const { deleteSong, isPlaying, playSong, saveTitle } = useContext(Context);
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    if (!isPlaying) setActive(false);
  }, [isPlaying]);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    playSong(song.song);
    setActive(true);
  };

  return (
    <div
      className="song"
      style={isPlaying && active ? { background: "green", color: "white" } : {}}
      onClick={click}
    >
      <input
        style={
          isPlaying && active ? { background: "green", color: "white" } : {}
        }
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => saveTitle(e.target.value, song)}
      />
      <button className="delete_button" onClick={(e) => deleteSong(e, idx)}>
        X
      </button>
    </div>
  );
}
