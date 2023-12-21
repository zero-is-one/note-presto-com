import { Container, Group, Anchor } from "@mantine/core";
import { Logo } from "@/components/Logo/Logo";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export const Footer = () => {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container mt={"lg"}>
      <Group>
        <Logo size={28} />
        {items}
      </Group>
    </Container>
  );
};
