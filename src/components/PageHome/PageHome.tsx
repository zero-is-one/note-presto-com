import { LayoutMain } from "@/components/LayoutMain/LayoutMain";
import { useDecks } from "@/hooks/useDecks";
import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

export const PageHome = () => {
  const navigate = useNavigate();
  const { decks, loading } = useDecks();

  console.log(decks);

  return (
    <LayoutMain>
      {" "}
      <Container>
        <Group justify="space-between">
          <Title>Flashcards</Title>
          <Button
            onClick={() => {
              navigate("/decks/new/edit");
            }}
          >
            Create Deck
          </Button>
        </Group>
        <Divider my="md" />
        {loading && <div>Loading...</div>}
        {!loading && decks.length === 0 && <div>No decks found.</div>}
        {!loading && decks.length > 0 && (
          <SimpleGrid cols={3}>
            {decks.map((deck) => (
              <Card withBorder p="xl" radius="md">
                {deck.name} - {deck.flashcards.length} cards
                <Button
                  to={`/decks/${deck.id}/edit`}
                  component={ReactRouterLink}
                >
                  Edit
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        )}{" "}
      </Container>
    </LayoutMain>
  );
};
