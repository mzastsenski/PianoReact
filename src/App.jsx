import "./App.sass";
import { useState, useEffect } from "react";
import { Context } from "./context";
import { piano1, piano2, keys } from "./data";
import { defaultSongs } from "./data/default_songs";
import Piano from "./components/Piano/Piano";
import Buttons from "./components/Buttons/Buttons";
import Header from "./components/Header/Header";
import SongsContainer from "./components/SongsContainer/SongsContainer";

export default function App() {
  const [sound, setSound] = useState(piano1);
  const [songs, setSongs] = useState([...defaultSongs]);
  const [isRecord, setRecord] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [record, setRecordBuffer] = useState([]);
  const [playBuffer, setPlayBuffer] = useState(defaultSongs[1].song);
  const [timeoutArr, setTimeoutArr] = useState([]);
  const [activeNote, setActiveNote] = useState("");
  const [menuOpened, setOpened] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopPlayingNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopPlayingNote);
    };
  });

  // const postData = (data) => {
  //   fetch("api/mongo", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);
  // };

  useEffect(() => {
    if (localStorage.getItem("songs"))
      setSongs(JSON.parse(localStorage.getItem("songs")));
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
    // postData(songs);
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
    timeoutArr.forEach((e) => clearTimeout(e));
  };

  const playSong = (song) => {
    stop();
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
        const timeout2 = setTimeout(() => {
          setPlaying(false);
        }, e.delay + 1000);
        arr.push(timeout2);
      }
      // setTimeout(() => {
      //   sound[e.key].pause();
      // }, e.delayStop);
    });
    setTimeoutArr(arr);
  };

  const playRecord = () => {
    if (record.length) playSong(record);
    // else if (playBuffer.length) playSong(playBuffer);
  };

  const saveSong = () => {
    if (record.length) {
      const newSong = {
        user: "",
        title: `My Song ${songs.length + 1}`,
        song: record,
      };
      setSongs([...songs, newSong]);
      setRecordBuffer([]);
    }
  };

  const deleteSong = (e, idx) => {
    e.stopPropagation();
    setSongs(songs.filter((e, i) => i !== idx));
  };

  const saveTitle = (text, song) => {
    song.title = text;
    setSongs([...songs]);
    localStorage.setItem("songs", JSON.stringify(songs));
  };

  return (
    <Context.Provider
      value={{
        saveTitle,
        songs,
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
        menuOpened,
        setOpened,
      }}
    >
      <Header />
      <Piano />
      <Buttons />
      <SongsContainer />
    </Context.Provider>
  );
}
