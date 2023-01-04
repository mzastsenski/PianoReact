import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";

export default function Songs({ song, idx }) {
  const { deleteSong, isPlaying, playSong } = useContext(Context);
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(`Song-${idx + 1}`);

  useEffect(() => {
    if (!isPlaying) setActive(false);
  }, [isPlaying]);

  const click = () => {
    playSong(song);
    setActive(true);
  };
  const inputClick = (e) => {
    e.stopPropagation();
    console.log(e.target)
  };

  return (
    <div
      className="song_item"
      style={isPlaying && active ? { background: "green", color: "white" } : {}}
      onClick={click}
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClick={inputClick}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        // onBlur={(e) => console.log(e.target.value)}
      />
      <button onClick={(e) => deleteSong(e, idx)}>x</button>
    </div>
  );
}
