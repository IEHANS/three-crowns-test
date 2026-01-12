import { ref, set } from "firebase/database";
import { db } from "./firebase";

export function initEventDeck() {
  set(ref(db, "room_1/eventDeck/used"), null);
  set(ref(db, "room_1/eventDeck/lastOpened"), null);
}
