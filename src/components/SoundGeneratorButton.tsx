import React from "react";
import ReactDOM from "react-dom";
import { Synth, MembraneSynth, now as ToneNow } from "tone";
import { parseNotesFromText } from "../utils/parseTextInput";

// Props são os "parametros" do nosso componente (ver App.tsx)
type Props = { input: string };

// Estado é o estado mutavel de nosso componente (https://pt-br.reactjs.org/docs/state-and-lifecycle.html). Não utilizado por enquanto
type State = {};

export default class SoundGeneratorButton extends React.Component<
  Props, // Nossas props definidas acima (válido só pra esse componente)
  State // Nosso state definido acima (válido só pra esse componente)
> {
  private synth: Synth; // Atributo privado do tipo Synth => Equivalente a Synth synth; em c#.

  constructor(props: Props) {
    super(props); // Chamamos o construtor do pai herdado
    this.state = {}; // Estado vazio

    // Ignorar isso -> Necessario para compatibilidade com react
    this.handleClick = this.handleClick.bind(this);

    // Inicializamos nosso MembraSynth => Sintetizador de sons com um tom especifico
    this.synth = new MembraneSynth().toDestination();
  }

  // handleClick é chamado pelo botão ao ser clicado
  private handleClick() {
    const now = ToneNow();

    // Tocando 2 notas por segundo:
    const notes = parseNotesFromText(this.props.input);

    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];

      // agendamos a nota para ser tocada daqui a index * 0.5 segundos
      this.synth.triggerAttackRelease(note, 0.5, now + 0.5 * index);
    }
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return (
      <div>
        <button className={"btn btn-primary"} onClick={this.handleClick}>
          Gerar
        </button>
      </div>
    );
  }
}
