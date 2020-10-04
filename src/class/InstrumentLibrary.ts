import {
  SamplerLibrary,
  ToneJsInstrument,
} from "../utils/SampleLibraryWrapper";
import { Note } from "./Note";
import { Instrument } from "./Instrument";
import { timer } from "../utils/timer";

type InstrumentDict = { [key in ToneJsInstrument]?: Instrument };

export class InstrumentLibrary {
  // private InstrumentLibrary: { [key in ToneJsInstrument]: Instrument };

  private volume: number;
  private octave: number;
  private bpm: number;
  private currentInstrument: ToneJsInstrument;
  private instrumentDict: InstrumentDict;

  constructor(loadedSampleLibrary: SamplerLibrary) {
    this.volume = 2;
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

  public async playInput(char: string) {
    // É uma nota
    if (char[0].match(/[ABCDEFG]/)) {
      const note: Note = {
        note: char[0],
        octave: this.octave,
        volume: this.volume,
        period: 60 / this.bpm,
      };

      this.instrumentDict[this.currentInstrument]?.playNote(note);
      await this.waitPeriod();
      return;
    }

    switch (char[0]) {
      case " ":
        await this.waitPeriod();
      case "+":
        this.volume = this.volume * 2;
      case "-":
        this.volume = this.volume / 2;
    }
  }
}
