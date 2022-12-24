import "./piano.scss";

export default function Piano({ playNoteTouch }) {
  return (
    <div className="keys">
      <div
        className="key"
        data-note="a"
        onClick={() => playNoteTouch("a")}
      ></div>
      <div
        className="key sharp"
        data-note="w"
        onClick={() => playNoteTouch("w")}
      ></div>
      <div
        className="key"
        data-note="s"
        onClick={() => playNoteTouch("s")}
      ></div>
      <div
        className="key sharp"
        data-note="e"
        onClick={() => playNoteTouch("e")}
      ></div>
      <div
        className="key"
        data-note="d"
        onClick={() => playNoteTouch("d")}
      ></div>
      <div
        className="key"
        data-note="f"
        onClick={() => playNoteTouch("f")}
      ></div>
      <div
        className="key sharp"
        data-note="t"
        onClick={() => playNoteTouch("t")}
      ></div>
      <div
        className="key"
        data-note="g"
        onClick={() => playNoteTouch("g")}
      ></div>
      <div
        className="key sharp"
        data-note="y"
        onClick={() => playNoteTouch("y")}
      ></div>
      <div
        className="key"
        data-note="h"
        onClick={() => playNoteTouch("h")}
      ></div>
      <div
        className="key sharp"
        data-note="u"
        onClick={() => playNoteTouch("u")}
      ></div>
      <div
        className="key"
        data-note="j"
        onClick={() => playNoteTouch("j")}
      ></div>
      <div
        className="key"
        data-note="k"
        onClick={() => playNoteTouch("k")}
      ></div>
      <div
        className="key sharp"
        data-note="o"
        onClick={() => playNoteTouch("o")}
      ></div>
      <div
        className="key"
        data-note="l"
        onClick={() => playNoteTouch("l")}
      ></div>
      <div
        className="key sharp"
        data-note="p"
        onClick={() => playNoteTouch("p")}
      ></div>
      <div
        className="key"
        data-note=";"
        onClick={() => playNoteTouch(";")}
      ></div>
    </div>
  );
}
