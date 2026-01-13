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
      deck.push(card.id);
    }
  });
  return shuffle(deck);
}

/* =========================
   ✝ 신앙 시스템 초기화
   - 게임 시작 시 1회
========================= */
export async function initFaithSystem(roomId: string) {
  const deckRef = ref(db, `${roomId}/faithDeck`);
  const snap = await get(deckRef);

  // 이미 존재하면 재생성 금지
  if (snap.exists()) return;

  await update(ref(db, roomId), {
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
  const roomRef = ref(db, roomId);
  const snap = await get(roomRef);

  if (!snap.exists()) {
    console.warn("❌ room not found:", roomId);
    return;
  }

  const data = snap.val();
  const deck: string[] = data.faithDeck ?? [];
  const hands: Record<PlayerId, string[]> =
    data.faithHands ?? { A: [], B: [], C: [], D: [] };

  if (deck.length === 0) {
    console.warn("❌ faith deck empty");
    return;
  }

  const cardId = deck[0];

  await update(roomRef, {
    faithDeck: deck.slice(1),
    [`faithHands/${playerId}`]: [
      ...hands[playerId],
      cardId
    ]
  });
}
