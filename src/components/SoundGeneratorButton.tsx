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
type Props = {
  input: string;
  initialInstrument: ToneJsInstrument;
  instrumentsToLoad: ToneJsInstrument[];
};

// Estado é o estado mutavel de nosso componente (https://pt-br.reactjs.org/docs/state-and-lifecycle.html). Não utilizado por enquanto
type State = {
  library: SamplerLibrary | null;
  loaded: boolean;
  currentInstrument: null | { name: ToneJsInstrument; instrument: Sampler };
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

    // Aqui damos um bind na definição do metodo com o objeto construido
    // Pode ignorar isso, é só mais uma bizarrice de js orientado a objetos
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.swapInstrument = this.swapInstrument.bind(this);
  }

  componentDidMount() {
    if (this.state.library === null) {
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
        library: library,
        currentInstrument: {
          name: this.props.initialInstrument,
          instrument: library[this.props.initialInstrument],
        },
        loaded: false,
      });
    }
  }

  // handleClick é chamado pelo botão ao ser clicado
  private handlePlayClick() {
    const now = ToneNow();

    // Tocando 2 notas por segundo:
    const notes = parseNotesFromText(this.props.input);

    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      const selectedInstrument = this.state.currentInstrument!;

      // Instrumento selectionado vai para saida principal
      selectedInstrument.instrument.toMaster();

      // agendamos a nota para ser tocada daqui a index * 0.5 segundos
      selectedInstrument.instrument.triggerAttackRelease(
        note,
        0.5,
        now + 0.5 * index
      );
    }
  }

  // handleClick é chamado pelo botão ao ser clicado
  private swapInstrument(instrument: ToneJsInstrument) {
    this.setState({
      currentInstrument: {
        name: instrument,
        instrument: this.state.library![instrument],
      },
    });
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return this.state.loaded ? (
      <div>
        <br />
        <div>
          {this.props.instrumentsToLoad.map((instrumentName) => (
            <div className="form-check" key={`${instrumentName}-input-div`}>
              <input
                className="form-check-input"
                type="radio"
                name="instrumentRadios"
                id={`${instrumentName}-input-radio`}
                value={`${instrumentName}`}
                onChange={(e) =>
                  this.swapInstrument(e.target.value as ToneJsInstrument)
                }
                key={`${instrumentName}-input-radio`}
                checked={this.state.currentInstrument?.name === instrumentName}
              />
              <label
                key={`${instrumentName}-input-label`}
                className="form-check-label"
                htmlFor={`${instrumentName}-input-radio`}
              >
                {instrumentName}
              </label>
            </div>
          ))}
        </div>

        <button
          className={"btn btn-primary"}
          onClick={this.handlePlayClick}
          style={{ marginTop: 15 }}
        >
          Gerar
        </button>
      </div>
    ) : (
      <div className="alert alert-info">Carregando...</div>
    );
  }
}

{
  /* <div className="form-check">
<input
  className="form-check-input"
  type="radio"
  name="instrumentRadios"
  id="piano-radio"
  value="piano"
/>
<label className="form-check-label" htmlFor="piano-radio">
  Piano
</label>
</div> */
}
