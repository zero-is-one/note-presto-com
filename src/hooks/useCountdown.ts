import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useCountdown = ({
  durationMs,
  steps,
}: {
  durationMs: number;
  steps: number;
}) => {
  const [stepsRemaining, setStepsRemaining] = useState(steps);
  const interval = useInterval(
    () =>
      setStepsRemaining((s) => {
        if (s - 1 === 0) interval.stop();
        return s - 1;
      }),
    durationMs / steps,
  );

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isComplete: stepsRemaining <= 0,
    timeCompleted: durationMs * ((steps - stepsRemaining) / steps),
    timeRemaining: durationMs * (stepsRemaining / steps),
    stepsRemaining: stepsRemaining,
    percentComplete: (steps - stepsRemaining) / steps,
  };
};
