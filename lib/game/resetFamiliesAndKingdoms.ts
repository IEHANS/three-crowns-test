import { ref, update } from "firebase/database";
import { db } from "../firebase";

const PLAYERS = ["A", "B", "C", "D"] as const;

export async function resetFamiliesAndKingdoms(roomId: string) {
  const updates: Record<string, null> = {};

  PLAYERS.forEach((playerId) => {
    const base = `${roomId}/players/${playerId}`;

    updates[`${base}/family`] = null;
    updates[`${base}/kingdom`] = null;
    updates[`${base}/influenceStart`] = null;
    updates[`${base}/influenceMax`] = null;
  });

  await update(ref(db), updates);
}
