/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import * as base64 from "byte-base64";

// Importamos bibliotecas definidas em from ...
import { MidiGenerator } from "../class/MidiGenerator";
import { InputSoundEventParser } from "../class/InputSoundEventParser";

//@ts-ignore
// Midi js é uma biblioteca de uma versão mais antiga de javascript
// Então precisamos definir ela como uma constante que vem de um global da página (infelizmente)
const MIDIJS = MIDIjs;

// Props são os "parametros" do construtor de nosso componente (ver App.tsx)
type Props = {
  input: string;
  setInput: (val: string) => void;
};

export default class SoundGeneratorButton extends React.Component<Props> {
  private midiGenerator: MidiGenerator;

  // Music input parser é responsavel por transformar a entrada de usuario de string
  // para uma representação intermediaria de array de SoundEvents (ver MidiInstrument.ts)
  private inputSoundEventParser: InputSoundEventParser;

  // Precisamos de uma referencia ao elemento de link de download para
  // atribuir o link de download para seu atributo href quando o elemento clicado
  private downloadFileRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: Props) {
    super(props);

    this.midiGenerator = new MidiGenerator();
    this.inputSoundEventParser = new InputSoundEventParser();

    this.downloadFileRef = React.createRef();

    // Passamos a instancia do objeto como 'this' das funções definidas na classe (bind)
    // Por mais estupido que pareça, infelizmente é assim que javascript funciona
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.generateMidiDataUri = this.generateMidiDataUri.bind(this);
  }

  // Geramos um link contendo os dados para download do arquivo Midi
  private generateMidiDataUri(): string {
    const soundEvents = this.inputSoundEventParser.parseInput(this.props.input);
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
        // atribuimos o valor de texto do arquivo para o campo de texto do comeponente pai
        this.props.setInput(p);
      });
    }
  }

  // trocamos o href do link de download pela url de dados gerada
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
