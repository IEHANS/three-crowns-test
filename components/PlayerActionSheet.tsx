"use client";

/* =====================
   상수 트랙
===================== */
const FAMILY_TRACK = [-3, -2, -1, 0, 1, 2, 3] as const;
const INFLUENCE_TRACK = [0, 5, 10, 15, 20, 25, 30] as const;

/* =====================
   타입
===================== */
type MoneyType = "gold" | "silver" | "copper";

/** 입장 선언 타입 (초기값 null 허용) */
type StanceType = "approve" | "oppose" | null;

type Dice = {
  red: number | null;
  blue: number | null;
};

type Props = {
  gold: number;
  silver: number;
  copper: number;

  familyTrack: number;
  influence: number;
  stance: StanceType;

  /** 🎲 공개 주사위 (Room 단위 단 하나) */
  dice?: Dice;

  /** 🎲 조작 이벤트 (상태는 부모가 관리) */
  onRollDice: (color: "red" | "blue") => void;
  onResetDice: () => void;

  onMoneyChange: (type: MoneyType, value: number) => void;
  onFamilyChange: (v: number) => void;
  onInfluenceChange: (v: number) => void;
  onStanceChange: (v: StanceType) => void;
};

export default function PlayerActionSheet({
  gold,
  silver,
  copper,
  familyTrack,
  influence,
  stance,
  dice,
  onRollDice,
  onResetDice,
  onMoneyChange,
  onFamilyChange,
  onInfluenceChange,
  onStanceChange
}: Props) {
  return (
    <div className="space-y-4">
      {/* =====================
          자원
      ===================== */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">자원</p>
        <div className="space-y-1">
          {([
            { label: "금", key: "gold", value: gold },
            { label: "은", key: "silver", value: silver },
            { label: "동", key: "copper", value: copper }
          ] as const).map(({ label, key, value }) => (
            <div key={key} className="flex justify-between items-center">
              <span>{label}</span>
              <div className="flex gap-1 items-center">
                <button
                  onClick={() => onMoneyChange(key, value - 1)}
                  className="px-2 bg-zinc-700 rounded hover:bg-zinc-600"
                >
                  -
                </button>
                <span className="w-6 text-center">{value}</span>
                <button
                  onClick={() => onMoneyChange(key, value + 1)}
                  className="px-2 bg-zinc-700 rounded hover:bg-zinc-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================
          가문 트랙
      ===================== */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">가문 트랙</p>
        <div className="flex gap-1 flex-wrap">
          {FAMILY_TRACK.map((v) => (
            <button
              key={v}
              onClick={() => onFamilyChange(v)}
              className={`px-2 py-1 rounded text-xs transition ${
                familyTrack === v
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {v > 0 ? `+${v}` : v}
            </button>
          ))}
        </div>
      </div>

      {/* =====================
          가문 영향력
      ===================== */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">가문 영향력</p>
        <div className="flex gap-1 flex-wrap">
          {INFLUENCE_TRACK.map((v) => (
            <button
              key={v}
              onClick={() => onInfluenceChange(v)}
              className={`px-2 py-1 rounded text-xs transition ${
                influence === v
                  ? "bg-purple-400 text-black font-bold"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* =====================
          입장 선언
      ===================== */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">입장 선언</p>
        <div className="flex gap-2">
          <button
            onClick={() => onStanceChange("approve")}
            className={`px-3 py-1 rounded text-xs font-bold transition ${
              stance === "approve"
                ? "bg-green-500 text-black"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
          >
            찬성
          </button>
          <button
            onClick={() => onStanceChange("oppose")}
            className={`px-3 py-1 rounded text-xs font-bold transition ${
              stance === "oppose"
                ? "bg-red-500 text-black"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
          >
            반대
          </button>
          <button
            onClick={() => onStanceChange(null)}
            className="px-3 py-1 rounded text-xs bg-zinc-600 hover:bg-zinc-500"
          >
            리셋
          </button>
        </div>
      </div>

      {/* =====================
          🎲 공개 주사위
      ===================== */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">공개 주사위</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRollDice("red")}
            className="w-10 h-10 rounded font-bold text-white bg-red-600 hover:bg-red-500"
          >
            {dice?.red ?? "?"}
          </button>

          <button
            onClick={() => onRollDice("blue")}
            className="w-10 h-10 rounded font-bold text-white bg-blue-600 hover:bg-blue-500"
          >
            {dice?.blue ?? "?"}
          </button>

          <button
            onClick={onResetDice}
            className="px-2 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600"
          >
            리셋
          </button>
        </div>
      </div>
    </div>
  );
}
