import { MusicInputParser } from "./MusicInputParser";
import { SoundEvent, MidiInstrument } from "./MidiInstrument";

it("parse notas de A-G em sequencia", () => {
  const input = "ABCDEFG";

  const expected: SoundEvent[] = [
    { type: "NOTE", pitch: "A" },
    { type: "NOTE", pitch: "B" },
    { type: "NOTE", pitch: "C" },
    { type: "NOTE", pitch: "D" },
    { type: "NOTE", pitch: "E" },
    { type: "NOTE", pitch: "F" },
    { type: "NOTE", pitch: "G" },
  ];

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);
  for (let index = 0; index < expected.length; index++) {
    expect(result[index]).toEqual(expected[index]);
  }
});

it("parse a-g em seguencia para comando de silencio", () => {
  const input = "abcedfg";

  const expected: SoundEvent[] = [
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
    { type: "REPEAT_LAST_OR_SILENCE" },
  ];

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);

  for (let index = 0; index < expected.length; index++) {
    expect(result[index]).toEqual(expected[index]);
  }
});

it("parse ! para agogo", () => {
  const input = "!";

  const expected: SoundEvent = {
    type: "CHANGE_INSTRUMENT",
    value: MidiInstrument.agogo,
  };
  const inputParser = new MusicInputParser();
  const result = inputParser.parseInput(input);

  expect(result[0]).toEqual(expected);
});

it("parse iouIOU para harpsichord", () => {
  const input = "iouIOU";

  const expected = {
    type: "CHANGE_INSTRUMENT",
    value: MidiInstrument.harsichord,
  };
  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);

  for (let index = 0; index < result.length; index++) {
    expect(expected).toEqual(result[index]);
  }
});

it("parse consoante para silencio ou pausa", () => {
  const input = "hjklmnpqrstvxwyzHJKLMNPQRSTVXWYZ";

  const expected: SoundEvent = { type: "REPEAT_LAST_OR_SILENCE" };

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);

  for (let index = 0; index < result.length; index++) {
    expect(expected).toEqual(result[index]);
  }
});

it("parse par ou impar soma no numero instrumento", () => {
  const input = "0123456789";

  const expected: SoundEvent[] = [
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 0 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 1 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 2 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 3 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 4 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 5 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 6 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 7 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 8 },
    { type: "ADD_TO_INSTRUMENT_NUMBER", value: 9 },
  ];

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);
  for (let index = 0; index < expected.length; index++) {
    expect(result[index]).toEqual(expected[index]);
  }
});

it("parse interrogação para aumentar oitava", () => {
  const input = "?";

  const expected: SoundEvent = {
    type: "INCREASE_OCTAVE"
  };

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);
  
  expect(result[0]).toEqual(expected);
});

it("parse nova linha para tubular bells", () => {
  const input = "\n";

  const expected = {
    type: "CHANGE_INSTRUMENT",
    value: MidiInstrument["tubular-bells"],
  };

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);
  
  expect(result[0]).toEqual(expected);
});

it("parse virgula para church organ", () => {
  const input = ",";

  const expected = {
    type: "CHANGE_INSTRUMENT",
    value: MidiInstrument["church-organ"],
  };

  const inputParser = new MusicInputParser();

  const result = inputParser.parseInput(input);
  
  expect(result[0]).toEqual(expected);
});