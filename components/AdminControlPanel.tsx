"use client";

import { ref, set, remove, get } from "firebase/database";
import { db } from "../lib/firebase";

import { startGame, clearLogs } from "../lib/gameControl";
import { initEventDeck } from "../lib/initEventDeck";
import { initFieldMonsterDeck } from "../lib/initFieldMonsterDeck";
import { resetInfluenceDeck } from "../lib/resetInfluenceDeck";

import { setupFamiliesAndKingdoms } from "../lib/game/setup";
import { initFaithSystem } from "../lib/firebaseActions";

/* =======================
   기본 플레이어 구조
======================= */
const DEFAULT_PLAYER = {
  displayName: "",
  gold: 0,
  silver: 0,
  copper: 0,
  familyTrack: 0,
  influence: 0,
  stance: null,
  buildings: {
    farm: false,
    manor: false,
    castle: false
  },
  units: {
    knight: 0,
    archer: 0,
    siege: 0
  },
  wounded: {
    knight: 0,
    archer: 0
  },
  anxiety: {
    plague: 0,
    monster: 0,
    rebellion: 0,
    famine: 0
  },
  persistentCards: [null, null, null, null]
};

export default function AdminControlPanel() {
  /* =======================
     🎮 게임 시작
  ======================= */
  const handleStartGame = async () => {
    console.log("🎴 게임 시작");

    const roomRef = ref(db, "room_1/players");
    const snap = await get(roomRef);

    // 1️⃣ players 기본 구조 보장
    if (!snap.exists()) {
      await set(roomRef, {
        A: DEFAULT_PLAYER,
        B: DEFAULT_PLAYER,
        C: DEFAULT_PLAYER,
        D: DEFAULT_PLAYER
      });
    }

    // 2️⃣ 가문 & 왕국 배정 (이제 안전)
    await setupFamiliesAndKingdoms("room_1");

    // 3️⃣ 신앙 시스템 초기화
    await initFaithSystem("room_1");

    // 4️⃣ 게임 상태 시작
    await startGame();
  };

  /* =======================
     🛑 게임 종료 (완전 리셋)
  ======================= */
  const handleEndGame = async () => {
    console.log("🧹 게임 완전 종료");

    await remove(ref(db, "room_1/players"));
    await remove(ref(db, "room_1/faithDeck"));
    await remove(ref(db, "room_1/faithHands"));
    await remove(ref(db, "room_1/game"));
    await remove(ref(db, "room_1/logs"));

    if (typeof window !== "undefined") {
      localStorage.removeItem("myPlayerId");
    }
  };

  /* =======================
     ⏪ 라운드 초기화
  ======================= */
  const handleResetRound = async () => {
    await set(ref(db, "room_1/game/round"), 0);
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-2 bg-zinc-800 border border-red-700 rounded p-3 text-sm">
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
