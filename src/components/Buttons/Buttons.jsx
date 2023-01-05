import "./Buttons.sass";
import { piano1, piano2 } from "../../data";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../context";
import { BsRecordCircle, BsStopCircle, BsPlayCircle } from "react-icons/bs";

export default function Buttons() {
  const {
    isRecord,
    recordStart,
    stop,
    isPlaying,
    playRecord,
    saveSong,
    sound,
    setSound,
  } = useContext(Context);

  const [soundName, setSoundName] = useState("");

  useEffect(() => {
    sound === piano1 ? setSoundName("piano1") : setSoundName("piano2");
  }, [sound]);

  let size = 40;

  return (
    <div className="buttons">
      <button
        className="action_button"
        style={isRecord ? { background: "red", color: "white" } : {}}
        onClick={recordStart}
      >
        <BsRecordCircle size={size} className="record" />
      </button>
      <button className="action_button" onClick={stop}>
        <BsStopCircle size={size} className="stop" />
      </button>
      <button
        className="action_button"
        style={isPlaying ? { background: "green", color: "white" } : {}}
        onClick={playRecord}
      >
        <BsPlayCircle size={size} className="play" />
      </button>

      <button className="action_button save" onClick={saveSong}>
        Save
      </button>
      <button
        className={
          soundName === "piano1"
            ? "sound_button sound_button_active"
            : "sound_button"
        }
        onClick={() => setSound(piano1)}
      >
        Sound 1
      </button>
      <button
        className={
          soundName === "piano2"
            ? "sound_button sound_button_active"
            : "sound_button"
        }
        onClick={() => setSound(piano2)}
      >
        Sound2
      </button>
    </div>
  );
}
