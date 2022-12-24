import "./piano.scss";
import PianoKey from "./PianoKey";

export default function Piano() {
  return (
    <div className="keys">
      <PianoKey className="key" note="a" />
      <PianoKey className="key sharp" note="w" />
      <PianoKey className="key" note="s" />
      <PianoKey className="key sharp" note="e" />
      <PianoKey className="key" note="d" />
      <PianoKey className="key" note="f" />
      <PianoKey className="key sharp" note="t" />
      <PianoKey className="key" note="g" />
      <PianoKey className="key sharp" note="y" />
      <PianoKey className="key" note="h" />
      <PianoKey className="key sharp" note="u" />
      <PianoKey className="key" note="j" />
      <PianoKey className="key" note="k" />
      <PianoKey className="key sharp" note="o" />
      <PianoKey className="key" note="l" />
      <PianoKey className="key sharp" note="p" />
      <PianoKey className="key" note=";" />
    </div>
  );
}
