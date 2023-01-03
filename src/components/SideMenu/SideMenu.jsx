import "./SideMenu.sass";
import { useContext } from "react";
import { Context } from "../../context";
import Song from "../Song";

export default function CardsList() {
  const { menuOpened, songs } = useContext(Context);

  return (
    <div className={menuOpened ? "side_menu show" : "side_menu"}>
      {songs.map((e, i) => (
        <Song key={i + 1} idx={i} song={e} />
      ))}
    </div>
  );
}
