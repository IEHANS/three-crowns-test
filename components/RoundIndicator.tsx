"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";

export default function RoundIndicator() {
  const [round, setRound] = useState(0);

  useEffect(() => {
    const roundRef = ref(db, "room_1/game/round");
    return onValue(roundRef, snap => {
      setRound(snap.val() ?? 0);
    });
  }, []);

  return (
    <div className="mb-2 text-center">
      <div className="text-xs text-zinc-400">현재 라운드</div>
      <div className="text-2xl font-bold text-yellow-400">
        {round} / 20
      </div>
    </div>
  );
}
