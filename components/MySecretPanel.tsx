"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { FAITH_CARDS } from "../lib/data/faithCards";

export type PlayerId = "A" | "B" | "C" | "D";

type Props = {
  myPlayerId: PlayerId;
};

export default function FaithHandPanel({ myPlayerId }: Props) {
  const [hand, setHand] = useState<string[]>([]);

  /* =======================
     신앙 카드 손패 구독
  ======================= */
  useEffect(() => {
    const handRef = ref(db, `room_1/faithHands/${myPlayerId}`);

    return onValue(handRef, snap => {
      setHand(snap.val() ?? []);
    });
  }, [myPlayerId]);

  if (hand.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-amber-600 rounded p-3 text-xs shadow">
      <div className="text-amber-400 font-bold mb-1">
        ✝ 신앙 카드
      </div>

      <div className="space-y-1">
        {hand.map((id, i) => {
          const card = FAITH_CARDS.find(c => c.id === id);

          return (
            <div
              key={i}
              className="border border-zinc-700 rounded p-2 bg-zinc-800"
            >
              <div className="font-bold text-amber-300">
                {card?.name ?? id}
              </div>

              {card?.timing && (
                <div className="text-zinc-400">
                  {card.timing}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
