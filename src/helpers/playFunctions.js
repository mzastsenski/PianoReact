import { piano1, piano2 } from "../data/sounds";
import {
  setPlaying,
  stop,
  setActiveNote,
  setTimeoutArr,
} from "../redux/dataSlice";

export const playSong = (dispatch, song, soundName) => {
  dispatch(stop());
  dispatch(setPlaying(true));
  let sound = piano1;
  if (soundName === "piano2") sound = piano2;
  const arr = [];
  song.forEach((e, i) => {
    const timeout = setTimeout(() => {
      sound[e.key].currentTime = 0;
      sound[e.key].play();
      dispatch(setActiveNote(e.key));

      if (i > 0 && e.key === song[i - 1].key)
        dispatch(setActiveNote(`${e.key}${e.key}`)); ///  if note will repeat
      if (i > 1 && e.key === song[i - 2].key) dispatch(setActiveNote(e.key));
      if (i > 2 && e.key === song[i - 3].key)
        dispatch(setActiveNote(`${e.key}${e.key}`));
    }, e.delay);
    arr.push(timeout);

    if (i === song.length - 1) {
      const timeout2 = setTimeout(() => {
        dispatch(setPlaying(false));
      }, e.delay + 1000);
      arr.push(timeout2);
    }

    // if (soundName === "piano2") {
    //   const timeoutStop = setTimeout(() => {
    //     sound[e.key].pause();
    //   }, e.delayStop);
    //   arr.push(timeoutStop);
    // }
    
  });
  dispatch(setTimeoutArr(arr));
};
