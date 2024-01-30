import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageEditDeck } from "@/components/PageEditDeck/PageEditDeck";
import { PageHome } from "@/components/PageHome/PageHome";
import { PageNotFound } from "@/components/PageNotFound/PageNotFound";
import { PagePlay } from "./components/PagePlay/PagePlay";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageHome />,
    },
    {
      path: "/signup",
      ////element: <PageSignUp />,
    },
    {
      path: "/login",
      ////element: <PageLogin />,
    },
    {
      path: "/decks/:deckId/edit/*",
      element: <PageEditDeck />,
    },
    {
      path: "/play/:deckId",
      element: <PagePlay />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ],
  { basename: `/` },
);

export const Router = () => <RouterProvider router={router} />;
