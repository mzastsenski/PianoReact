import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";

export default function Songs({ song }) {
  const { deleteSong, playSong, saveTitle, stop, setActiveSong } =
    useContext(Context);
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    playSong(song.song);
    setActiveSong(song);
  };

  return (
    <div className="song_item">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        // onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => saveTitle(e.target.value, song)}
      />
      <button onClick={click}>P</button>
      <button onClick={() => stop()}>S</button>
      <button onClick={(e) => deleteSong(e, song.id)}>X</button>
    </div>
  );
}
