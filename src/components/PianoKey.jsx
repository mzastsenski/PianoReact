import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../context";

export default function PianoKey({ className, note }) {
  const { playNoteTouch, activeNote } = useContext(Context);

  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", activeOn);
    document.addEventListener("keyup", activeOff);
  });

  useEffect(() => {
    if (activeNote === note || activeNote === `${note}${note}`) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 150);
    }
  }, [activeNote, note]);

  const activeOn = (e) => {
    if (e.key === note && !e.repeat) {
      setActive(true);
      // console.log("on");
    }
  };

  const activeOff = (e) => {
    if (e.key === note) {
      setActive(false);
      // console.log("off");
    }
  };

  return (
    <div
      className={active ? `${className} playing` : `${className}`}
      data-note={note}
      onClick={() => playNoteTouch(note)}
    ></div>
  );
}
