import { getSongs, checkUser } from "../requests";
import { defaultSongs } from "../data/default_songs";
import { setUser, setSongs } from "../redux/dataSlice";

export const setData = (user, dispatch) => {
  const userName = localStorage.getItem("user");
  if (userName) {
    checkUser(userName, setUser, dispatch);
    dispatch(setUser(userName));
    getSongs(userName, setSongs, dispatch);
  } else {
    if (localStorage.getItem("songs")) {
      const localSongs = JSON.parse(localStorage.getItem("songs"));
      localSongs.length
        ? dispatch(setSongs(localSongs))
        : dispatch(setSongs(defaultSongs));
    } else {
      dispatch(setSongs(defaultSongs));
    }
  }
};
