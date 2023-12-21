import { ReactNode } from "react";

import { Logo } from "@/components/Logo/Logo";
import { AppShell, Box, Group } from "@mantine/core";

export const LayoutSimpleBar = ({
  children,
  leftItem,
  rightItem,
}: {
  children: ReactNode;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
}) => {
  return (
    <AppShell padding="md" header={{ height: 64 }}>
      <AppShell.Header>
        <Group pos={"relative"} px={"sm"} justify="space-between" h={"100%"}>
          <Box>{leftItem}</Box>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              padding: 0,
              margin: 0,
              verticalAlign: "middle",
            }}
          >
            <Logo />
          </div>

          <Box>{rightItem}</Box>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
