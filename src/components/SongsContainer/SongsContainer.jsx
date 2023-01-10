import "./SongsContainer.sass";
import Song from "../Song/Song";
import { useSelector  } from "react-redux";

export default function SongsContainer() {
  const songs = useSelector((state) => state.data.songs);
  return (
    <div className="songs_container">
      {songs.map((e, i) => (
        <Song key={i + 1} song={e} />
      ))}
    </div>
  );
}
