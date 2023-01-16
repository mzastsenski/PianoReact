import Piano from "../components/Piano/Piano";
import Buttons from "../components/Buttons/Buttons";
import SongsContainer from "../components/SongsContainer/SongsContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { piano1, piano2 } from "../data/sounds";
import { keys } from "../data/keys";
import { addToRecordBuffer, changeDelayStop } from "../redux/dataSlice";

export default function Main() {
  const { soundName, isRecord, startTime } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopPlayingNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopPlayingNote);
    };
  });

  const playNote = (e) => {
    if (keys.indexOf(e.key) < 0 || e.repeat) return;
    let sound = piano1;
    if (soundName === "piano2") sound = piano2;
    sound[e.key].currentTime = 0;
    sound[e.key].play();
    if (isRecord) {
      dispatch(
        addToRecordBuffer({
          key: e.key,
          delay: Date.now() - startTime,
          delayStop: null,
        })
      );
    }
  };

  const stopPlayingNote = (e) => {
    const date = Date.now();
    let sound = piano1;
    if (soundName === "piano2") sound = piano2;
    if (keys.indexOf(e.key) < 0) return;
    if (soundName === "piano2") {
      setTimeout(() => {
        sound[e.key].pause();
      }, 100);
    }
    if (isRecord) {
      dispatch(changeDelayStop({ key: e.key, date }));
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
