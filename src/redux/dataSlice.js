import { createSlice } from "@reduxjs/toolkit";
import { postSongToDB, editSong, deleteSongFromDB } from "../requests";
import { piano1, piano2 } from "../data/sounds";
import { defaultSongs } from "../data/default_songs";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: "",
    soundName: "piano1",
    songs: defaultSongs,
    isRecord: false,
    isPlaying: false,
    startTime: 0,
    record: [],
    activeSong: defaultSongs[0],
    timeoutArr: [],
    activeNote: "",
    menuOpened: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setSound: (state, action) => {
      state.soundName = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload;
    },
    setOpened: (state, action) => {
      state.menuOpened = action.payload;
    },

    playNoteTouch: (state, action) => {
      const e = action.payload;
      let sound = piano1;
      if (state.sound === "piano2") sound = piano2;
      sound[e].currentTime = 0;
      sound[e].play();
      if (state.isRecord) {
        state.record.push({
          key: e,
          delay: Date.now() - state.startTime,
          delayStop: null,
        });
      }
    },

    recordStart: (state) => {
      state.isRecord = true;
      state.startTime = Date.now();
    },

    stop: (state) => {
      state.isRecord = false;
      state.isPlaying = false;
      state.timeoutArr.forEach((e) => clearTimeout(e));
    },

    playSong: (state, action) => {
      const song = action.payload;
      state.isRecord = false;
      state.isPlaying = false;
      state.timeoutArr.forEach((e) => clearTimeout(e));
      state.isPlaying = true;
      let sound = piano1;
      if (state.soundName === "piano2") sound = piano2;
      const arr = [];
      song.forEach((e, i) => {
        const timeout = setTimeout(() => {
          sound[e.key].currentTime = 0;
          sound[e.key].play();
          state.activeNote = e.key;
          if (i > 0 && e.key === song[i - 1].key)
            state.activeNote = `${e.key}${e.key}`; ///  if note will repeat
          if (i > 1 && e.key === song[i - 2].key) state.activeNote = e.key;
          if (i > 2 && e.key === song[i - 3].key)
            state.activeNote = `${e.key}${e.key}`;
        }, e.delay);
        arr.push(timeout);
        if (i === song.length - 1) {
          const timeout2 = setTimeout(() => {
            state.isPlaying = false;
          }, e.delay + 1000);
          arr.push(timeout2);
        }
        // setTimeout(() => {
        //   sound[e.key].pause();
        // }, e.delayStop);
      });
      state.timeoutArr = arr;
    },

    playRecord: (state) => {
      let song;
      if (state.record.length) song = state.record;
      else if (state.activeSong.song) song = state.activeSong.song;
      let sound = piano1;
      if (state.soundName === "piano2") sound = piano2;
      const arr = [];
      song.forEach((e, idx) => {
        const key = e.key;
        const i = idx;
        const timeout = setTimeout(() => {
          sound[key].currentTime = 0;
          sound[key].play();
          state.activeNote = key;
          if (i > 0 && key === song[i - 1].key)
            state.activeNote = `${key}${key}`; ///  if note will repeat
          if (i > 1 && key === song[i - 2].key) state.activeNote = key;
          if (i > 2 && key === song[i - 3].key)
            state.activeNote = `${key}${key}`;
        }, e.delay);
        arr.push(timeout);
        if (i === song.length - 1) {
          const timeout2 = setTimeout(() => {
            state.isPlaying = false;
          }, e.delay + 1000);
          arr.push(timeout2);
        }
        // setTimeout(() => {
        //   sound[key].pause();
        // }, e.delayStop);
      });
      state.timeoutArr = arr;
    },

    saveSong: (state) => {
      if (state.record.length) {
        const newSong = {
          id: Date.now(),
          user: state.user,
          title: `My Song ${state.songs.length + 1}`,
          song: state.record,
        };
        state.songs = [...state.songs, newSong];
        state.record = [];
        if (state.user) postSongToDB(newSong);
      }
    },

    deleteSong: (state, action) => {
      const id = action.payload;
      state.songs = state.songs.filter((e) => e.id !== id);
      if (state.user) deleteSongFromDB({ user: state.user, id });
    },

    saveTitle: (state, action) => {
      const { text, song } = action.payload;
      const newSongs = [...state.songs];
      const finded = newSongs.find((e) => e.id === song.id);
      finded.title = text;
      state.songs = newSongs;
      if (!state.user)
        localStorage.setItem("songs", JSON.stringify(state.songs));
      if (state.user) editSong(song);
    },
  },
});

export const {
  setUser,
  setSongs,
  setSound,
  setOpened,
  setActiveSong,
  recordStart,
  stop,
  playRecord,
  saveSong,
  saveTitle,
  playNoteTouch,
  playSong,
  deleteSong,
} = dataSlice.actions;

export default dataSlice.reducer;
