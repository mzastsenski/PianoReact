import "./piano.scss";
import PianoKey from "./PianoKey";

export default function Piano({ playNoteTouch, activeNote }) {
  return (
    <div className="keys">
      <PianoKey
        className="key"
        note="a"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="w"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="s"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="e"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="d"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="f"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="t"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="g"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="y"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="h"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="u"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="j"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="k"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="o"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note="l"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key sharp"
        note="p"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
      <PianoKey
        className="key"
        note=";"
        playNoteTouch={playNoteTouch}
        activeNote={activeNote}
      />
    </div>
  );
}
