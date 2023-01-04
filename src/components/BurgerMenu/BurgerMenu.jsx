import "./BurgerMenu.sass";
import { useContext } from "react";
import { Context } from "../../context";

export default function BurgerMenu() {
  const {  menuOpened, setOpened } = useContext(Context);
  return (
    <div
      className={menuOpened ? "burger-menu menu-opened" : "burger-menu"}
      onClick={() => setOpened(!menuOpened)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
