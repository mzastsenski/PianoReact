import { useState, useEffect } from "react";
import { BsPlayFill as PlayIcon, BsStopFill as StopIcon } from "react-icons/bs";
import { ImCross as DeleteIcon } from "react-icons/im";
import {
  deleteSong,
  playSong,
  saveTitle,
  setActiveSong,
  stop,
} from "../../redux/dataSlice";
import { useDispatch } from "react-redux";

export default function Songs({ song }) {
  const dispatch = useDispatch();
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    dispatch(playSong(song.song));
    dispatch(setActiveSong(song));
  };

  return (
    <div className="song_item">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && e.target.blur()}
        onBlur={(e) => dispatch(saveTitle({ e: e.target.value, song }))}
      />
      <button className="active_button play" onClick={click}>
        <PlayIcon size={20} />
      </button>
      <button className="active_button stop" onClick={() => dispatch(stop())}>
        <StopIcon size={20} />
      </button>
      <button
        className="active_button delete"
        onClick={(e) => dispatch(deleteSong({ e, id: song.id }))}
      >
        <DeleteIcon size={14} />
      </button>
    </div>
  );
}
