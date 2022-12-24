import { piano1, piano2 } from "./data";
import { useEffect, useState } from "react";

export default function Buttons({
  isRecord,
  recordStart,
  stop,
  isPlaying,
  playRecord,
  saveSong,
  sound,
  setSound,
}) {
  const [soundName, setSoundName] = useState("");

  useEffect(() => {
    if (sound === piano1) setSoundName("piano1");
    else setSoundName("piano2");
  }, [sound]);

  const style = { background: "#4034eb" };

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
        style={soundName === "piano1" ? style : {}}
        onClick={() => setSound(piano1)}
      >
        Sound Piano1
      </button>
      <button
        style={soundName === "piano2" ? style : {}}
        onClick={() => setSound(piano2)}
      >
        Sound Piano2
      </button>
    </div>
  );
}
