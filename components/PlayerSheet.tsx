"use client";

import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../lib/firebase";
import { useMyPlayer } from "../lib/MyPlayerContext";

const FAMILY_TRACK = [-3, -2, -1, 0, 1, 2, 3];
const INFLUENCE_TRACK = [0, 5, 10, 15, 20, 25, 30];



type Props = {
  playerId: "A" | "B" | "C" | "D";
  isAdmin?: boolean;
  familyTrack?: number;
  displayName?: string;
  gold?: number;
  silver?: number;
  copper?: number;
};

export default function PlayerSheet({
  playerId,
  isAdmin = false,
  familyTrack = 0,
  displayName = "",
  gold = 0,
  silver = 0,
  copper = 0
}: Props) {

const { setMyPlayerId } = useMyPlayer();

  /* =======================
     로컬 상태
  ======================= */
  const [name, setName] = useState(displayName);
  const [localFamilyTrack, setLocalFamilyTrack] = useState(familyTrack);
  const [localInfluence, setLocalInfluence] = useState(0);
  const [stance, setStance] = useState<"approve" | "oppose" | null>(null);

  const [localGold, setLocalGold] = useState(gold);
  const [localSilver, setLocalSilver] = useState(silver);
  const [localCopper, setLocalCopper] = useState(copper);

  const [units, setUnits] = useState({
    knight: 0,
    archer: 0,
    siege: 0
  });

  const [wounded, setWounded] = useState({
    knight: 0,
    archer: 0
  });

  const [showWoundRule, setShowWoundRule] = useState(false);

/* =======================
   건물 상태
======================= */
const [buildings, setBuildings] = useState<{
  farm: boolean;
  manor: boolean;
  castle: boolean;
}>({
  farm: false,
  manor: false,
  castle: false
});

/* =======================
   건물 토글 함수
======================= */
const toggleBuilding = (key: "farm" | "manor" | "castle") => {
  const next = {
    ...buildings,
    [key]: !buildings[key]
  };

  setBuildings(next);
  saveValue(`buildings/${key}`, next[key]);
};


  /* =======================
     Firebase helper
  ======================= */
  const saveValue = (path: string, value: any) => {
    set(ref(db, `room_1/players/${playerId}/${path}`), value);
  };

  /* =======================
     UI 액션
  ======================= */
  const updateMoney = (
    type: "gold" | "silver" | "copper",
    value: number,
    setter: (v: number) => void
  ) => {
    setter(value);
    saveValue(type, value);
  };

  const updateUnit = (
    group: "units" | "wounded",
    type: string,
    value: number
  ) => {
    const safeValue = Math.max(0, value);

    if (group === "units") {
      const next = { ...units, [type]: safeValue };
      setUnits(next);
      saveValue(`units/${type}`, safeValue);
    } else {
      const next = { ...wounded, [type]: safeValue };
      setWounded(next);
      saveValue(`wounded/${type}`, safeValue);
    }
  };

  const updateStance = (value: "approve" | "oppose" | null) => {
    setStance(value);
    saveValue("stance", value);
  };

  return (
    <section className="bg-zinc-800 p-4 rounded relative text-sm grid grid-cols-2 gap-4">
      {isAdmin && (
        <div className="absolute top-2 right-2 text-xs text-red-400 font-bold">
          관리자
        </div>
      )}

        {/* =======================
    좌측 상단 : 이름
======================= */}
<div>
  <input
    value={name}
    onChange={(e) => {
      const value = e.target.value;

      setName(value);
      saveValue("displayName", value);

      // ✅ Context에만 기록
      if (value.trim().length > 0) {
        setMyPlayerId(playerId);
      }
    }}
    placeholder={`플레이어 ${playerId}`}
    className="w-full bg-zinc-700 text-white px-2 py-1 rounded"
  />
</div>



     {/* =======================
    우측 상단 : 건물
======================= */}
<div className="space-y-2">
  <p className="text-xs text-zinc-400">건물</p>

  <div className="flex gap-1">
   {([
  { key: "farm", label: "농지" },
  { key: "manor", label: "장원" },
  { key: "castle", label: "성채" }
] as const).map((b) => (
      <button
        key={b.key}
        onClick={() => toggleBuilding(b.key)}
        className={
          "px-2 py-1 rounded text-xs font-bold transition " +
          (buildings[b.key]
            ? "bg-emerald-400 text-black"
            : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600")
        }
      >
        {b.label}
      </button>
    ))}
  </div>

  <details className="text-xs text-zinc-300">
    <summary className="cursor-pointer text-zinc-400">
      건물 효과 보기
    </summary>
    <div className="mt-1 space-y-1">
      <p><b>농지</b> · 비용 동화 2 · 라운드 시작 수입 +1</p>
      <p><b>장원</b> · 비용 동화 4 · 수입 +2 · 추가 징집 1회 · 최대 2회</p>
      <p><b>성채</b> · 비용 동화 6 · 수입 +2 · 수비 방어 +3 · 징집 최대 3회</p>
    </div>
  </details>
</div>
      {/* =======================
          좌측 하단 : 자원 / 트랙 / 입장
      ======================= */}
      <div className="space-y-3">
        {/* 화폐 */}
        <div className="space-y-1">
          {[
            { label: "금", key: "gold", value: localGold, setter: setLocalGold },
            { label: "은", key: "silver", value: localSilver, setter: setLocalSilver },
            { label: "동", key: "copper", value: localCopper, setter: setLocalCopper }
          ].map(({ label, key, value, setter }) => (
            <div key={key} className="flex justify-between items-center">
              <span>{label}</span>
              <div className="flex gap-1 items-center">
                <button onClick={() => updateMoney(key as any, value - 1, setter)}>-</button>
                <span className="w-6 text-center">{value}</span>
                <button onClick={() => updateMoney(key as any, value + 1, setter)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* 가문 트랙 */}
        <div>
          <p className="text-xs text-zinc-400 mb-1">가문 트랙</p>
          <div className="flex gap-1 flex-wrap">
            {FAMILY_TRACK.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setLocalFamilyTrack(v);
                  saveValue("familyTrack", v);
                }}
                className={
                  "px-2 py-1 rounded text-xs " +
                  (localFamilyTrack === v
                    ? "bg-yellow-400 text-black font-bold"
                    : "bg-zinc-700 text-zinc-300")
                }
              >
                {v > 0 ? `+${v}` : v}
              </button>
            ))}
          </div>
        </div>

        {/* 가문 영향력 */}
        <div>
          <p className="text-xs text-zinc-400 mb-1">가문 영향력</p>
          <div className="flex gap-1 flex-wrap">
            {INFLUENCE_TRACK.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setLocalInfluence(v);
                  saveValue("influence", v);
                }}
                className={
                  "px-2 py-1 rounded text-xs " +
                  (localInfluence === v
                    ? "bg-purple-400 text-black font-bold"
                    : "bg-zinc-700 text-zinc-300")
                }
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 입장 선언 */}
        <div>
          <p className="text-xs text-zinc-400 mb-1">입장 선언</p>
          <div className="flex gap-2">
            <button
              onClick={() => updateStance("approve")}
              className={`px-3 py-1 rounded text-xs font-bold ${
                stance === "approve"
                  ? "bg-green-500 text-black"
                  : "bg-zinc-700 text-zinc-300"
              }`}
            >
              찬성
            </button>
            <button
              onClick={() => updateStance("oppose")}
              className={`px-3 py-1 rounded text-xs font-bold ${
                stance === "oppose"
                  ? "bg-red-500 text-black"
                  : "bg-zinc-700 text-zinc-300"
              }`}
            >
              반대
            </button>
            <button
              onClick={() => updateStance(null)}
              className="px-3 py-1 rounded text-xs bg-zinc-600"
            >
              리셋
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          우측 하단 : 병력
      ======================= */}
      <div className="space-y-3">
        {/* 정상 병력 */}
        <div>
          <p className="text-xs text-zinc-400 mb-1">정상 병력</p>
          {[
            { key: "knight", name: "기사", desc: "공 1 / 방 2 / 동화 2" },
            { key: "archer", name: "궁수", desc: "공 2 / 방 1 / 동화 2" },
            { key: "siege", name: "공성", desc: "공 1 / 방 1 / 동화 3 · 성채 공격 +2" }
          ].map((u) => (
            <div key={u.key} className="flex justify-between items-center">
              <div>
                <div className="font-bold">{u.name}</div>
                <div className="text-xs text-zinc-400">{u.desc}</div>
              </div>
              <div className="flex gap-1 items-center">
                <button onClick={() => updateUnit("units", u.key, units[u.key as keyof typeof units] - 1)}>-</button>
                <span className="w-6 text-center">{units[u.key as keyof typeof units]}</span>
                <button onClick={() => updateUnit("units", u.key, units[u.key as keyof typeof units] + 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* 부상 병력 */}
        <div>
          <p className="text-xs text-zinc-400 mb-1">부상 병력</p>
          {[
            { key: "knight", name: "기사", desc: "공 0 / 방 1 / 동화 2" },
            { key: "archer", name: "궁수", desc: "공 1 / 방 0 / 동화 2" }
          ].map((u) => (
            <div key={u.key} className="flex justify-between items-center">
              <div>
                <div className="font-bold">{u.name}</div>
                <div className="text-xs text-zinc-400">{u.desc}</div>
              </div>
              <div className="flex gap-1 items-center">
                <button onClick={() => updateUnit("wounded", u.key, wounded[u.key as keyof typeof wounded] - 1)}>-</button>
                <span className="w-6 text-center">{wounded[u.key as keyof typeof wounded]}</span>
                <button onClick={() => updateUnit("wounded", u.key, wounded[u.key as keyof typeof wounded] + 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* 부상 규칙 */}
        <div>
          <button
            onClick={() => setShowWoundRule(!showWoundRule)}
            className="text-xs text-zinc-400 underline"
          >
            {showWoundRule ? "▲ 부상 규칙 닫기" : "▼ 부상 규칙 보기"}
          </button>
          {showWoundRule && (
            <div className="text-xs text-zinc-300 mt-1 space-y-1">
              <p>• 부상 병력은 각 병종의 부상 스탯을 사용한다.</p>
              <p>• 공성 / 몬스터 토벌 / 전쟁 선포 불가</p>
              <p>• 수비 전투 참여 가능</p>
              <p>• 라운드 종료 시 병력 1기당 동화 2로 회복</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
