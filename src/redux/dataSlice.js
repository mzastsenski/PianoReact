import { createSlice } from "@reduxjs/toolkit";
import { postSongToDB, editSong, deleteSongFromDB } from "../requests";
import { piano1, piano2 } from "../data/sounds";
import { defaultSongs } from "../data/default_songs";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: "",
    soundName: "piano1",
    songs: [],
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
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    setTimeoutArr: (state, action) => {
      state.timeoutArr = action.payload;
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
      const newSong = newSongs.find((e) => e.id === song.id);
      newSong.title = text;
      state.songs = newSongs;
      if (!state.user)
        localStorage.setItem("songs", JSON.stringify(state.songs));
      if (state.user) editSong(newSong);
    },
  },
});

export const {
  setUser,
  setSongs,
  setSound,
  setOpened,
  setPlaying,
  setActiveNote,
  setActiveSong,
  setTimeoutArr,
  recordStart,
  stop,
  saveSong,
  saveTitle,
  playNoteTouch,
  deleteSong,
} = dataSlice.actions;

export default dataSlice.reducer;
