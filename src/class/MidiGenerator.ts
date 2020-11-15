import { MidiInstrument, SoundEvent, Octave } from "./MidiInstrument";
// https://github.com/grimmdude/MidiWriterJS
//@ts-ignore
import MidiWriter from "midi-writer-js";

export class MidiGenerator {
  private instrument: MidiInstrument;
  private octave: Octave;
  private lastEvent: SoundEvent | null;
  private volume: number;

  constructor() {
    this.instrument = 1;
    this.octave = 1;
    this.lastEvent = null;
    this.volume = 20;
  }

  public generateMidiFromSoundEvents(parsedInputList: SoundEvent[]) {
    var track = new MidiWriter.Track();
    track.addEvent(
      new MidiWriter.ProgramChangeEvent({ instrument: this.instrument })
    );

    for (let i = 0; i < parsedInputList.length; i++) {
      // 1/4 de 2 segundos
      const period = "2";
      const event = parsedInputList[i];

      switch (event.type) {
        case "NOTE": {
          let note = new MidiWriter.NoteEvent({
            pitch: [`${event.pitch}${this.octave.toString().toUpperCase()}`],
            duration: period,
            // Velocity = volume
            velocity: this.volume,
          });

          track.addEvent(note);
          break;
        }
        case "CHANGE_INSTRUMENT": {
          track.addEvent(
            new MidiWriter.ProgramChangeEvent({
              instrument: event.value,
            })
          );
          break;
        }
        case "ADD_TO_INSTRUMENT_NUMBER": {
          const newInstrument = this.instrument + event.value;
          this.instrument =
            newInstrument > 127 ? newInstrument % 127 : newInstrument;
          break;
        }
        case "INCREASE_OCTAVE": {
          this.octave =
            this.octave >= 8 ? (0 as Octave) : ((this.octave + 1) as Octave);
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
              duration: period,
              // Velocity = volume
              velocity: this.volume,
            });

            console.log("note");
            track.addEvent(note);
          } else {
            // Nota sem volume
            let note = new MidiWriter.NoteEvent({
              pitch: [" "],
              duration: period,
              // Velocity = volume
              velocity: 0,
            });

            track.addEvent(note);
          }
          break;
        }
        case "DOUBLE_VOLUME":
          {
            const newVolume = this.volume * 2;
            this.volume = newVolume > 100 ? 20 : newVolume;
          }
          break;
      }
      this.lastEvent = event;
    }
    const data = new MidiWriter.Writer(track);

    return data;
  }
}
