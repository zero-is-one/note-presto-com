import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { useDeckContainer } from "@/hooks/useDeck";
import { Deck } from "@/types";
import { Button, CloseButton, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export const ViewGeneral = () => {
  const navigate = useNavigate();
  const { update: updateDeck, deck } = useDeckContainer();

  const form = useForm({
    initialValues: {
      name: deck?.name || "",
      description: deck?.description || "",
    },
    validate: {
      name: (value) =>
        value.length < 4 ? "Name must have at least 4 letters" : null,
      description: (value) =>
        value.length < 4 ? "Description must have at least 4 letters" : null,
    },
  });

  const onSubmit = form.onSubmit((values) => {
    updateDeck((prev) => ({ ...prev, ...values } as Deck));
    navigate("flashcards");
  });

  return (
    <form onSubmit={onSubmit}>
      <LayoutSimpleBar
        leftItem={
          <CloseButton
            size={40}
            onClick={() => {
              navigate("/");
            }}
          />
        }
        rightItem={<Button type="submit">Next</Button>}
      >
        <Stack gap={"sm"}>
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
        </Stack>
      </LayoutSimpleBar>
    </form>
  );
};
