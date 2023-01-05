import Piano from "../components/Piano/Piano";
import Buttons from "../components/Buttons/Buttons";
import SongsContainer from "../components/SongsContainer/SongsContainer";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../context";

export default function Main() {
  const { playNote, stopPlayingNote } = useContext(Context);

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopPlayingNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopPlayingNote);
    };
  });

  return (
    <>
      <Piano />
      <Buttons />
      <SongsContainer />
    </>
  );
}
