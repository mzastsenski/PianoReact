// import { useSelector, useDispatch } from "react-redux";
// import { setOpened } from "../../redux/data";
import "./BurgerMenu.scss";
import { useContext } from "react";
import { Context } from "../../context";

export default function BurgerMenu() {
  // const isOpened = useSelector((state) => state.menuOpened);
  // const dispatch = useDispatch();
  const {  menuOpened, setOpened } = useContext(Context);
  return (
    <div
      className={menuOpened ? "burger-menu menu-opened" : "burger-menu"}
      // onClick={() => dispatch(setOpened(!isOpened))}
      onClick={() => setOpened(!menuOpened)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
