"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { FAMILY_CARDS } from "../lib/game/families";

export default function MySecretPanel() {
  const [myId, setMyId] = useState<string | null>(null);
  const [secret, setSecret] = useState<any>(null);

  /* =======================
     myPlayerId 실시간 동기화
     (같은 탭 대응)
  ======================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const id = localStorage.getItem("myPlayerId");
      setMyId(id);
    }, 300); // 0.3초면 충분

    return () => clearInterval(interval);
  }, []);

  /* =======================
     Firebase secret 구독
  ======================= */
  useEffect(() => {
    if (!myId) {
      setSecret(null);
      return;
    }

    const secretRef = ref(db, `room_1/players/${myId}/secret`);

    const unsubscribe = onValue(secretRef, (snap) => {
      const data = snap.val();
      setSecret(data ?? null); // ⭐ null 명시
    });

    return () => unsubscribe();
  }, [myId]);

  /* =======================
     렌더 조건
  ======================= */
  if (!myId || !secret) return null;

  const family = FAMILY_CARDS.find(
    (f) => f.id === secret.familyId
  );

  return (
    <div
      className="
        fixed bottom-4 right-4
        bg-zinc-800 border border-purple-600
        rounded p-4 text-sm w-64
        shadow-lg
      "
    >
      <div className="text-xs text-purple-400 mb-1">
        나만 보는 정보
      </div>

      <div className="font-bold">
        {family?.name}
      </div>

      <div className="text-zinc-400 text-xs">
        왕국: {secret.kingdom.toUpperCase()}
      </div>

      <div className="mt-2">
        영향력: <b>{secret.influence}</b>
      </div>
    </div>
  );
}
