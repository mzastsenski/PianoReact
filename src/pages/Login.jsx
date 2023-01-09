import "./Auth.sass";
import { login, postLogout } from "../requests";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/dataSlice";

const Login = () => {
  const { user } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [style, setStyle] = useState({
    opacity: 0.4,
  });

  useEffect(() => {
    setStyle({
      opacity: 1,
      transition: "0.5s",
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.password.value;
    user && pass
      ? login({ user, pass }, setUser, dispatch)
      : alert("Enter your data");
  };

  const logout = () => {
    localStorage.setItem("user", "");
    setUser("");
    postLogout();
    navigate("/");
  };

  const jsx1 = (
    <form className="login" onSubmit={submit}>
      <label className="field">
        <input name="user" type="text" placeholder="Username"></input>
      </label>
      <label className="field">
        <input
          name="password"
          onKeyPress={(e) => e.key === "Enter" && submit()}
          type="password"
          placeholder="Password"
        ></input>
      </label>
      <br />
      <div className="login_buttons">
        <button type="submit">Login</button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
      <NavLink to="/Signup">
        <p type="button">New user? Sign up</p>
      </NavLink>
    </form>
  );

  const jsx2 = (
    <div className="Login">
      <div className="login-info">
        <>You are logged as {localStorage.getItem("user")}</>
      </div>
      <div className="login_buttons">
        <button type="button" onClick={logout}>
          Logout
        </button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div style={style} className="modal">
      <div className="modal_content">{!user ? jsx1 : jsx2}</div>
    </div>
  );
};

export default Login;
