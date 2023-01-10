import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlayFill as PlayIcon, BsStopFill as StopIcon } from "react-icons/bs";
import { ImCross as DeleteIcon } from "react-icons/im";
import {
  deleteSong,
  saveTitle,
  setActiveSong,
  stop,
  setRecordPlaying,
} from "../../redux/dataSlice";
import { playSong } from "../../helpers/playFunctions";

export default function Songs({ song }) {
  const { soundName } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    playSong(dispatch, song.song, soundName);
    dispatch(setRecordPlaying(false));
    dispatch(setActiveSong(song));
  };

  const deleteClick = (e) => {
    e.stopPropagation();
    dispatch(deleteSong(song.id));
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
      <button className="active_button delete" onClick={(e) => deleteClick(e)}>
        <DeleteIcon size={14} />
      </button>
    </div>
  );
}
