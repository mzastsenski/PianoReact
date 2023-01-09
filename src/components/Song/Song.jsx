import "./Song.sass";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSong,
  saveTitle,
  setActiveSong,
} from "../../redux/dataSlice";
import { playSong } from "../../helpers/playFunctions";

export default function Songs({ song }) {
  const { isPlaying, activeSong, soundName } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const [val, setVal] = useState(song.title);

  useEffect(() => {
    setVal(song.title);
  }, [song.title]);

  const click = () => {
    playSong(dispatch, song.song, soundName);
    dispatch(setActiveSong(song));
  };

  const deleteClick = (e) => {
    e.stopPropagation();
    dispatch(deleteSong(song.id));
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
        onBlur={(e) => dispatch(saveTitle({ text: e.target.value, song }))}
      />
      <button className="delete_button" onClick={(e) => deleteClick(e)}>
        X
      </button>
    </div>
  );
}
