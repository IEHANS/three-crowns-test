"use client";

import { ref, set } from "firebase/database";
import { db } from "../lib/firebase";

import { startGame, clearLogs } from "../lib/gameControl";
import { initEventDeck } from "../lib/initEventDeck";
import { initFieldMonsterDeck } from "../lib/initFieldMonsterDeck";
import { resetInfluenceDeck } from "../lib/resetInfluenceDeck";

import { setupFamiliesAndKingdoms } from "../lib/game/setup";
import { resetFamiliesAndKingdoms } from "../lib/game/resetFamiliesAndKingdoms";

export default function AdminControlPanel() {
  /* =======================
     게임 시작
  ======================= */
  const handleStartGame = async () => {
    console.log("🎴 가문 & 왕국 배정 시작");

    // 1️⃣ 가문 + 왕국 배정
    await setupFamiliesAndKingdoms("room_1");

    // 2️⃣ 게임 상태 시작
    await startGame();
  };

  /* =======================
     게임 종료
  ======================= */
  const handleEndGame = async () => {
    console.log("🧹 가문 & 왕국 초기화");

    // 1️⃣ Firebase: 가문 + 왕국 삭제
    await resetFamiliesAndKingdoms("room_1");

    // 2️⃣ 클라이언트 로컬 정보 제거
    if (typeof window !== "undefined") {
      localStorage.removeItem("myPlayerId");
    }
  };

  /* =======================
     라운드 초기화 (✅ 수정 완료)
  ======================= */
  const handleResetRound = async () => {
    console.log("⏪ 라운드 초기화");

    // 🔥 메인보드가 구독 중인 정확한 경로
    const roundRef = ref(db, "room_1/game/round");
    await set(roundRef, 0);
  };

  return (
    <section
      className="
        flex flex-wrap items-center justify-between
        gap-2
        bg-zinc-800
        border border-red-700
        rounded
        p-3
        text-sm
      "
    >
      {/* =======================
          왼쪽 : 게임 흐름
      ======================= */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleStartGame}
          className="px-4 py-2 rounded bg-green-700 hover:bg-green-600 font-bold"
        >
          ▶ 게임 시작
        </button>

        <button
          onClick={handleEndGame}
          className="px-4 py-2 rounded bg-zinc-600 hover:bg-zinc-500 font-bold"
        >
          ■ 게임 종료
        </button>

        <button
          onClick={handleResetRound}
          className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 font-bold"
        >
          ⏪ 라운드 초기화
        </button>

        <button
          onClick={clearLogs}
          className="px-4 py-2 rounded bg-yellow-700 hover:bg-yellow-600"
        >
          🧹 로그 초기화
        </button>
      </div>

      <div className="hidden sm:block w-px h-8 bg-zinc-600" />

      {/* =======================
          오른쪽 : 덱 관리
      ======================= */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={initEventDeck}
          className="px-4 py-2 rounded bg-red-700 hover:bg-red-600"
        >
          🔄 사건 카드 덱 초기화
        </button>

        <button
          onClick={initFieldMonsterDeck}
          className="px-4 py-2 rounded bg-red-800 hover:bg-red-700"
        >
          🐺 필드 몬스터 덱 초기화
        </button>

        <button
          onClick={resetInfluenceDeck}
          className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-600"
        >
          🃏 영향력 카드 덱 초기화
        </button>
      </div>
    </section>
  );
}
