import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../context";
import { BsPlayFill as PlayIcon, BsStopFill as StopIcon } from "react-icons/bs";
import { ImCross as DeleteIcon } from "react-icons/im";

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
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => saveTitle(e.target.value, song)}
      />
      <button className="active_button play" onClick={click}>
        <PlayIcon size={20} />
      </button>
      <button className="active_button stop" onClick={() => stop()}>
        <StopIcon size={20} />
      </button>
      <button
        className="active_button delete"
        onClick={(e) => deleteSong(e, song.id)}
      >
        <DeleteIcon size={14} />
      </button>
    </div>
  );
}
