import { ref, set, remove } from "firebase/database";
import { db } from "./firebase";

/**
 * 🎮 게임 시작 (🔥 수정본)
 */
export const startGame = async () => {
  await set(ref(db, "room_1/game"), {
    status: "playing",
    round: 1,          // ✅ 메인보드가 보는 값
    startedAt: Date.now(),
  });
};

/**
 * 🛑 게임 종료
 */
export const endGame = async () => {
  await set(ref(db, "room_1/game"), {
    status: "ended",
    round: 0,
    endedAt: Date.now(),
  });
};

/**
 * 🧹 로그 전체 삭제
 */
export const clearLogs = async () => {
  await remove(ref(db, "room_1/logs"));
};
