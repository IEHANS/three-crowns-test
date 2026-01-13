"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { FAITH_CARDS } from "../lib/data/faithCards";
import { useMyPlayer } from "../lib/MyPlayerContext";

export default function FaithHandPanel() {
  const { myPlayerId } = useMyPlayer();
  const [hand, setHand] = useState<string[]>([]);

  /* =======================
     신앙 카드 손패 구독
  ======================= */
  useEffect(() => {
    if (!myPlayerId) {
      setHand([]);
      return;
    }

    const handRef = ref(db, `room_1/faithHands/${myPlayerId}`);
    return onValue(handRef, snap => {
      setHand(snap.val() ?? []);
    });
  }, [myPlayerId]);

  if (!myPlayerId || hand.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-amber-600 rounded p-3 text-xs shadow">
      <div className="text-amber-400 font-bold mb-2">
        ✝ 신앙 카드
      </div>

      <div className="space-y-2">
        {hand.map((cardId, i) => {
          const card = FAITH_CARDS.find(c => c.id === cardId);

          return (
            <div
              key={`${cardId}-${i}`}
              className="border border-zinc-700 rounded p-2 bg-zinc-800"
            >
              {/* 카드 이름 */}
              <div className="font-bold text-amber-300">
                {card?.name ?? cardId}
              </div>

              {/* 카드 설명 (🔥 핵심 수정) */}
              {card?.description && (
                <div className="text-zinc-300 mt-1 leading-snug">
                  {card.description}
                </div>
              )}

              {/* 디버그용 (필요하면 주석 해제) */}
              {/* <div className="text-[10px] text-zinc-500 mt-1">
                발동 타이밍: {card?.timing}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
