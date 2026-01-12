// lib/initInfluenceDeck.ts
import { ref, set } from "firebase/database";
import { db } from "./firebase";
import { INFLUENCE_CARDS } from "./data/influenceCards";

export const initInfluenceDeck = async () => {
  const deckRef = ref(db, "room_1/influenceDeck");

  const remaining: Record<string, any> = {};

  INFLUENCE_CARDS.forEach((card, index) => {
    remaining[`influence_${index + 1}`] = {
      no: index + 1,
      ...card,
    };
  });

  await set(deckRef, {
    remaining,
    used: {},
    lastOpened: null,
  });
};