import "./Header.sass";
import { useContext } from "react";
import { Context } from "../../context";
import SideMenu from "../SideMenu/SideMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { NavLink } from "react-router-dom";
import { BiUser as UserIcon } from "react-icons/bi";

export default function Header() {
  const { user } = useContext(Context);

  return (
    <div className="header">
      <span className="title">
        <NavLink to="/" className="menuItem1">
          React - Piano
        </NavLink>
      </span>
      <div>
        <NavLink to="/Login">
          <span className="login_icons">
            {user ? user : "Login"}&nbsp;
            <UserIcon size={31} />
          </span>
        </NavLink>
      </div>
      <BurgerMenu />
      <SideMenu />
    </div>
  );
}
