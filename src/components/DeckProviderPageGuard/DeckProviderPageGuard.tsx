import { PageNotFound } from "@/components/PageNotFound/PageNotFound";
import { DeckContainer } from "@/hooks/useDeck";
import { useParams } from "react-router-dom";

export const DeckProviderPageGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { deckId } = useParams();

  return (
    <DeckContainer.Provider
      initialState={deckId === "new" ? undefined : deckId}
    >
      <Guard>{children}</Guard>
    </DeckContainer.Provider>
  );
};

export const Guard = ({ children }: { children: React.ReactNode }) => {
  const { error, loading, deck } = DeckContainer.useContainer();

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <PageNotFound
        title={`An unknown error occured.`}
        subtitle={"Could not load deck."}
        explantion="Please try again later."
      />
    );

  if (!deck)
    return (
      <PageNotFound
        title={`Deck not found.`}
        subtitle={"Could not load deck."}
        explantion="The deck you are looking for does not exist or has been deleted. Please try again later."
      />
    );

  return children;
};
