import { timer } from "../utils/timer";
import { Midi, Track, Header } from "@tonejs/midi";
import {
  MidiInstrument,
  InstrumentInput,
  MidiNote,
  Pitch,
  Command,
} from "./MidiInstrument";
import { PolySynth } from "tone";
import { Note } from "@tonejs/midi/dist/Note";

export class MidiPlayer {
  // private InstrumentLibrary: { [key in ToneJsInstrument]: Instrument };
  private setMidiState: (midiState: Midi) => void;
  private initialInstrument: MidiInstrument;
  private synth: PolySynth;
  private bpm: number;

  private currentOctave: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  constructor(
    setMidiState: (midiState: Midi) => void,
    initialInstrument: MidiInstrument
  ) {
    this.setMidiState = setMidiState;
    this.initialInstrument = initialInstrument;
    this.currentOctave = 3;
    this.bpm = 60;
    this.synth = new PolySynth();
  }

  private async waitPeriod() {
    await timer((60 / this.bpm) * 1000);
  }

  public async resetState() {}

  public async playInput(input: string) {
    const parsedInput = this.parseInput(input);
    const track = this.generateTrackFromInstrumentInput(parsedInput);

    this.synth.toMaster();
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
        const noteName = parsedInput.pitch + parsedInput.octave.toString();

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
