"use client";

import { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { useMyPlayer } from "../lib/MyPlayerContext";

import PlayerActionSheet from "./PlayerActionSheet";
import PlayerStatusSheet from "./PlayerStatusSheet";
import PersistentCardPanel from "./PersistentCardPanel";

import type { StanceType } from "../lib/gameTypes";

type PlayerId = "A" | "B" | "C" | "D";

type Props = {
  playerId: PlayerId;
  isAdmin?: boolean;
};

const DEFAULT_PLAYER = {
  displayName: "",
  gold: 0,
  silver: 0,
  copper: 0,
  familyTrack: 0,
  influence: 0,
  stance: null as StanceType,
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
  persistentCards: [null, null, null, null] as (string | null)[]
};

export default function PlayerSheet({ playerId, isAdmin = false }: Props) {
  const { setMyPlayerId } = useMyPlayer();
  const [player, setPlayer] =
    useState<typeof DEFAULT_PLAYER | null>(null);

  /* =======================
     Player 동기화 (🔥 secret 절대 보호)
  ======================= */
  useEffect(() => {
    const playerRef = ref(db, `room_1/players/${playerId}`);

    return onValue(playerRef, snap => {
      if (!snap.exists()) {
        // ❗ 여기서 Firebase에 set 하면 안 됨
        setPlayer(DEFAULT_PLAYER);
        return;
      }

      const data = snap.val();

      // 🔥 secret은 읽기만 하고 절대 덮어쓰지 않음
      const { secret, ...publicData } = data;

      setPlayer({
        ...DEFAULT_PLAYER,
        ...publicData,
        buildings: {
          ...DEFAULT_PLAYER.buildings,
          ...publicData.buildings
        },
        units: {
          ...DEFAULT_PLAYER.units,
          ...publicData.units
        },
        wounded: {
          ...DEFAULT_PLAYER.wounded,
          ...publicData.wounded
        },
        anxiety: {
          ...DEFAULT_PLAYER.anxiety,
          ...publicData.anxiety
        },
        persistentCards:
          publicData.persistentCards ??
          DEFAULT_PLAYER.persistentCards
      });
    });
  }, [playerId]);

  /* =======================
     공개 주사위
  ======================= */
  const [dice, setDice] = useState<{
    red: number | null;
    blue: number | null;
  }>({ red: null, blue: null });

  useEffect(() => {
    const diceRef = ref(db, "room_1/publicDice");
    return onValue(diceRef, snap => {
      const v = snap.val();
      setDice({
        red: v?.red ?? null,
        blue: v?.blue ?? null
      });
    });
  }, []);

  const rollDice = (color: "red" | "blue") => {
    const value = Math.floor(Math.random() * 6) + 1;
    set(ref(db, `room_1/publicDice/${color}`), value);
  };

  const resetDice = () => {
    set(ref(db, "room_1/publicDice"), {
      red: null,
      blue: null
    });
  };

  /* =======================
     Firebase 쓰기 (공개 데이터만)
  ======================= */
  const save = (path: string, value: any) => {
    set(ref(db, `room_1/players/${playerId}/${path}`), value);
  };

  if (!player) {
    return (
      <section className="bg-zinc-800 p-4 rounded text-sm">
        로딩중...
      </section>
    );
  }

  return (
    <section className="bg-zinc-800 p-4 rounded relative text-sm space-y-4">
      {isAdmin && (
        <div className="absolute top-2 right-2 text-xs text-red-400 font-bold">
          관리자
        </div>
      )}

      {/* 이름 입력 → 내 플레이어 확정 */}
      <input
        value={player.displayName}
        onChange={(e) => {
          const v = e.target.value;
          save("displayName", v);

          if (v.trim()) {
            setMyPlayerId(playerId);
            localStorage.setItem("myPlayerId", playerId);
          }
        }}
        placeholder={`플레이어 ${playerId}`}
        className="w-full bg-zinc-700 px-2 py-1 rounded"
      />

      <div className="grid grid-cols-3 gap-4">
        <PlayerActionSheet
          gold={player.gold}
          silver={player.silver}
          copper={player.copper}
          familyTrack={player.familyTrack}
          influence={player.influence}
          stance={player.stance}
          dice={dice}
          onRollDice={rollDice}
          onResetDice={resetDice}
          onMoneyChange={(t, v) => save(t, v)}
          onFamilyChange={(v) => save("familyTrack", v)}
          onInfluenceChange={(v) => save("influence", v)}
          onStanceChange={(v) => save("stance", v)}
        />

        <PlayerStatusSheet
          buildings={player.buildings}
          units={player.units}
          wounded={player.wounded}
          anxiety={player.anxiety}
          onToggleBuilding={(k) =>
            save(`buildings/${k}`, !player.buildings[k])
          }
          onUnitChange={(g, t, v) =>
            save(`${g}/${t}`, Math.max(0, v))
          }
          onAnxietyChange={(t, v) =>
            save(`anxiety/${t}`, v)
          }
        />

        <PersistentCardPanel
          cards={player.persistentCards}
          onSave={(i, t) =>
            set(
              ref(
                db,
                `room_1/players/${playerId}/persistentCards/${i}`
              ),
              t
            )
          }
          onClear={(i) =>
            set(
              ref(
                db,
                `room_1/players/${playerId}/persistentCards/${i}`
              ),
              null
            )
          }
        />
      </div>
    </section>
  );
}
