import Piano from "../components/Piano/Piano";
import Buttons from "../components/Buttons/Buttons";
import SongsContainer from "../components/SongsContainer/SongsContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { piano1, piano2 } from "../data/sounds";
import { keys } from "../data/keys";

export default function Main() {
  const { soundName, record, isRecord, startTime } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopPlayingNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopPlayingNote);
    };
  });

  const playNote = (e) => {
    let sound = piano1;
    if (soundName === "piano2") sound = piano2;
    if (keys.indexOf(e.key) < 0 || e.repeat) return;
    sound[e.key].currentTime = 0;
    sound[e.key].play();
    if (isRecord) {
      record.push({
        key: e.key,
        delay: Date.now() - startTime,
        delayStop: null,
      });
    }
  };

  const stopPlayingNote = (e) => {
    console.log(e)
    let sound = piano1;
    if (soundName === "piano2") sound = piano2;
    if (keys.indexOf(e.key) < 0) return;
    if (soundName === "piano2") {
      setTimeout(() => {
        sound[e.key].pause();
      }, 100);
    }
    if (isRecord) {
      const finded = record.find((el) => e.key === el.key && !el.delayStop);
      console.log(finded)
      finded.delayStop = Date.now() - startTime;
    }
  };

  return (
    <>
      <Piano />
      <Buttons />
      <SongsContainer />
    </>
  );
}
