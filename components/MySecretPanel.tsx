"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { FAMILY_CARDS } from "../lib/game/families";
import FaithHandPanel from "./FaithHandPanel";

type PlayerId = "A" | "B" | "C" | "D";

export default function MySecretPanel() {
  const [myId, setMyId] = useState<PlayerId | null>(null);
  const [secret, setSecret] = useState<any>(null);

  /* 내 플레이어 ID */
  useEffect(() => {
    const id = localStorage.getItem("myPlayerId");
    if (id === "A" || id === "B" || id === "C" || id === "D") {
      setMyId(id);
    } else {
      setMyId(null);
    }
  }, []);

  /* secret 실시간 구독 */
  useEffect(() => {
    if (!myId) {
      setSecret(null);
      return;
    }

    const secretRef = ref(db, `room_1/players/${myId}/secret`);
    return onValue(secretRef, snap => {
      setSecret(snap.val() ?? null);
    });
  }, [myId]);

  if (!myId) return null;

  const family = secret
    ? FAMILY_CARDS.find(f => f.id === secret.familyId)
    : null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 space-y-3">
      <div className="bg-zinc-800 border border-purple-600 rounded p-4 text-sm shadow-lg">
        <div className="text-xs text-purple-400 mb-1">
          나만 보는 정보
        </div>

        {!secret ? (
          <div className="text-zinc-400 text-xs">
            ⏳ 게임 시작 대기 중…
          </div>
        ) : (
          <>
            <div className="font-bold">
              {family?.name}
            </div>
            <div className="text-zinc-400 text-xs">
              왕국: {secret.kingdom.toUpperCase()}
            </div>
            <div className="mt-2">
              영향력: <b>{secret.influence}</b>
            </div>
          </>
        )}
      </div>

      {/* ✝ 신앙 카드 */}
      <FaithHandPanel myPlayerId={myId} />
    </div>
  );
}
