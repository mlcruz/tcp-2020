import React from "react";
import * as base64 from "byte-base64";

// Importamos bibliotecas definidas em from ...
import { MidiGenerator } from "../class/MidiGenerator";
import { MusicInputParser } from "../class/MusicInputParser";

//@ts-ignore
const MIDIJS = MIDIjs;

// Props são os "parametros" do construtor de nosso componente (ver App.tsx)
type Props = {
  input: string;
  setInput: (val: string) => void;
};

export default class SoundGeneratorButton extends React.Component<
  Props // Nossas props definidas acima (válido só pra esse componente)
> {
  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    const inputParser = new MusicInputParser();
    const soundEvents = inputParser.parseInput(this.props.input);

    const midiGenerator = new MidiGenerator();
    const midi = midiGenerator.generateMidiFromSoundEvents(soundEvents);

    const midiData = `data:audio/midi;base64,${base64.bytesToBase64(
      midi.buildFile()
    )}`;

    return (
      <div style={{ position: "relative", width: "100%", marginTop: 10 }}>
        <button
          className={"btn btn-primary"}
          onClick={() => {
            MIDIJS.play(midiData);
          }}
        >
          Tocar
        </button>{" "}
        <a
          href={midiData}
          className={"btn btn-primary"}
          download="generated.midi"
        >
          Download
        </a>{" "}
        <label
          className="btn btn-secondary btn-file"
          style={{ float: "right" }}
        >
          Selecionar Arquivo{" "}
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                // @ts-ignore
                event.target.files[0].text().then((p) => {
                  this.props.setInput(p);
                });
              }
            }}
          />
        </label>
      </div>
    );
  }
}
