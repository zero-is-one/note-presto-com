import { LayoutMain } from "@/components/LayoutMain/LayoutMain";
import { Button, Divider, Group, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const PageHome = () => {
  const navigate = useNavigate();

  return (
    <LayoutMain>
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
    </LayoutMain>
  );
};
