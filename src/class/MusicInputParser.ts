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
}
