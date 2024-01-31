import { useGameStateStoreContext } from "@/hooks/useGameStateContext";

export const useFlashcardStats = () => {
  const flashcards = useGameStateStoreContext()((g) => g.flashcards);

  const updatedAt = flashcards.reduce((acc, curr) => {
    if (curr.updatedAt > acc.updatedAt) {
      return curr;
    }
    return acc;
  }, flashcards[0]).updatedAt;

  const attemptCount = flashcards.reduce((acc, curr) => {
    return acc + curr.correct + curr.incorrect;
  }, 0);

  const correct = flashcards.reduce((acc, curr) => {
    return acc + curr.correct;
  }, 0);

  const incorrect = flashcards.reduce((acc, curr) => {
    return acc + curr.incorrect;
  }, 0);

  const accuracy = (correct / attemptCount) * 100;

  const untouchedCount = flashcards.reduce((acc, curr) => {
    return acc + (curr.correct === 0 && curr.incorrect === 0 ? 1 : 0);
  }, 0);

  const touchedCount = flashcards.length - untouchedCount;

  const flashcardsCount = flashcards.length;

  return {
    updatedAt,
    attemptCount,
    correct,
    incorrect,
    accuracy,
    untouchedCount,
    touchedCount,
    flashcardsCount,
  };
};
