import React from "react";
import ReactDOM from "react-dom";
import { Synth, MembraneSynth, now as ToneNow, Sampler } from "tone";
import { parseNotesFromText } from "../utils/parseTextInput";
import { SampleLibrary } from "../external-packages/tone-instruments/Tonejs-Instruments";
import { Instrument } from "tone/build/esm/instrument/Instrument";
import {
  ToneJsInstrument,
  loadSampleLibrary,
  SamplerLibrary,
} from "../utils/SampleLibraryWrapper";

// Props são os "parametros" do nosso componente (ver App.tsx)
type Props = { input: string; initialInstrument: ToneJsInstrument };

// Estado é o estado mutavel de nosso componente (https://pt-br.reactjs.org/docs/state-and-lifecycle.html). Não utilizado por enquanto
type State = {
  library: SamplerLibrary | null;
  loaded: boolean;
  currentInstrument: null | Sampler;
};

export default class SoundGeneratorButton extends React.Component<
  Props, // Nossas props definidas acima (válido só pra esse componente)
  State // Nosso state definido acima (válido só pra esse componente)
> {
  constructor(props: Props) {
    super(props); // Chamamos o construtor do pai herdado
    this.state = {
      loaded: false,
      library: null,
      currentInstrument: null,
    }; // Ainda não carregado

    // Ignorar isso -> Necessario para compatibilidade com react oop
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.library === null) {
      const library = loadSampleLibrary({
        baseUrl: "https://site-tcp-2020.s3-sa-east-1.amazonaws.com/samples/",
        instruments: ["piano", "guitar-acoustic"],
        onload: (instrumentName) => {
          if (instrumentName === this.props.initialInstrument) {
            console.log(
              "loaded initial instrument " + this.props.initialInstrument
            );

            this.setState({ loaded: true });
          } else {
            console.log("loaded " + instrumentName);
          }
        },
      });

      this.setState({
        library: library,
        currentInstrument: library[this.props.initialInstrument],
        loaded: false,
      });
    }
  }

  // handleClick é chamado pelo botão ao ser clicado
  private handleClick() {
    const now = ToneNow();

    // Tocando 2 notas por segundo:
    const notes = parseNotesFromText(this.props.input);

    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];

      // agendamos a nota para ser tocada daqui a index * 0.5 segundos
      // this.synth.triggerAttackRelease(note, 0.5, now + 0.5 * index);
    }
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return this.state.loaded ? (
      <div>
        <button className={"btn btn-primary"} onClick={this.handleClick}>
          Gerar
        </button>
      </div>
    ) : (
      <div className="alert alert-info">Carregando...</div>
    );
  }
}
