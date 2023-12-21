import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { PageSignUp } from "@/components/PageSignUp/PageSignUp";
//import { PageLogin } from "@/components/PageLogin/PageLogin";
import { PageHome } from "@/components/PageHome/PageHome";
import { PageNotFound } from "@/components/PageNotFound/PageNotFound";

// import { PageMicTest } from "@/components/PageMicTest/PageMicTest";

// import { Navigate } from "react-router-dom";
import { PageEditDeck } from "@/components/PageEditDeck/PageEditDeck";
// import { PageEditDeckGeneral } from "@/components/PageEditDeck/PageEditDeckGeneral";
// import { PageEditDeckFlashcards } from "@/components/PageEditDeck/PageEditDeckFlashcards";
// import { PageEditDeckFlashcard } from "@/components/PageEditDeck/PageEditDeckFlashcard";
// import { PageDeck } from "@/components/PageDeck/PageDeck";

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
      path: "/decks/:deckId",
      //element: <PageDeck />,
    },
    {
      path: "/decks/:deckId/edit/*",
      element: <PageEditDeck />,
    },
    {
      path: "/mic-test",
      //element: <PageMicTest />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ],
  { basename: `/` },
);

export const Router = () => <RouterProvider router={router} />;
