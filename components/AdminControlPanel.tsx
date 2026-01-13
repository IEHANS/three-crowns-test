"use client";

import { ref, set, remove } from "firebase/database";
import { db } from "../lib/firebase";

import { startGame, clearLogs } from "../lib/gameControl";
import { initEventDeck } from "../lib/initEventDeck";
import { initFieldMonsterDeck } from "../lib/initFieldMonsterDeck";
import { resetInfluenceDeck } from "../lib/resetInfluenceDeck";

import { setupFamiliesAndKingdoms } from "../lib/game/setup";
import { initFaithSystem } from "../lib/firebaseActions";

export default function AdminControlPanel() {
  /* =======================
     게임 시작
  ======================= */
  const handleStartGame = async () => {
    console.log("🎴 게임 시작");

    // 1️⃣ 가문 & 왕국 배정
    await setupFamiliesAndKingdoms("room_1");

    // 2️⃣ ✝ 신앙 시스템 초기화
    await initFaithSystem("room_1");

    // 3️⃣ 게임 상태 시작
    await startGame();
  };

  /* =======================
     게임 종료 (🔥 완전 리셋)
  ======================= */
  const handleEndGame = async () => {
    console.log("🧹 게임 완전 종료");

    // 🔥 1️⃣ 플레이어 데이터 통째로 제거 (가문/왕국의 핵심)
    await remove(ref(db, "room_1/players"));

    // 🔥 2️⃣ 신앙 시스템 제거
    await remove(ref(db, "room_1/faithDeck"));
    await remove(ref(db, "room_1/faithHands"));

    // 3️⃣ 게임 상태 제거
    await remove(ref(db, "room_1/game"));

    // 4️⃣ 로그 제거
    await remove(ref(db, "room_1/logs"));

    // 5️⃣ 로컬 플레이어 정보 제거
    if (typeof window !== "undefined") {
      localStorage.removeItem("myPlayerId");
    }
  };

  /* =======================
     라운드 초기화
  ======================= */
  const handleResetRound = async () => {
    console.log("⏪ 라운드 초기화");
    await set(ref(db, "room_1/game/round"), 0);
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
      {/* 왼쪽 : 게임 흐름 */}
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

      {/* 오른쪽 : 덱 관리 */}
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
