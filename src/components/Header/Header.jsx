import "./Header.scss";
import SideMenu from "../SideMenu/SideMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiUser as UserIcon } from "react-icons/bi";
import { FiPower as LoginIcon } from "react-icons/fi";
// import { useSelector } from "react-redux";

let getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const Header = (props) => {
  let [width, setWidth] = useState(getWidth());
  // const user = useSelector((state) => state.user);
  const user = "Kolja";

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      // window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <div className="header">
      <span className="title">
        <NavLink to="/" className="menuItem1">
          Piano
        </NavLink>
      </span>
      {user ? (
        <>
          <NavLink to="/Login" className="user_name">
            &nbsp;{user}&nbsp;
          </NavLink>
          <NavLink to="/Login" className="user_name">
            <UserIcon size={31} />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/Login" className="user_name">
            &nbsp;Login&nbsp;
          </NavLink>
          <NavLink to="/Login" className="user_name">
            <LoginIcon size={30} />
          </NavLink>
        </>
      )}
      <BurgerMenu />
      <SideMenu />
    </div>
  );
};

export default Header;
