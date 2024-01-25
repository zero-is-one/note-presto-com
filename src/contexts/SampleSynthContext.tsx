import { createContext, useRef } from "react";
import { Sampler, SamplerOptions } from "tone";
export type SamplesMap = SamplerOptions["urls"];

export type SampleSynthContextType = {
  createSynth: (samples: SamplesMap, baseUrl?: string) => string;
  stop: () => void;
  synths: Map<string, Sampler>;
};

export const SampleSynthContext = createContext<
  SampleSynthContextType | undefined
>(undefined);

export const SampleSynthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const synths = useRef<Map<string, Sampler>>(new Map());

  const createSynth = (samples: SamplesMap, baseUrl?: string) => {
    const id = JSON.stringify(samples);

    if (synths.current.has(id)) {
      //console.log(`sampler already loaded for ${id}`);
      return id;
    }

    const sampler = new Sampler(
      samples,
      () => {
        console.log("Synth loaded", sampler);
        synths.current = new Map(synths.current.set(id, sampler));
      },
      baseUrl
    ).toDestination();

    return id;
  };

  const stop = () => {
    synths.current.forEach((synth) => synth.releaseAll());
  };

  return (
    <SampleSynthContext.Provider
      value={{
        stop,
        createSynth,
        synths: synths.current,
      }}
    >
      {children}
    </SampleSynthContext.Provider>
  );
};
