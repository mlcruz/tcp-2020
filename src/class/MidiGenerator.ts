import { MidiInstrument, SoundEvent, Octave } from "./MidiInstrument";
// https://github.com/grimmdude/MidiWriterJS
//@ts-ignore
import MidiWriter from "midi-writer-js";

export class MidiGenerator {
  // Utilizamos nosso estado para ir
  private instrument: MidiInstrument;
  private octave: Octave;
  private lastEvent: SoundEvent | null;
  private volume: number;

  constructor() {
    this.instrument = 1;
    this.octave = 1;
    this.lastEvent = null;
    this.volume = 25;
  }

  public generateMidiFromSoundEvents(parsedInputList: SoundEvent[]) {
    // Track do midi que será escrita com os dados dos eventos
    let track = new MidiWriter.Track();

    // Inicializamos o midi com o intrumento inicial. Trocas de instrumento são feita utilizando um ProgramChangeEvent
    track.addEvent(
      new MidiWriter.ProgramChangeEvent({ instrument: this.instrument })
    );

    // 1/2 de 2 segundos (1 segundo por nota)
    const notePeriod = "2";

    for (let i = 0; i < parsedInputList.length; i++) {
      const event = parsedInputList[i];

      // Esse switch parece feio mas a maneira como o tipo SoundEvent é construido
      // permite com que o compilador verifique o uso correto dos eventos a partir do tipo
      // discriminado. Ao cair no case do switch, o tipo soma é "descontruido" em um de seus tipos
      switch (event.type) {
        case "NOTE": {
          let note = new MidiWriter.NoteEvent({
            // interpolação de strings para montar um 'pitch' com o caractere da nota e o da oitava
            // EX de string resultante: A1 (event.pitch = A, this.octave = 1)
            pitch: [`${event.pitch}${this.octave.toString().toUpperCase()}`],
            duration: notePeriod,
            // Velocity = volume
            velocity: this.volume,
          });

          track.addEvent(note);
          break;
        }
        // Troca generica de instrumentos
        case "CHANGE_INSTRUMENT": {
          this.instrument = event.value;

          track.addEvent(
            new MidiWriter.ProgramChangeEvent({
              instrument: event.value,
            })
          );
          break;
        }
        case "ADD_TO_INSTRUMENT_NUMBER": {
          const newInstrument = this.instrument + event.value;
          // Esse ternarios podem parecer feios, mas como typescript é baseado em expresões
          // essa é a maneira 'idiomatica' de fazer essas atribuições simples.
          this.instrument =
            newInstrument > 127 ? newInstrument - 127 - 1 : newInstrument;

          track.addEvent(
            new MidiWriter.ProgramChangeEvent({
              instrument: this.instrument,
            })
          );
          break;
        }
        case "INCREASE_OCTAVE": {
          this.octave =
            this.octave >= 8 ? (1 as Octave) : ((this.octave + 1) as Octave);
          break;
        }
        case "REPEAT_LAST_OR_SILENCE": {
          if (this.lastEvent && this.lastEvent.type === "NOTE") {
            let note = new MidiWriter.NoteEvent({
              pitch: [
                `${
                  this.lastEvent.pitch
                }${this.octave.toString().toUpperCase()}`,
              ],
              duration: notePeriod,
              // Velocity = volume
              velocity: this.volume,
            });

            track.addEvent(note);
          } else {
            // Nota sem volume
            let note = new MidiWriter.NoteEvent({
              pitch: [" "],
              duration: notePeriod,
              // Velocity = volume
              velocity: 0,
            });

            track.addEvent(note);
          }
          break;
        }
        case "DOUBLE_VOLUME":
          const newVolume = this.volume * 2;
          this.volume = newVolume > 100 ? 25 : newVolume;
          break;
      }
      this.lastEvent = event;
    }
    const data = new MidiWriter.Writer(track);

    return data;
  }

  public resetState() {
    this.instrument = 1;
    this.octave = 1;
    this.lastEvent = null;
    this.volume = 25;
  }
}
