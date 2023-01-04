import "./Buttons.sass";
import { piano1, piano2 } from "../../data";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../context";

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

  let button_color = "rgb(22, 124, 192)";
  button_color = "#4329d4";

  return (
    <div className="buttons">
      <button
        style={isRecord ? { background: "red" } : {}}
        onClick={recordStart}
      >
        Record
      </button>
      <button onClick={stop}>Stop</button>
      <button
        style={isPlaying ? { background: "green" } : {}}
        onClick={playRecord}
      >
        Play Record
      </button>
      <button onClick={saveSong}>Save</button>
      <button
        style={soundName === "piano1" ? { background: button_color } : {}}
        onClick={() => setSound(piano1)}
      >
        Sound Piano1
      </button>
      <button
        style={soundName === "piano2" ? { background: button_color } : {}}
        onClick={() => setSound(piano2)}
      >
        Sound Piano2
      </button>
    </div>
  );
}
