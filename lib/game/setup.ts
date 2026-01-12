import { ref, set } from "firebase/database";
import { db } from "../firebase";

import { FAMILY_CARDS } from "./families";
import { randomPick } from "./random";

/**
 * 플레이어 ID 고정
 */
const PLAYERS = ["A", "B", "C", "D"] as const;
type PlayerId = typeof PLAYERS[number];

/**
 * 왕국 타입
 */
const KINGDOMS = ["a", "b", "c"] as const;
type KingdomType = typeof KINGDOMS[number];

/**
 * 가문 + 왕국 랜덤 배정
 * - 각 플레이어는 서로 다른 가문을 받는다
 * - 왕국은 중복 가능
 * - 영향력은 가문 카드 기준으로 초기화
 */
export async function setupFamiliesAndKingdoms(roomId: string) {
  // 🔹 가문 셔플 (중복 방지용)
  const shuffledFamilies = [...FAMILY_CARDS].sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < PLAYERS.length; i++) {
    const playerId: PlayerId = PLAYERS[i];
    const family = shuffledFamilies[i];
    const kingdom: KingdomType = randomPick(KINGDOMS);

    // 🔐 플레이어 개인 비밀 데이터
    await set(
      ref(db, `${roomId}/players/${playerId}/secret`),
      {
        familyId: family.id,
        familyCode: family.code,
        familyName: family.name,

        kingdom, // "a" | "b" | "c"

        influence: family.influenceStart,
        influenceMax: family.influenceMax,

        // 추후 확장 대비
        assignedAt: Date.now(),
      }
    );
  }
}
