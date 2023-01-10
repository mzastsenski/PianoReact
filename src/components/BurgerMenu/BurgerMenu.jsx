import "./BurgerMenu.sass";
import { useSelector, useDispatch } from "react-redux";
import { setOpened } from "../../redux/dataSlice";

export default function BurgerMenu() {
  const menuOpened = useSelector((state) => state.data.menuOpened);
  const dispatch = useDispatch();
  return (
    <div
      className={menuOpened ? "burger-menu menu-opened" : "burger-menu"}
      onClick={() => dispatch(setOpened(!menuOpened))}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
