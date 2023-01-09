import { getSongs, checkUser } from "./requests";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { defaultSongs } from "./data/default_songs";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setSongs } from "./redux/dataSlice";

export default function App() {
  const { user, songs } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = localStorage.getItem("user");
    if (userName) {
      checkUser(userName, setUser, dispatch);
      dispatch(setUser(userName));
      getSongs(userName, setSongs, dispatch);
    } else {
      if (localStorage.getItem("songs")) {
        const localSongs = JSON.parse(localStorage.getItem("songs"));
        if (localSongs.length) dispatch(setSongs(localSongs));
        else dispatch(setSongs(defaultSongs));
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("songs", JSON.stringify(songs));
    }
  }, [songs]);

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
