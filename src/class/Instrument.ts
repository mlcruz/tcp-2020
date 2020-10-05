import { Sampler, Param } from "tone";
import { Note } from "./Note";

export class Instrument {
  private name: string;
  private sampler: Sampler;

  constructor(name: string, sampler: Sampler) {
    this.name = name;
    this.sampler = sampler;
  }

  public playNote(note: Note, volume: number) {
    this.sampler.toMaster();
    this.sampler.set({ volume: volume });

    this.sampler.triggerAttackRelease(
      note.note + note.octave.toString(),
      note.period
    );
  }
}
