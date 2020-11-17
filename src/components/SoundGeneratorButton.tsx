/* eslint-disable jsx-a11y/anchor-is-valid */
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
  private midiGenerator: MidiGenerator;
  private musicInputParser: MusicInputParser;
  private downloadFileRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: Props) {
    super(props);

    this.midiGenerator = new MidiGenerator();
    this.musicInputParser = new MusicInputParser();

    this.downloadFileRef = React.createRef();
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.generateMidiDataUri = this.generateMidiDataUri.bind(this);
  }

  private generateMidiDataUri(): string {
    const soundEvents = this.musicInputParser.parseInput(this.props.input);
    this.midiGenerator.resetState();
    const midi = this.midiGenerator.generateMidiFromSoundEvents(soundEvents);
    const midiData = `data:audio/midi;base64,${base64.bytesToBase64(
      midi.buildFile()
    )}`;

    return midiData;
  }

  private onPlayClick() {
    MIDIJS.play(this.generateMidiDataUri());
  }

  private onUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      event.target.files[0].text().then((p) => {
        this.props.setInput(p);
      });
    }
  }

  private onDownloadFile() {
    if (this.downloadFileRef.current) {
      this.downloadFileRef.current.href = this.generateMidiDataUri();
    }
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return (
      <div style={{ position: "relative", width: "100%", marginTop: 10 }}>
        <button className={"btn btn-primary"} onClick={this.onPlayClick}>
          Tocar
        </button>{" "}
        <a
          className={"btn btn-primary"}
          download="generated.midi"
          ref={this.downloadFileRef}
          onMouseDown={(e) => {
            this.onDownloadFile();
          }}
        >
          Download
        </a>
        <label
          className="btn btn-secondary btn-file"
          style={{ float: "right" }}
        >
          Selecionar Arquivo{" "}
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            onChange={this.onUploadFile}
          />
        </label>
      </div>
    );
  }
}
