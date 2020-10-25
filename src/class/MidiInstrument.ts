// Ver https://msu.edu/course/mus/441/snapshot.afs/sullivan/fs02/MidiFiles/GenMidiInstList.html
export enum MidiInstrument {
  "acoustic-piano" = 1,
  "acoustic-guitar" = 25,
  "acoustic-bass" = 33,
  "violin" = 41,
  "trumpet" = 57,
}

export type Pitch = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type MidiNote = {
  type: "NOTE";
  pitch: Pitch;
  octave: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  bpm: number;
};

export type Command =
  | { type: "DOUBLE_VOLUME" }
  | { type: "HALF_VOLUME" }
  | { type: "DOUBLE_BPM" }
  | { type: "HALF_BPM" }
  | { type: "INCREASE_OCTAVE" }
  | { type: "DECREASE_OCTACE" }
  | { type: "SILENCE" }
  | { type: "CHANGE_INSTRUMENT"; value: MidiInstrument };

export type InstrumentInput = MidiNote | Command;

export function isNOTE(input: InstrumentInput): input is MidiNote {
  return input.type === "NOTE";
}

export function isCommand(input: InstrumentInput): input is Command {
  return !isNOTE(input);
}