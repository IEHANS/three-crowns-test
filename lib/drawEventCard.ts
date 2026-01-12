import { ref, push, set, get } from "firebase/database";
import { db } from "./firebase";
import { EVENT_CARDS } from "./data/eventCards";

export async function drawEventCard() {
  const usedRef = ref(db, "room_1/eventDeck/used");
  const lastRef = ref(db, "room_1/eventDeck/lastOpened");

  // 🔹 사용된 카드 ID 불러오기 (타입 가드 적용)
  const snap = await get(usedRef);
  const usedIds: string[] = snap.exists()
    ? Object.values(snap.val()).filter(
        (id): id is string => typeof id === "string"
      )
    : [];

  // 🔹 아직 안 뽑힌 카드 풀
  const pool = EVENT_CARDS.filter(
    (card) => !usedIds.includes(card.id)
  );

  if (pool.length === 0) {
    alert("사건 카드가 모두 소모되었습니다.");
    return;
  }

  // 🎴 랜덤 1장
  const picked = pool[Math.floor(Math.random() * pool.length)];

  // ✅ 마지막 카드 저장 (UI 갱신용)
  await set(lastRef, picked);

  // ✅ 덱 소모 기록 (id만)
  await push(usedRef, picked.id);
}
