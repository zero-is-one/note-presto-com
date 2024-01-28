import { LayoutMain } from "@/components/LayoutMain/LayoutMain";
import { useDecks } from "@/hooks/useDecks";
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

export const PageHome = () => {
  const navigate = useNavigate();
  const { decks, loading } = useDecks();

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
                <Stack>
                  <Group justify="space-between">
                    <Title order={3}>{deck.name}</Title>
                    <Badge color="blue" variant="light">
                      {deck.flashcards.length} cards
                    </Badge>
                  </Group>
                  <Button
                    to={`/decks/${deck.id}/edit`}
                    component={ReactRouterLink}
                  >
                    Edit
                  </Button>{" "}
                  <Button to={`/play/${deck.id}`} component={ReactRouterLink}>
                    Play
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </LayoutMain>
  );
};
