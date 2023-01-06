import {
  postSongToDB,
  editSong,
  deleteSongFromDB,
  getSongs,
  checkUser,
} from "./requests";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./context";
import { piano1, piano2, keys } from "./data";
import { defaultSongs } from "./data/default_songs";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [user, setUser] = useState("");
  const [sound, setSound] = useState(piano1);
  const [songs, setSongs] = useState([]);
  const [isRecord, setRecord] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [record, setRecordBuffer] = useState([]);
  const [activeSong, setActiveSong] = useState(defaultSongs[0]);
  const [timeoutArr, setTimeoutArr] = useState([]);
  const [activeNote, setActiveNote] = useState("");
  const [menuOpened, setOpened] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("user");
    if (userName) {
      checkUser(userName, setUser);
      setUser(userName);
      getSongs(userName, setSongs);
    } else {
      if (localStorage.getItem("songs")) {
        const localSongs = JSON.parse(localStorage.getItem("songs"));
        if (localSongs.length) setSongs(localSongs);
        else setSongs(defaultSongs);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("songs", JSON.stringify(songs));
    }
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
    else if (activeSong.song) playSong(activeSong.song);
  };

  const saveSong = () => {
    if (record.length) {
      const newSong = {
        id: Date.now(),
        user: user,
        title: `My Song ${songs.length + 1}`,
        song: record,
      };
      setSongs([...songs, newSong]);
      setRecordBuffer([]);
      if (user) postSongToDB(newSong);
    }
  };

  const deleteSong = (e, id) => {
    e.stopPropagation();
    setSongs(songs.filter((e) => e.id !== id));
    if (user) deleteSongFromDB({ user, id });
  };

  const saveTitle = (text, song) => {
    song.title = text;
    setSongs([...songs]);
    if (!user) localStorage.setItem("songs", JSON.stringify(songs));
    if (user) editSong(song);
  };

  return (
    <Context.Provider
      value={{
        songs,
        user,
        setUser,
        playNote,
        stopPlayingNote,
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
        saveTitle,
        activeSong,
        setActiveSong,
      }}
    >
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </Context.Provider>
  );
}
