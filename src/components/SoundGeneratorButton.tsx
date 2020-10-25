import React from "react";

// Importamos bibliotecas definidas em from ...
import { MidiPlayer } from "../class/MidiPlayer";
import { Midi } from "@tonejs/midi";
import { MidiInstrument } from "../class/MidiInstrument";

// Props são os "parametros" do construtor de nosso componente (ver App.tsx)
type Props = {
  input: string;
  initialInstrument: MidiInstrument;
};

// Estado é o estado mutavel de nosso component.
type State = {
  instrumentLibrary: MidiPlayer;
  midiState: Midi;
};

export default class SoundGeneratorButton extends React.Component<
  Props, // Nossas props definidas acima (válido só pra esse componente)
  State // Nosso state definido acima (válido só pra esse componente)
> {
  constructor(props: Props) {
    super(props); // Chamamos o construtor do pai herdado

    const setMidiState = (midiState: Midi) =>
      this.setState({ midiState: midiState });

    this.state = {
      instrumentLibrary: new MidiPlayer(setMidiState, props.initialInstrument),
      midiState: new Midi(),
    };

    // Aqui damos um bind na definição do metodo com o objeto construido
    // Pode ignorar isso, é só mais uma bizarrice de js orientado a objetos
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  // handleClick é chamado pelo botão ao ser clicado
  private async handlePlayClick() {
    this.state.instrumentLibrary.resetState();
    const input = this.props.input;

    await this.state.instrumentLibrary.playInput(input);
  }

  // Metodo render do componente define o que vai ser desenhado na tela
  public render() {
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          <button className={"btn btn-primary"} onClick={this.handlePlayClick}>
            Gerar
          </button>
        </div>
      </div>
    );
  }
}
