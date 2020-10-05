import {
  SamplerLibrary,
  ToneJsInstrument,
} from "../utils/SampleLibraryWrapper";
import { Note } from "./Note";
import { Instrument } from "./Instrument";
import { timer } from "../utils/timer";
import { Param } from "tone";
import { throws } from "assert";

type InstrumentDict = { [key in ToneJsInstrument]?: Instrument };

export class InstrumentLibrary {
  // private InstrumentLibrary: { [key in ToneJsInstrument]: Instrument };

  private volume: number;
  private octave: number;
  private bpm: number;
  private currentInstrument: ToneJsInstrument;
  private instrumentDict: InstrumentDict;

  constructor(
    loadedSampleLibrary: SamplerLibrary,
    setState: (instrumentLibrary: InstrumentLibrary | null) => void
  ) {
    this.volume = -20;
    this.octave = 3;
    this.bpm = 60;
    this.currentInstrument = "guitar-acoustic";

    let instrumentLibrary: InstrumentDict = {};

    Object.keys(loadedSampleLibrary).map((key) => {
      const instrument = key as ToneJsInstrument;

      instrumentLibrary[instrument] = new Instrument(
        instrument,
        loadedSampleLibrary[instrument]
      );
    });

    this.instrumentDict = instrumentLibrary;
  }

  public async waitPeriod() {
    await timer((60 / this.bpm) * 1000);
  }

  private doubleVolume() {
    if (this.volume > 0) {
      this.volume = Math.ceil(this.volume * 2);
    } else if (this.volume < 0) {
      this.volume = Math.floor(this.volume / 2);
    } else {
      this.volume = 1;
    }
  }

  private halfVolume() {
    if (this.volume > 0) {
      this.volume = Math.ceil(this.volume / 2);
    } else if (this.volume < 0) {
      this.volume = Math.floor(this.volume * 2);
    } else {
      this.volume = -1;
    }
  }

  private swapInstrument() {
    const loadedInstruments = Object.keys(this.instrumentDict).filter(
      (i) => this.instrumentDict[i as ToneJsInstrument] !== undefined
    );

    const currInstrumentIndex = loadedInstruments.indexOf(
      this.currentInstrument
    );

    // Proximo instrumento do indice, com modulo para envitar overflow
    this.currentInstrument = loadedInstruments[
      (currInstrumentIndex + 1) % loadedInstruments.length
    ] as ToneJsInstrument;
  }

  public async resetState() {
    this.volume = -20;
    this.octave = 3;
    this.bpm = 60;
    this.currentInstrument = "guitar-acoustic";
  }

  public async playInput(char: string) {
    // É uma nota
    if (char[0].match(/[ABCDEFG]/)) {
      const note: Note = {
        note: char[0],
        octave: this.octave,
        volume: this.volume,
        period: 60 / this.bpm,
      };

      this.instrumentDict[this.currentInstrument]?.playNote(note, this.volume);
      await this.waitPeriod();
      return;
    }

    switch (char[0]) {
      case " ":
        await this.waitPeriod();
        break;
      case "+":
        this.doubleVolume();
        break;
      case "-":
        this.halfVolume();
        break;
      case "I":
        this.swapInstrument();
        break;
      case "U":
        this.octave = this.octave + 1;
        break;
      case "J":
        this.octave = this.octave - 1;
        break;
      case "N":
        this.bpm = this.bpm + 50;
        break;
      case "M":
        this.bpm = this.bpm - 50;
        break;
    }
  }
}
