import { Logo } from "@/components/Logo/Logo";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { Footer } from "./Footer";

const links = [
  { label: "Home", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contacts", href: "#" },
  { label: "Support", href: "#" },
];

export const LayoutMain = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group pr="md">
              <Logo />
            </Group>

            <Group visibleFrom="sm">
              {links.map((link) => (
                <UnstyledButton key={link.label} onClick={toggle}>
                  {link.label}
                </UnstyledButton>
              ))}
            </Group>

            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Stack>
          {links.map((link) => (
            <UnstyledButton key={link.label} onClick={toggle}>
              {link.label}
            </UnstyledButton>
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
