import "./Header.sass";
import SideMenu from "../SideMenu/SideMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { NavLink } from "react-router-dom";
import { BiUser as UserIcon } from "react-icons/bi";
import { useSelector  } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.data.user);

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
