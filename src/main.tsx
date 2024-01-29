import { Router } from "@/router.tsx";
import { theme } from "@/theme.ts";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/tiptap/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { MicrophoneProvider } from "./contexts/MicrophoneContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <MicrophoneProvider>
        <ModalsProvider>
          <Router />
        </ModalsProvider>
      </MicrophoneProvider>
    </MantineProvider>
  </React.StrictMode>,
);
