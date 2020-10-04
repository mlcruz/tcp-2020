import { Sampler } from "tone";
import { Note } from "./Note";

export class Instrument {
  private name: string;
  private sampler: Sampler;

  constructor(name: string, sampler: Sampler) {
    this.name = name;
    this.sampler = sampler;
  }

  public playNote(note: Note) {
    this.sampler.toMaster();
    this.sampler.triggerAttackRelease(
      note.note + note.octave.toString(),
      note.period
    );
  }
}
