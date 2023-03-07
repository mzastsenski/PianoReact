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

  // useEffect(() => {
  //   soundName === "piano1" ? setPreload(piano1) : setPreload(piano2);
  // }, [soundName]);

  // const setPreload = (sound) => {
  //   Object.entries(sound).forEach((e) => {
  //     sound[e[0]].preload = "auto";
  // //     sound[e[0]].play();
  //   });
  // };

  const playNote = (e) => {
    const piano1 = {
      a: new Audio(`./sounds/040.wav`),
      w: new Audio(`./sounds/041.wav`),
      s: new Audio(`./sounds/042.wav`),
      e: new Audio(`./sounds/043.wav`),
      d: new Audio(`./sounds/044.wav`),
      f: new Audio(`./sounds/045.wav`),
      t: new Audio(`./sounds/046.wav`),
      g: new Audio(`./sounds/047.wav`),
      y: new Audio(`./sounds/048.wav`),
      h: new Audio(`./sounds/049.wav`),
      u: new Audio(`./sounds/050.wav`),
      j: new Audio(`./sounds/051.wav`),
      k: new Audio(`./sounds/052.wav`),
      o: new Audio(`./sounds/053.wav`),
      l: new Audio(`./sounds/054.wav`),
      p: new Audio(`./sounds/055.wav`),
      ";": new Audio(`./sounds/056.wav`),
      "'": new Audio(`./sounds/f2.mp3`),
    };
    if (keys.indexOf(e.key) < 0 || e.repeat) return;
    let sound = piano1;
    if (soundName === "piano2") sound = piano2;
    sound[e.key].currentTime = 0;
    sound[e.key].preload = "auto";
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
