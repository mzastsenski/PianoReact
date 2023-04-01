import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "./helpers/setData";

export default function App() {
  const { user, songs } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(user, dispatch);
  }, [user, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("user"))
      localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </>
  );
}
