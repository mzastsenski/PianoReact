import "./Song.sass";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";

export default function Songs({ song }) {
  const {
    deleteSong,
    isPlaying,
    playSong,
    saveTitle,
    activeSong,
    setActiveSong,
  } = useContext(Context);
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    playSong(song.song);
    setActiveSong(song);
  };

  return (
    <div
      className="song"
      style={
        isPlaying && activeSong && activeSong.id === song.id
          ? { background: "green", color: "white" }
          : {}
      }
      onClick={click}
    >
      <input
        style={
          isPlaying && activeSong && activeSong.id === song.id
            ? { background: "green", color: "white" }
            : {}
        }
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => saveTitle(e.target.value, song)}
      />
      <button className="delete_button" onClick={(e) => deleteSong(e, song.id)}>
        X
      </button>
    </div>
  );
}
