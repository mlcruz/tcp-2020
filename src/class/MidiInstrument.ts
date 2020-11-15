// Ver https://msu.edu/course/mus/441/snapshot.afs/sullivan/fs2/MidiFiles/GenMidiInstList.html
export enum MidiInstrument {
  "acoustic-piano" = 1,
  "brtacou-piano" = 2,
  "elecgrand-piano" = 3,
  "honky-tonk-piano" = 4,
  "elec.piano-1" = 5,
  "elec.piano-2" = 6,
  "harsichord" = 7,
  "clavichord" = 8,
  "celesta" = 9,
  "glockenspiel" = 10,
  "music-box" = 11,
  "vibraphone" = 12,
  "marimba" = 13,
  "xylophone" = 14,
  "tubular-bells" = 15,
  "dulcimer" = 16,
  "drawbar-organ" = 17,
  "perc-organ" = 18,
  "rock-organ" = 19,
  "church-organ" = 20,
  "reed-organ" = 21,
  "accordian" = 22,
  "harmonica" = 23,
  "tango-accordian" = 24,
  "acoustic-guitar" = 25,
  "steelacous-guita" = 26,
  "eljazz-guitar" = 27,
  "electric-guitar" = 28,
  "el-muted-guitar" = 29,
  "overdriven-guita" = 30,
  "distortion-guita" = 31,
  "guitar-harmonic" = 32,
  "acoustic-bass" = 33,
  "el-bass-finger" = 34,
  "el-bass-pick" = 35,
  "fretless-bass" = 36,
  "slap-bass-1" = 37,
  "slap-bass-2" = 38,
  "synth-bass-1" = 39,
  "synth-bass-2" = 40,
  "violin" = 41,
  "viola" = 42,
  "cello" = 43,
  "contra-bass" = 44,
  "tremelo-strings" = 45,
  "pizz-strings" = 46,
  "orch-strings" = 47,
  "timpani" = 48,
  "string-ens.1" = 49,
  "string-ens.2" = 50,
  "synth.strings-1" = 51,
  "synth.strings-2" = 52,
  "choir-aahs" = 53,
  "voice-oohs" = 54,
  "synth-voice" = 55,
  "orchestra-hit" = 56,
  "trumpet" = 57,
  "trombone" = 58,
  "tuba" = 59,
  "muted-trumpet" = 60,
  "french-horn" = 61,
  "brass-section" = 62,
  "synth-brass-1" = 63,
  "synth-brass-2" = 64,
  "soprano-sax" = 65,
  "alto-sax" = 66,
  "tenor-sax" = 67,
  "baritone-sax" = 68,
  "oboe" = 69,
  "english-horn" = 70,
  "bassoon" = 71,
  "clarinet" = 72,
  "piccolo" = 73,
  "flute" = 74,
  "recorder" = 75,
  "pan-flute" = 76,
  "blown-bottle" = 77,
  "shakuhachi" = 78,
  "whistle" = 79,
  "ocarina" = 80,
  "lead1-square" = 81,
  "lead2-sawtooth" = 82,
  "lead3-calliope" = 83,
  "lead4-chiff" = 84,
  "lead5-charang" = 85,
  "lead6-voice" = 86,
  "lead7-fifths" = 87,
  "lead8-bass-ld" = 88,
  "pad1-new-age" = 89,
  "pad2-warm" = 90,
  "pad3-polysynth" = 91,
  "pad4-choir" = 92,
  "pad5-bowed" = 93,
  "pad6-metallic" = 94,
  "pad7-halo" = 95,
  "pad8-sweep" = 96,
  "fx1-rain" = 97,
  "fx2-soundtrack" = 98,
  "fx3-crystal" = 99,
  "fx4-atmosphere" = 100,
  "fx5-brightness" = 101,
  "fx6-goblins" = 102,
  "fx7-echoes" = 103,
  "fx8-sci-fi" = 104,
  "sitar" = 105,
  "banjo" = 106,
  "shamisen" = 107,
  "koto" = 108,
  "kalimba" = 109,
  "bagpipe" = 110,
  "fiddle" = 111,
  "shanai" = 112,
  "tinkerbell" = 113,
  "agogo" = 114,
  "steeldrums" = 115,
  "woodblock" = 116,
  "taikodrum" = 117,
  "melodic-tom" = 118,
  "synthdrum" = 119,
  "reverse-cymbal" = 120,
  "guitar-fret-nois" = 121,
  "breath-noise" = 122,
  "seashore" = 123,
  "birdtweet" = 124,
  "telephone" = 125,
  "helicopter" = 126,
  "applause" = 127,
  "gunshot" = 128,
}

export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Pitch = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type MidiNote = {
  type: "NOTE";
  pitch: Pitch;
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

export type SoundEvent = MidiNote | Command;

export function isNote(input: SoundEvent): input is MidiNote {
  return input.type === "NOTE";
}

export function isCommand(input: SoundEvent): input is Command {
  return !isNote(input);
}
