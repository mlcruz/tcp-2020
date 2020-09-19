import { SampleLibrary } from "../external-packages/tone-instruments/Tonejs-Instruments";
import { Sampler } from "tone";

export type SamplerLibrary = {
  [key in ToneJsInstrument]: Sampler;
};

export type ToneJsInstrument =
  | "bass-electric"
  | "bassoon"
  | "cello"
  | "clarinet"
  | "contrabass"
  | "flute"
  | "french-horn"
  | "guitar-acoustic"
  | "guitar-electric"
  | "harmonium"
  | "harp"
  | "organ"
  | "piano"
  | "saxophone"
  | "trombone"
  | "trumpet"
  | "tuba"
  | "violin"
  | "xylophone";

type SampleLibraryInput = {
  instruments: ToneJsInstrument[];
  baseUrl: string;
  onload: (instrument: ToneJsInstrument) => void;
};

export function loadSampleLibrary(input: SampleLibraryInput) {
  return SampleLibrary.load(input) as SamplerLibrary;
}
