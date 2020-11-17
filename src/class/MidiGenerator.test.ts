import { MidiGenerator } from "./MidiGenerator";
import { MusicInputParser } from "./MusicInputParser";
import { MidiInstrument } from "./MidiInstrument";

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

it("midi generator parsea A!B9C9D9 - testa overflow possivel de instrumento", () => {
  const inputParser = new MusicInputParser();
  const midiGenerator = new MidiGenerator();

  const parsedInput = inputParser.parseInput("A!B9C9D9");

  const generatedMidi = midiGenerator.generateMidiFromSoundEvents(parsedInput);

  const eventData = generatedMidi.data[1].events;

  // Primeiro comando é troca para instrumento inicial
  const instrumentChangeEvent = eventData[0];

  // program event type
  expect(instrumentChangeEvent.type.includes("program")).toBeTruthy();

  // A
  expect(eventData[1].type.includes("note")).toBeTruthy();
  expect(eventData[1].pitch[0]).toEqual("A");
  expect(+eventData[1].pitch[1]).toEqual(1);
  expect(eventData[1].velocity).toEqual(50);
  expect(eventData[2].type.includes("note")).toBeTruthy();
  expect(eventData[2].pitch[0]).toEqual("A");
  expect(+eventData[2].pitch[1]).toEqual(1);
  expect(eventData[2].velocity).toEqual(50);

  // ?
  // eventData[i].data[2] acessa instrumento da troca de instrumento
  expect(eventData[3].data[2]).toEqual(MidiInstrument.agogo);

  // B
  expect(eventData[4].type.includes("note")).toBeTruthy();
  expect(eventData[4].pitch[0]).toEqual("B");
  expect(+eventData[4].pitch[1]).toEqual(1);
  expect(eventData[4].velocity).toEqual(50);
  expect(eventData[5].type.includes("note")).toBeTruthy();
  expect(eventData[5].pitch[0]).toEqual("B");
  expect(+eventData[5].pitch[1]).toEqual(1);
  expect(eventData[5].velocity).toEqual(50);

  // Soma nove em agogo (113 - indexado por 0)
  // Espera instrumento 122 (seashore)
  expect(eventData[6].data[2]).toEqual(MidiInstrument.seashore);

  // C
  expect(eventData[7].type.includes("note")).toBeTruthy();
  expect(eventData[7].pitch[0]).toEqual("C");
  expect(+eventData[7].pitch[1]).toEqual(1);
  expect(eventData[7].velocity).toEqual(50);
  expect(eventData[8].type.includes("note")).toBeTruthy();
  expect(eventData[8].pitch[0]).toEqual("C");
  expect(+eventData[8].pitch[1]).toEqual(1);
  expect(eventData[8].velocity).toEqual(50);

  // Soma nove em seashore (4 - indexado por 0)
  // Espera instrumento 4 (elec piano 1)
  expect(eventData[9].data[2]).toEqual(MidiInstrument["elec.piano-1"]);

  // C
  expect(eventData[10].type.includes("note")).toBeTruthy();
  expect(eventData[10].pitch[0]).toEqual("D");
  expect(+eventData[10].pitch[1]).toEqual(1);
  expect(eventData[10].velocity).toEqual(50);
  expect(eventData[11].type.includes("note")).toBeTruthy();
  expect(eventData[11].pitch[0]).toEqual("D");
  expect(+eventData[11].pitch[1]).toEqual(1);
  expect(eventData[11].velocity).toEqual(50);

  // Soma nove em elec piano 1 (4 - indexado por 0)
  // Espera instrumento 13 (xylophone)
  expect(eventData[12].data[2]).toEqual(MidiInstrument.xylophone);
});
