import { MidiInstrument, SoundEvent, Pitch, Command } from "./MidiInstrument";

export class InputSoundEventParser {
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
    if (char === " ") return { type: "DOUBLE_VOLUME" };

    if (char === "!")
      return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.agogo };

    if (char.match(/[iouIOU]/))
      return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.harsichord };

    if (char.match(/[1234567890]/))
      return { type: "ADD_TO_INSTRUMENT_NUMBER", value: +char };

    if (char === "?" || char === ".") return { type: "INCREASE_OCTAVE" };
    if (char === "\n")
      return {
        type: "CHANGE_INSTRUMENT",
        value: MidiInstrument["tubular-bells"],
      };

    if (char === ";")
      return { type: "CHANGE_INSTRUMENT", value: MidiInstrument["pan-flute"] };

    if (char === ",")
      return {
        type: "CHANGE_INSTRUMENT",
        value: MidiInstrument["church-organ"],
      };

    return { type: "REPEAT_LAST_OR_SILENCE" };
  }
}
