import "./SideMenu.sass";
import { useContext } from "react";
import { Context } from "../../context";
import SongItem from "./SongItem";

export default function CardsList() {
  const { menuOpened, songs } = useContext(Context);

  return (
    <div className={menuOpened ? "side_menu show" : "side_menu"}>
      <h3 className="side_menu_title">My Songs:</h3>
      {songs.map((e, i) => (
        <SongItem key={i + 1} idx={i} song={e} />
      ))}
    </div>
  );
}
