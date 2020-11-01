import { timer } from "../utils/timer";
import { Midi, Track, Header } from "@tonejs/midi";
import {
  MidiInstrument,
  SoundEvent,
  Pitch,
  Command,
  Octave,
} from "./MidiInstrument";
import { PolySynth } from "tone";
var MidiWriter = require("midi-writer-js");

type MidiState = {
  currentTime: number;
  bpm: number;
  instrument: MidiInstrument;
  octave: Octave;
};

export class MidiGenerator {
  private initialInstrument: MidiInstrument;
  private state: MidiState;

  private instrumentList = [
    MidiInstrument["acoustic-bass"],
    MidiInstrument["acoustic-guitar"],
    MidiInstrument["acoustic-piano"],
    MidiInstrument.trumpet,
    MidiInstrument.violin,
  ];

  constructor(initialInstrument: MidiInstrument) {
    this.initialInstrument = initialInstrument;
    this.state = {
      bpm: 60,
      currentTime: 0,
      instrument: initialInstrument,
      octave: 3,
    };
  }

  public async resetState() {}

  public generateMidiFromSoundEvents(parsedInputList: SoundEvent[]): Midi {
    const midi = new Midi();

    let index = 0;

    while (index < parsedInputList.length) {
      // Cada instrumento precisa de uma nova track, então separamos os blocos de eventos por instrumento
      const instrumentChangeIndex = parsedInputList
        .slice(index)
        .findIndex((element) => element.type == "CHANGE_INSTRUMENT");

      // Dividimos o bloco de um intrumento, se existe alguma instrução de troca de instrumentos
      if (instrumentChangeIndex >= 0) {
        let instrumentTrackEvents = parsedInputList.slice(
          index,
          instrumentChangeIndex
        );

        const track = this.generateTrackFromSoundEvents(instrumentTrackEvents);

        // trocamos o instrumento por algum outro aletorio
        this.state.instrument = this.getRandomInstrument();

        // Pulamos o evento de troca de instrumento em si
        index += instrumentChangeIndex + 1;

        midi.tracks.push(track);
        console.log(track);
      } else {
        // Não existe mais nenhuma troca de instrumentos, então geramos o resto da track
        const track = this.generateTrackFromSoundEvents(
          parsedInputList.slice(index)
        );
        track.addCC({ number: 4, value: 10, time: 0 });
        track.instrument.number = this.state.instrument;

        console.log(track);

        break;
      }
    }

    return midi;
  }

  private generateTrackFromSoundEvents(soundEventList: SoundEvent[]): Track {
    const track = new Track([], new Header());
    track.instrument.number = this.state.instrument;

    for (let i = 0; i < soundEventList.length; i++) {
      const event = soundEventList[i];

      const period = this.state.bpm / 60;

      switch (event.type) {
        case "NOTE": {
          track.addNote({
            duration: period,
            time: this.state.currentTime * period,
            pitch: event.pitch,
            octave: this.state.octave,
          });

          this.state.currentTime += period;
        }
      }
    }
    return track;
  }

  private getRandomInstrument(): MidiInstrument {
    const now = new Date().getTime();
    const randomIndex = now % this.instrumentList.length;

    let randomInstrument = this.instrumentList[randomIndex];

    if (randomInstrument != this.state.instrument) {
      return randomInstrument;
    }

    const newRandomIndex = (this.state.instrument =
      (now + 1) % this.instrumentList.length);

    return this.instrumentList[newRandomIndex];
  }
}
