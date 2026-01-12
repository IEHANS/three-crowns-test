// lib/drawInfluenceCard.ts
import { ref, get, update, push } from "firebase/database";
import { db } from "./firebase";

export const drawInfluenceCard = async (value: number) => {
  const deckRef = ref(db, "room_1/influenceDeck");
  const logRef = ref(db, "room_1/logs");

  const snapshot = await get(deckRef);
  if (!snapshot.exists()) return;

  const { remaining = {}, used = {} } = snapshot.val();

  // 👉 해당 영향력 값 카드만 필터
  const candidates = Object.entries(remaining).filter(
    ([_, card]: any) => card.value === value
  );

  if (candidates.length === 0) {
    await push(logRef, `영향력 ${value} 카드가 모두 소진되었습니다.`);
    return;
  }

  // 랜덤 1장
  const [key, card]: any =
    candidates[Math.floor(Math.random() * candidates.length)];

  const newRemaining = { ...remaining };
  delete newRemaining[key];

  await update(deckRef, {
    remaining: newRemaining,
    used: {
      ...used,
      [key]: card,
    },
    lastOpened: card,
  });

  await push(
    logRef,
    `영향력 카드 사용 (${value}): ${card.title}`
  );
};
