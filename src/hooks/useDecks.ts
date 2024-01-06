import { firestore } from "@/firebase";
import { Deck, WithId, WithTimestamps } from "@/types";
import { collection, orderBy, query } from "firebase/firestore";
import usePagination from "react-firebase-pagination";

const mainQuery = query(
  collection(firestore, "decks"),
  orderBy("createdAt", "desc"),
);

export const useDecks = () => {
  const { getNext, getPrevious, data, loading } = usePagination({
    pageSize: 10,
    pageByPage: true,
    query: mainQuery,
  });

  return {
    getNext,
    getPrevious,
    data,
    loading,
    decks: data.docs.map(
      (doc) =>
        ({ id: doc.id, ...doc.data() } as Deck & WithId & WithTimestamps),
    ),
  };
};
