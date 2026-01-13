import { ref, get, set, update } from "firebase/database";
import { db } from "./firebase";
import { FAITH_CARDS } from "./data/faithCards";

export type PlayerId = "A" | "B" | "C" | "D";

/* =========================
   유틸
========================= */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildFaithDeck(): string[] {
  const deck: string[] = [];
  FAITH_CARDS.forEach(card => {
    for (let i = 0; i < card.count; i++) {
      deck.push(card.id); // ✅ id만
    }
  });
  return shuffle(deck);
}

/* =========================
   ✝ 신앙 시스템 초기화
   - 게임 시작 시 1회
========================= */
export async function initFaithSystem(roomId: string) {
  const roomRef = ref(db, roomId);
  const snap = await get(roomRef);

  const data = snap.val() ?? {};
  const hasDeck = Array.isArray(data.faithDeck);
  const hasHands =
    data.faithHands &&
    ["A", "B", "C", "D"].every(k =>
      Array.isArray(data.faithHands[k])
    );

  // ✅ 둘 다 있으면 유지
  if (hasDeck && hasHands) {
    console.log("✝ faith system already initialized");
    return;
  }

  console.log("✝ initializing faith system");

  await update(roomRef, {
    faithDeck: buildFaithDeck(),
    faithHands: {
      A: [],
      B: [],
      C: [],
      D: []
    }
  });
}

/* =========================
   ✝ 신앙 카드 1장 뽑기 (개인)
========================= */
export async function drawFaithCard(
  roomId: string,
  playerId: PlayerId
) {
  const deckRef = ref(db, `${roomId}/faithDeck`);
  const handsRef = ref(db, `${roomId}/faithHands`);

  const [deckSnap, handsSnap] = await Promise.all([
    get(deckRef),
    get(handsRef)
  ]);

  const deck: string[] = deckSnap.val() ?? [];
  const hands: Record<PlayerId, string[]> =
    handsSnap.val() ?? { A: [], B: [], C: [], D: [] };

  if (deck.length === 0) {
    console.warn("❌ faith deck empty");
    return;
  }

  const cardId = deck[0];
  const currentHand = hands[playerId] ?? [];

  await update(ref(db, roomId), {
    faithDeck: deck.slice(1),
    [`faithHands/${playerId}`]: [
      ...currentHand,
      cardId
    ]
  });

  console.log(`✝ ${playerId} drew faith card:`, cardId);
}
