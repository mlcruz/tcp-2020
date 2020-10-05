import React from "react";
import ReactDOM from "react-dom";
import { Synth, MembraneSynth, now as ToneNow, Sampler } from "tone";
import { parseNotesFromText } from "../utils/parseTextInput";
import { SampleLibrary } from "../external-packages/tone-instruments/Tonejs-Instruments";
import { Instrument } from "tone/build/esm/instrument/Instrument";

// Importamos bibliotecas definidas em from ...
import {
  ToneJsInstrument,
  loadSampleLibrary,
  SamplerLibrary,
} from "../utils/SampleLibraryWrapper";
import { InstrumentLibrary } from "../class/InstrumentLibrary";

// Props são os "parametros" do construtor de nosso componente (ver App.tsx)
type Props = {
  input: string;
  initialInstrument: ToneJsInstrument;
  instrumentsToLoad: ToneJsInstrument[];
};

// Estado é o estado mutavel de nosso component.
type State = {
  loaded: boolean;
  instrumentLibrary: InstrumentLibrary | null;
};

export default class SoundGeneratorButton extends React.Component<
  Props, // Nossas props definidas acima (válido só pra esse componente)
  State // Nosso state definido acima (válido só pra esse componente)
> {
  constructor(props: Props) {
    super(props); // Chamamos o construtor do pai herdado

    this.state = {
      loaded: false,
      instrumentLibrary: null,
    }; // Ainda não carregado

    // Aqui damos um bind na definição do metodo com o objeto construido
    // Pode ignorar isso, é só mais uma bizarrice de js orientado a objetos
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    if (this.state.instrumentLibrary === null) {
      const library = loadSampleLibrary({
        baseUrl: "https://site-tcp-2020.s3-sa-east-1.amazonaws.com/samples/",
        instruments: this.props.instrumentsToLoad,
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
        loaded: false,
        instrumentLibrary: new InstrumentLibrary(library, (state) => {
          this.setState({ instrumentLibrary: state });
        }),
      });
    }
  }

  // handleClick é chamado pelo botão ao ser clicado
  private async handlePlayClick() {
    const now = ToneNow(); // Pega tempo atual em unix epoch (milis)
    this.state.instrumentLibrary?.resetState();
    const input = this.props.input;

    for (let index = 0; index < input.length; index++) {
      const char = input[index];

      await this.state.instrumentLibrary?.playInput(char);
      console.log(this.state.instrumentLibrary);
    }
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return this.state.loaded ? (
      <div>
        <div style={{ display: "inline-block" }}>
          <button className={"btn btn-primary"} onClick={this.handlePlayClick}>
            Gerar
          </button>
        </div>
      </div>
    ) : (
      <div className="alert alert-info">Carregando...</div>
    );
  }
}
