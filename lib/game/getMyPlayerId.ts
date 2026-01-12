/**
 * 이 컴퓨터의 플레이어 ID를 반환
 * localStorage 기반 (본인만 확인 가능)
 */
export function getMyPlayerId(): "A" | "B" | "C" | "D" | null {
  if (typeof window === "undefined") return null;

  const id = localStorage.getItem("myPlayerId");

  if (id === "A" || id === "B" || id === "C" || id === "D") {
    return id;
  }

  return null;
}