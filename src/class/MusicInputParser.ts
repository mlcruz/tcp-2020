import {
  MidiInstrument,
  SoundEvent,
  Pitch,
  Command,
  Octave,
} from "./MidiInstrument";

export class MusicInputParser {
  public parseInput(input: string): SoundEvent[] {
    var result: SoundEvent[] = [];

    for (let index = 0; index < input.length; index++) {
      const inputChar = input[index];

      // É nota?
      if (inputChar.match("[ABCDEFG]")) {
        result.push({
          type: "NOTE",
          pitch: inputChar as Pitch,
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
      case " ":
        return {
          type: "DOUBLE_VOLUME",
        };
      case "!":
        return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.agogo };
      case "A" || "E" || "I" || "O" || "U" || "a" || "e" || "i" || "o" || "u":
        return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.harsichord };
      case "I":
        return {
          type: "CHANGE_INSTRUMENT",
          value: MidiInstrument["acoustic-guitar"],
        };
      case "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0":
        return {
          type: "ADD_TO_INSTRUMENT_NUMBER",
          value: +char,
        };
      case "?":
        return {
          type: "INCREASE_OCTAVE",
        };
      case "\n":
        return {
          type: "CHANGE_INSTRUMENT",
          value: MidiInstrument["tubular-bells"],
        };
      case ";":
        return {
          type: "CHANGE_INSTRUMENT",
          value: MidiInstrument["pan-flute"],
        };
      case ",":
        return {
          type: "CHANGE_INSTRUMENT",
          value: MidiInstrument["church-organ"],
        };
      default:
        return { type: "REPEAT_LAST_OR_SILENCE" };
    }
  }
}
