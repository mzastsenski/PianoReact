import "./style.sass";
import { useState, useEffect } from "react";
import { Context } from "./context";
import { piano1, piano2, dataSongs, keys } from "./data";
import Piano from "./components/Piano";
import Songs from "./components/Songs";
import Buttons from "./components/Buttons";

export default function App() {
  const [sound, setSound] = useState(piano1);
  const [songs, setSongs] = useState([...dataSongs]);
  const [isRecord, setRecord] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [save, setSave] = useState([]);
  const record = [];
  const [timeoutArr, setTimeoutArr] = useState([]);
  const [activeNote, setActiveNote] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopPlayingNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopPlayingNote);
    };
  });

  useEffect(() => {
    if (localStorage.getItem("songs"))
      setSongs(JSON.parse(localStorage.getItem("songs")));
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  const playNote = (e) => {
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

  const playNoteTouch = (e) => {
    sound[e].currentTime = 0;
    sound[e].play();
    if (isRecord) {
      record.push({
        key: e,
        delay: Date.now() - startTime,
        delayStop: null,
      });
    }
  };

  const stopPlayingNote = (e) => {
    if (keys.indexOf(e.key) < 0) return;
    if (sound === piano2) {
      setTimeout(() => {
        sound[e.key].pause();
      }, 100);
      if (isRecord) {
        const findet = record.find((el) => e.key === el.key && !el.delayStop);
        findet.delayStop = Date.now() - startTime;
      }
    }
  };

  const recordStart = () => {
    setRecord(true);
    setStartTime(Date.now());
  };

  const stop = () => {
    setRecord(false);
    setPlaying(false);
    setSave(record);
    timeoutArr.forEach((e) => clearTimeout(e));
  };

  const playSong = (song) => {
    setPlaying(true);
    const arr = [];
    song.forEach((e, i) => {
      const timeout = setTimeout(() => {
        sound[e.key].currentTime = 0;
        sound[e.key].play();
        setActiveNote(e.key);
        if (i > 0 && e.key === song[i - 1].key)
          setActiveNote(`${e.key}${e.key}`); ///  if note will repeat
        if (i > 1 && e.key === song[i - 2].key) setActiveNote(e.key);
        if (i > 2 && e.key === song[i - 3].key)
          setActiveNote(`${e.key}${e.key}`);
      }, e.delay);
      arr.push(timeout);
      if (i === song.length - 1) {
        setTimeout(() => {
          setPlaying(false);
        }, e.delay + 1000);
      }
      // setTimeout(() => {
      //   sound[e.key].pause();
      // }, e.delayStop);
    });
    setTimeoutArr(arr);
  };

  const playRecord = () => {
    if (save.length) playSong(save);
  };

  const saveSong = () => {
    if (save.length) {
      setSongs([...songs, save]);
      setSave([]);
    }
  };

  const deleteSong = (e, idx) => {
    e.stopPropagation();
    const newSongs = songs.filter((e, i) => i !== idx);
    setSongs(newSongs);
  };

  return (
    <Context.Provider
      value={{
        isRecord,
        recordStart,
        stop,
        isPlaying,
        playRecord,
        saveSong,
        sound,
        setSound,
        playNoteTouch,
        playSong,
        activeNote,
        deleteSong,
      }}
    >
      <Piano />
      <Buttons />
      <div className="songs_container">
        {songs.map((e, i) => (
          <Songs key={i + 1} idx={i} song={e} />
        ))}
      </div>
    </Context.Provider>
  );
}
