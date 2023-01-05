import "./SongsContainer.sass";
import { useContext } from "react";
import { Context } from "../../context";
import Song from "../Song/Song";

export default function SongsContainer() {
  const { songs } = useContext(Context);
  return (
    <div className="songs_container">
      {songs.map((e, i) => (
        <Song key={i + 1} song={e} />
      ))}
    </div>
  );
}
