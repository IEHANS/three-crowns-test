"use client";

import { useState } from "react";

type AnxietyType = "plague" | "monster" | "rebellion" | "famine";

type Props = {
  buildings: {
    farm: boolean;
    manor: boolean;
    castle: boolean;
  };

  units: {
    knight: number;
    archer: number;
    siege: number;
  };

  wounded: {
    knight: number;
    archer: number;
  };

  anxiety: Record<AnxietyType, number>;

  onToggleBuilding: (k: "farm" | "manor" | "castle") => void;
  onUnitChange: (
    group: "units" | "wounded",
    type: "knight" | "archer" | "siege",
    value: number
  ) => void;
  onAnxietyChange: (type: AnxietyType, value: number) => void;
};

const ANXIETY_LIST: { key: AnxietyType; label: string }[] = [
  { key: "plague", label: "역병" },
  { key: "monster", label: "몬스터" },
  { key: "rebellion", label: "반란" },
  { key: "famine", label: "기근" }
];

const ANXIETY_COLOR: Record<AnxietyType, string> = {
  plague: "bg-purple-500 border-purple-500",
  monster: "bg-orange-500 border-orange-500",
  rebellion: "bg-red-500 border-red-500",
  famine: "bg-yellow-500 border-yellow-500"
};

export default function PlayerStatusSheet({
  buildings,
  units,
  wounded,
  anxiety,
  onToggleBuilding,
  onUnitChange,
  onAnxietyChange
}: Props) {
  const [showWoundRule, setShowWoundRule] = useState(false);

  return (
    <div className="space-y-4">
      {/* 건물 */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">건물</p>
        <div className="flex gap-1">
          {([
            { key: "farm", label: "농지" },
            { key: "manor", label: "장원" },
            { key: "castle", label: "성채" }
          ] as const).map((b) => (
            <button
              key={b.key}
              onClick={() => onToggleBuilding(b.key)}
              className={`px-2 py-1 rounded text-xs font-bold ${
                buildings[b.key]
                  ? "bg-emerald-400 text-black"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* 정상 병력 */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">정상 병력</p>

        <UnitRow
          label="기사"
          desc="공격 1 / 방어 2 / 동화 2"
          value={units.knight}
          onChange={(v) => onUnitChange("units", "knight", v)}
        />
        <UnitRow
          label="궁수"
          desc="공격 2 / 방어 1 / 동화 2"
          value={units.archer}
          onChange={(v) => onUnitChange("units", "archer", v)}
        />
        <UnitRow
          label="공성"
          desc="공격 1 / 방어 1 / 동화 3 (+성채 +2)"
          value={units.siege}
          onChange={(v) => onUnitChange("units", "siege", v)}
        />
      </div>

      {/* 부상 병력 */}
      <div>
        <p className="text-xs text-zinc-400 mb-1">부상 병력</p>

        <UnitRow
          label="기사"
          desc="공격 0 / 방어 1"
          value={wounded.knight}
          onChange={(v) => onUnitChange("wounded", "knight", v)}
        />
        <UnitRow
          label="궁수"
          desc="공격 1 / 방어 0"
          value={wounded.archer}
          onChange={(v) => onUnitChange("wounded", "archer", v)}
        />
      </div>

      {/* 부상 규칙 */}
      <div>
        <button
          onClick={() => setShowWoundRule((v) => !v)}
          className="text-xs text-zinc-400 underline hover:text-zinc-200"
        >
          {showWoundRule ? "▲ 부상 규칙 닫기" : "▼ 부상 규칙 보기"}
        </button>

        {showWoundRule && (
          <div className="text-xs text-zinc-300 mt-2 space-y-1">
            <p>• 부상 병력은 각 병종의 부상 스탯을 사용한다.</p>
            <p>• 공성 / 몬스터 토벌 / 전쟁 선포 불가</p>
            <p>• 수비 전투 참여 가능</p>
            <p>• 라운드 종료 시 병력 1기당 동화 2로 회복</p>
          </div>
        )}
      </div>

      {/* 불안요소 */}
      <div className="border-t border-zinc-700 pt-3 space-y-2">
        <p className="text-xs text-zinc-400">불안요소</p>

        {ANXIETY_LIST.map((a) => (
          <div key={a.key} className="flex justify-between text-xs">
            <span>{a.label}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = anxiety[a.key] >= n;
                return (
                  <button
                    key={n}
                    onClick={() =>
                      onAnxietyChange(
                        a.key,
                        active && anxiety[a.key] === n ? 0 : n
                      )
                    }
                    className={`w-4 h-4 rounded border ${
                      active
                        ? ANXIETY_COLOR[a.key]
                        : "border-zinc-600 hover:border-zinc-400"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* 불안요소 규칙 */}
        <details className="text-xs text-zinc-300 mt-2">
          <summary className="cursor-pointer text-zinc-400 underline hover:text-zinc-200">
            불안요소 규칙 보기
          </summary>

          <div className="mt-2 space-y-2">
            <div>
              <p className="font-bold text-zinc-200">▶ 발동 조건</p>
              <ul className="list-disc list-inside space-y-1">
                <li>불안요소 토큰 총합이 <b>6개 이상</b></li>
                <li>
                  4종 불안요소가 모두 <b>1개 이상</b>
                  <span className="block text-zinc-400 ml-4">
                    (역병 · 몬스터 · 반란 · 기근)
                  </span>
                </li>
              </ul>
              <p className="text-zinc-400 mt-1">
                ※ 위 조건 중 하나라도 충족 시 즉시 발동
              </p>
            </div>

            <div>
              <p className="font-bold text-zinc-200">▶ 즉시 효과</p>
              <ul className="list-disc list-inside space-y-1">
                <li>해당 플레이어의 <b>가문 트랙 –1</b></li>
                <li>모든 불안요소 토큰 <b>전부 제거</b></li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

/* 공용 유닛 Row */
function UnitRow({
  label,
  desc,
  value,
  onChange
}: {
  label: string;
  desc: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs">
        {label} <span className="text-zinc-400">{desc}</span>
      </span>
      <div className="flex gap-1 items-center">
        <button
          onClick={() => onChange(value - 1)}
          className="px-2 bg-zinc-700 rounded hover:bg-zinc-600"
        >
          -
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="px-2 bg-zinc-700 rounded hover:bg-zinc-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
