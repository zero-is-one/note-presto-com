import { Button, Container, Group, Text, Title } from "@mantine/core";

export const PageNotFound = ({
  title,
  explantion,
  subtitle,
}: {
  title?: string;
  explantion?: string;
  subtitle?: string;
}) => {
  return (
    <Container>
      <Text>{subtitle || "404"}</Text>
      <Title>{title || "Page Not Found"}</Title>
      <Text c="dimmed" size="lg" ta="center">
        {explantion ||
          "Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};
