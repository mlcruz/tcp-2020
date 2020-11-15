import React from "react";
import * as base64 from "byte-base64";

// Importamos bibliotecas definidas em from ...
import { MidiGenerator } from "../class/MidiGenerator";
import { MidiInstrument } from "../class/MidiInstrument";
import { MusicInputParser } from "../class/MusicInputParser";

//@ts-ignore
const MIDIJS = MIDIjs;

// Props são os "parametros" do construtor de nosso componente (ver App.tsx)
type Props = {
  input: string;
  initialInstrument: MidiInstrument;
};

export default class SoundGeneratorButton extends React.Component<
  Props // Nossas props definidas acima (válido só pra esse componente)
> {
  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    const inputParser = new MusicInputParser();
    const soundEvents = inputParser.parseInput(this.props.input);

    const midiGenerator = new MidiGenerator(this.props.initialInstrument);
    const midi = midiGenerator.generateMidiFromSoundEvents(soundEvents);

    const midiData = `data:audio/midi;base64,${base64.bytesToBase64(
      midi.buildFile()
    )}`;

    return (
      <div>
        <div>
          <br></br>
          <button
            className={"btn btn-primary"}
            onClick={() => {
              MIDIJS.play(midiData);
            }}
          >
            Tocar
          </button>
          <br></br>
          <a
            href={midiData}
            className={"btn btn-primary"}
            download="generated.midi"
          >
            Download
          </a>
        </div>
      </div>
    );
  }
}
