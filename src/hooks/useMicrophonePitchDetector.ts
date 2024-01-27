import { useMicrophoneContext } from "@/contexts/MicrophoneContext";
import useAnimationFrame from "@phntms/use-animation-frame";
import { useCallback, useMemo } from "react";

import { PitchDetector } from "pitchy";

type CallbackProps = {
  pitch: number;
  clarity: number;
  inputBufferSize: number;
};

export const useMicrophonePitchDetector = (
  callback: ({ clarity, pitch, inputBufferSize }: CallbackProps) => void,
  framesPerSecond?: number | undefined,
) => {
  const { analyserNode, sampleRate } = useMicrophoneContext();
  const detector = PitchDetector.forFloat32Array(analyserNode?.fftSize || 1);
  const inputBuffer = useMemo(
    () => new Float32Array(detector.inputLength),
    [detector.inputLength],
  );

  const anim = useCallback(() => {
    if (!analyserNode) {
      return;
    }

    analyserNode.getFloatTimeDomainData(inputBuffer);

    const [pitch, clarity] = detector.findPitch(inputBuffer, sampleRate);

    callback({ pitch, clarity, inputBufferSize: inputBuffer.length });
  }, [callback, analyserNode, detector, inputBuffer, sampleRate]);

  useAnimationFrame(anim, framesPerSecond);
};
