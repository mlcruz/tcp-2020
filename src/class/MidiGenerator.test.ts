import { MidiGenerator } from "./MidiGenerator";
import { MusicInputParser } from "./MusicInputParser";

type MidiNoteEvent = {
  type: string;
  channel: number;
  pitch: string;
  wait: number;
  velocity: number;
  startTick: null;
  midiNumber: number;
  tick: number;
  delta: number;
  data: number[];
};

it("midi generator parsea ABCDEFG", () => {
  const inputString = "ABCDEFG";
  const inputParser = new MusicInputParser();
  const midiGenerator = new MidiGenerator();

  const parsedInput = inputParser.parseInput("ABCDEFG");

  const generatedMidi = midiGenerator.generateMidiFromSoundEvents(parsedInput);

  const eventData = generatedMidi.data[1].events;

  // Primeiro comando é troca para instrumento inicial
  const instrumentChangeEvent = eventData[0];

  // program event type
  expect(instrumentChangeEvent.type.includes("program")).toBeTruthy();

  // Um Key on e um Key off para cada char de nota
  for (let index = 1; index < eventData.length - 1; index++) {
    const event: MidiNoteEvent = eventData[index];

    // indice referente a nota no vetor de notas
    const noteIndex: number = Math.floor((index - 1) / 2);
    const expectedPitch = inputString[noteIndex];

    // Tipo da nota
    // type = note-in | note-off
    expect(event.type.includes("note")).toBeTruthy();

    // Nota esperada
    expect(event.pitch[0]).toEqual(expectedPitch);

    // Oitava esperada
    expect(+event.pitch[1]).toEqual(1);

    // Volume esperado
    expect(event.velocity).toEqual(50);
  }
});
