import "./Buttons.sass";
import { BsRecordCircle, BsStopCircle, BsPlayCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { recordStart, saveSong, setSound, stop } from "../../redux/dataSlice";
import { playRecord } from "../../helpers/playFunctions";

export default function Buttons() {
  const { soundName, isPlaying, isRecord, record, activeSong } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const size = 40;

  return (
    <div className="buttons">
      <div className="action_buttons">
        <button
          className="action_button"
          style={isRecord ? { background: "red", color: "white" } : {}}
          onClick={() => dispatch(recordStart())}
        >
          <BsRecordCircle size={size} className="record" />
        </button>
        <button className="action_button" onClick={() => dispatch(stop())}>
          <BsStopCircle size={size} className="stop" />
        </button>
        <button
          className="action_button"
          style={isPlaying ? { background: "green", color: "white" } : {}}
          onClick={() => playRecord(dispatch, soundName, record, activeSong)}
        >
          <BsPlayCircle size={size} className="play" />
        </button>

        <button
          className="action_button save"
          onClick={() => dispatch(saveSong())}
        >
          Save
        </button>
      </div>
      <div className="sound_buttons">
        <button
          className={
            soundName === "piano1"
              ? "sound_button sound_button_active"
              : "sound_button"
          }
          onClick={() => dispatch(setSound("piano1"))}
        >
          Sound 1
        </button>
        <button
          className={
            soundName === "piano2"
              ? "sound_button sound_button_active"
              : "sound_button"
          }
          onClick={() => dispatch(setSound("piano2"))}
        >
          Sound 2
        </button>
      </div>
    </div>
  );
}
