import { ref, push, set, get } from "firebase/database";
import { db } from "./firebase";
import { FIELD_MONSTERS } from "./data/fieldMonsters";

/**
 * 🐺 필드 몬스터 1장 뽑기
 * - used: 소모된 몬스터 id 목록
 * - lastOpened: 현재 필드에 공개된 몬스터
 */
export async function drawFieldMonster() {
  const usedRef = ref(db, "room_1/fieldMonsterDeck/used");
  const lastRef = ref(db, "room_1/fieldMonsterDeck/lastOpened");

  /* =========================
     🔄 사용된 몬스터 ID 조회
     ========================= */
  const snap = await get(usedRef);

  const usedIds: string[] = snap.exists()
    ? (Object.values(snap.val()) as string[])
    : [];

  /* =========================
     🐺 아직 남은 몬스터 풀
     ========================= */
  const pool = FIELD_MONSTERS.filter(
    (monster) => !usedIds.includes(monster.id)
  );

  if (pool.length === 0) {
    alert("필드 몬스터가 모두 소모되었습니다.");
    return;
  }

  /* =========================
     🎴 랜덤 1장 선택
     ========================= */
  const picked =
    pool[Math.floor(Math.random() * pool.length)];

  /* =========================
     ✅ Firebase 반영
     ========================= */

  // 1️⃣ 현재 필드 몬스터 갱신
  await set(lastRef, picked);

  // 2️⃣ 덱 소모 기록 (id만 저장)
  await push(usedRef, picked.id);
}
