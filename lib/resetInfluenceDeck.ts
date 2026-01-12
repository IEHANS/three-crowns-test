// lib/resetInfluenceDeck.ts
import { ref, set } from "firebase/database";
import { db } from "./firebase"; // ✅ 반드시 이 경로

export function resetInfluenceDeck() {
  const usedRef = ref(db, "room_1/influenceDeck/used");
  return set(usedRef, null);
}
