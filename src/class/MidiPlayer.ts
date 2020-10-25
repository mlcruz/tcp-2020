import { timer } from "../utils/timer";
import { Midi, Track, Header } from "@tonejs/midi";
import {
  MidiInstrument,
  InstrumentInput,
  Pitch,
  Command,
} from "./MidiInstrument";
import { PolySynth } from "tone";
export class MidiPlayer {
  private initialInstrument: MidiInstrument;
  private player: any;
  private bpm: number;
  private playMidi: (midiState: Midi) => void;
  private currentOctave: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  constructor(
    setMidiState: (midiState: Midi) => void,
    initialInstrument: MidiInstrument
  ) {
    this.initialInstrument = initialInstrument;
    this.currentOctave = 3;
    this.bpm = 60;
    this.playMidi = setMidiState;
  }

  public async resetState() {}

  public async playInput(input: string) {
    // Transformamos nosso texto puro em um verto de notas/comandos
    const parsedInput = this.parseInput(input);

    // generamos uma track de um midi a partir do input anterior
    const track = this.generateTrackFromInstrumentInput(parsedInput);

    const midi = new Midi();
    midi.tracks.push(track);

    this.playMidi(midi);
  }

  private parseInput(input: string): InstrumentInput[] {
    var result: InstrumentInput[] = [];

    for (let index = 0; index < input.length; index++) {
      const inputChar = input[index];

      // É nota?
      if (inputChar.match("[ABCDEFG]")) {
        result.push({
          type: "NOTE",
          octave: this.currentOctave,
          pitch: inputChar as Pitch,
          bpm: this.bpm,
        });
      } else {
        var command = this.parseCommand(inputChar);
        result.push(command);
      }
    }

    return result;
  }

  private parseCommand(char: string): Command {
    switch (char) {
      case "M":
        return { type: "DOUBLE_BPM" };
      case "N":
        return { type: "HALF_BPM" };
      case "+":
        return { type: "DOUBLE_VOLUME" };
      case "-":
        return { type: "HALF_VOLUME" };
      case "U":
        return { type: "INCREASE_OCTAVE" };
      case "J":
        return { type: "DECREASE_OCTACE" };
      case "I":
        return {
          type: "CHANGE_INSTRUMENT",
          value: MidiInstrument["acoustic-guitar"],
        };
      default:
        return { type: "SILENCE" };
    }
  }

  private generateTrackFromInstrumentInput(
    parsedInputList: InstrumentInput[]
  ): Track {
    const track = new Track([], new Header());

    parsedInputList.forEach((parsedInput) => {
      if (parsedInput.type == "NOTE") {
        track.addNote({
          octave: parsedInput.octave,
          time: parsedInput.bpm / 60,
          pitch: parsedInput.pitch,
        });

        track.instrument.number = this.initialInstrument;
      }
    });

    return track;
  }
}
