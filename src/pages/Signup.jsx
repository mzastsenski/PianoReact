import "./Modal.scss";
import "./Login.scss";
import { NavLink } from "react-router-dom";
import { signUp } from "../requests";

const Signup = () => {
  const submit = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.password.value;
    const passConf = e.target.confirm.value;

    user && pass && passConf && pass === passConf
      ? signUp({ user, pass })
      : alert("Enter your data");
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <form className="Login" onSubmit={submit}>
            <label className="field">
              <input name="user" type="text" placeholder="Username"></input>
            </label>
            <label className="field">
              <input
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </label>
            <label className="field">
              <input
                name="confirm"
                type="password"
                placeholder="Confirm password"
              ></input>
            </label>
          <br />
          <div className="login_buttons">
            <button type="submit">Sign up</button>
            <NavLink to="/">
              <button type="button">Cancel</button>
            </NavLink>
          </div>
          <NavLink to="/Login">
            <p type="button">Already registered? Login</p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signup;
