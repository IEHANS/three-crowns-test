import { ref, set, remove } from "firebase/database";
import { db } from "./firebase";

/**
 * 🎮 게임 시작
 */
export const startGame = async () => {
  await set(ref(db, "room_1/game"), {
    status: "playing",
    startedAt: Date.now(),
  });
};

/**
 * 🛑 게임 종료
 */
export const endGame = async () => {
  await set(ref(db, "room_1/game/status"), "ended");
};

/**
 * 🧹 로그 전체 삭제 (관리자 전용 위험 버튼)
 */
export const clearLogs = async () => {
  await remove(ref(db, "room_1/logs"));
};
