import { MidiInstrument, SoundEvent, Pitch, Command } from "./MidiInstrument";

// Transforma entrada em string para representação em vetor de SoundEvents
export class InputSoundEventParser {
  public parseInput(input: string): SoundEvent[] {
    var result: SoundEvent[] = [];

    // Separamos os caracteres da string um a um
    for (let index = 0; index < input.length; index++) {
      const inputChar = input[index];

      // É nota?
      if (inputChar.match("[ABCDEFG]")) {
        result.push({
          type: "NOTE",
          pitch: inputChar as Pitch,
        });
      } else {
        // é comando
        var command = this.parseCommand(inputChar);
        result.push(command);
      }
    }

    return result;
  }

  // infelizmente javascript não tem um tipo char, tudo é string
  private parseCommand(char: string): Command {
    // Utilizamos expressões regulares para discriminar os comandos a partir da entrada do usuario

    if (char === " ") return { type: "DOUBLE_VOLUME" };

    // Representamos qualquer 'set'' de instrumento a partir da função generica de troca de instrumento
    if (char === "!")
      return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.agogo };

    if (char.match(/[iouIOU]/))
      return { type: "CHANGE_INSTRUMENT", value: MidiInstrument.harsichord };

    // Adicionar a um instrumento é um tipo de evento diferente porquê opera sobre algum estado
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

    // Se não é nenhum dos outros casos, é repete ou silencio
    return { type: "REPEAT_LAST_OR_SILENCE" };
  }
}
