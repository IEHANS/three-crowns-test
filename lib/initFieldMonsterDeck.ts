import { ref, set } from "firebase/database";
import { db } from "./firebase";

export function initFieldMonsterDeck() {
  set(ref(db, "room_1/fieldMonsterDeck/used"), null);
  set(ref(db, "room_1/fieldMonsterDeck/lastOpened"), null);
}
