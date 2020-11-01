import { timer } from "../utils/timer";
import { Midi, Track, Header } from "@tonejs/midi";
import {
  MidiInstrument,
  SoundEvent,
  Pitch,
  Command,
  Octave,
} from "./MidiInstrument";
import { PolySynth } from "tone";

type MidiState = {
  index: number;
  bpm: number;
  instrument: MidiInstrument;
  octave: Octave;
};

export class MidiGenerator {
  private initialInstrument: MidiInstrument;
  private state: MidiState;

  constructor(initialInstrument: MidiInstrument) {
    this.initialInstrument = initialInstrument;
    this.state = {
      bpm: 60,
      index: 0,
      instrument: initialInstrument,
      octave: 3,
    };
  }

  public async resetState() {}

  public generateMidiFromSoundEvents(parsedInputList: SoundEvent[]): Midi {
    const midi = new Midi();
    const track = new Track([], new Header());

    track.instrument.number = this.initialInstrument;

    while (this.state.index < parsedInputList.length) {
      // Cada instrumento precisa de uma nova track, então separamos os blocos de eventos por instrumento

      const instrumentChangeIndex = parsedInputList.findIndex(
        (element) => element.type == "CHANGE_INSTRUMENT"
      );

      // Dividimos o bloco de um intrumento, se existe alguma instrução de troca de instrumentos
      if (instrumentChangeIndex >= 0) {
        let instrumentTrackEvents = parsedInputList.slice(
          this.state.index,
          instrumentChangeIndex
        );

        const track = this.generateTrackFromSoundEvents(instrumentTrackEvents);
        midi.tracks.push(track);

        // Pulamos o evento de troca de instrumento em si
        this.state.index += instrumentChangeIndex + 1;
      } else {
        // Não existe mais nenhuma troca de instrumentos, então geramos o resto da track
        const track = this.generateTrackFromSoundEvents(
          parsedInputList.slice(this.state.index)
        );
        midi.tracks.push(track);
        break;
      }
    }

    return midi;
  }

  private generateTrackFromSoundEvents(soundEventList: SoundEvent[]): Track {
    const track = new Track([], new Header());
    track.instrument.number = this.state.instrument;

    for (let i = 0; i < soundEventList.length; i++) {
      const event = soundEventList[i];

      const midiIndex = i + this.state.index;

      if (event.type == "NOTE") {
        track.addNote({
          duration: this.state.bpm / 60,
          time: midiIndex * (this.state.bpm / 60),
          pitch: event.pitch,
          octave: this.state.octave,
        });
      }
    }
    return track;
  }
}
