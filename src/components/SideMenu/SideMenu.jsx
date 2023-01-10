import "./SideMenu.sass";
import SongItem from "./SongItem";
import { useSelector } from "react-redux";

export default function CardsList() {
  const songs = useSelector((state) => state.data.songs);
  const menuOpened = useSelector((state) => state.data.menuOpened);

  return (
    <div className={menuOpened ? "side_menu show" : "side_menu"}>
      <h3 className="side_menu_title">My Songs:</h3>
      {songs.map((e, i) => (
        <SongItem key={i + 1} idx={i} song={e} />
      ))}
    </div>
  );
}
