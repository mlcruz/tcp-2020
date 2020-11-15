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
// https://github.com/grimmdude/MidiWriterJS
//@ts-ignore
import MidiWriter from "midi-writer-js";

type MidiState = {
  currentTime: number;
  bpm: number;
  instrument: MidiInstrument;
  octave: Octave;
};

export class MidiGenerator {
  private initialInstrument: MidiInstrument;
  private state: MidiState;

  private instrumentList = [
    MidiInstrument["acoustic-bass"],
    MidiInstrument["acoustic-guitar"],
    MidiInstrument["acoustic-piano"],
    MidiInstrument.trumpet,
    MidiInstrument.violin,
  ];

  constructor(initialInstrument: MidiInstrument) {
    this.initialInstrument = initialInstrument;
    this.state = {
      bpm: 60,
      currentTime: 0,
      instrument: initialInstrument,
      octave: 3,
    };
  }

  public async resetState() {}

  public generateMidiFromSoundEvents(parsedInputList: SoundEvent[]) {
    var track = new MidiWriter.Track();
    track.addEvent(
      new MidiWriter.ProgramChangeEvent({ instrument: this.state.instrument })
    );

    for (let i = 0; i < parsedInputList.length; i++) {
      const period = this.beatPeriod();
      const event = parsedInputList[i];

      switch (event.type) {
        case "NOTE": {
          var note = new MidiWriter.NoteEvent({
            pitch: [
              `${event.pitch}${this.state.octave.toString().toUpperCase()}`,
            ],
            duration: period,
          });

          track.addEvent(note);
          break;
        }
        case "CHANGE_INSTRUMENT": {
          this.state.instrument = this.getRandomInstrument();
          track.addEvent(
            new MidiWriter.ProgramChangeEvent({
              instrument: this.state.instrument,
            })
          );
          break;
        }
      }
    }
    const data = new MidiWriter.Writer(track);
    return data;
  }

  private getRandomInstrument(): MidiInstrument {
    const now = new Date().getTime();
    const randomIndex = now % this.instrumentList.length;

    let randomInstrument = this.instrumentList[randomIndex];

    if (randomInstrument !== this.state.instrument) {
      return randomInstrument;
    }

    const newRandomIndex = (this.state.instrument =
      (now + 1) % this.instrumentList.length);

    return this.instrumentList[newRandomIndex];
  }

  // Beats são descritos em ticks de 1/128 de 2 segundos na biblioteca no seguinte formato:
  // Tn : where n is an explicit number of ticks (T128 = 1 beat)
  private beatPeriod(): string {
    // o periodo em é igual a 60 / bpm
    const period = 60 / this.state.bpm;

    // para um periodo de 1 segundo, temos 64 ticks
    // para um periodo de x, temos um numero inteiro de (x * 64) ticks
    const beatTicks = Math.round(period * 64).toFixed();

    return `T${beatTicks}`;
  }
}
