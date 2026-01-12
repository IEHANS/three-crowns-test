"use client";

import { useEffect, useMemo, useState } from "react";
import {
  INFLUENCE_CARDS,
  InfluenceCard,
  InfluenceValue,
} from "../lib/data/influenceCards";

import { ref, push, onValue } from "firebase/database";
import { db } from "../lib/firebase";

const VALUES: InfluenceValue[] = [-5, -10, -15, -20];

export default function InfluenceBoard() {
  const [selected, setSelected] = useState<InfluenceCard | null>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);

  /* =========================
     🔄 사용된 카드 구독
     ========================= */
  useEffect(() => {
    const usedRef = ref(db, "room_1/influenceDeck/used");
    return onValue(usedRef, (snap) => {
      const val = snap.val();
      setUsedIds(val ? Object.values(val) : []);
    });
  }, []);

  /* =========================
     📊 값별 카드 풀 계산
     ========================= */
  const cardPools = useMemo(() => {
    const map: Record<InfluenceValue, InfluenceCard[]> = {
      "-5": [],
      "-10": [],
      "-15": [],
      "-20": [],
    };

    INFLUENCE_CARDS.forEach((card) => {
      if (!usedIds.includes(card.id)) {
        map[card.value].push(card);
      }
    });

    return map;
  }, [usedIds]);

  /* =========================
     🎴 카드 뽑기
     ========================= */
  const drawInfluenceCard = (value: InfluenceValue) => {
    const pool = cardPools[value];
    if (pool.length === 0) return;

    const picked = pool[Math.floor(Math.random() * pool.length)];
    setSelected(picked);

    push(ref(db, "room_1/influenceDeck/used"), picked.id);
  };

  /* =========================
     🔄 덱 초기화 감지 → UI 리셋
     ========================= */
  useEffect(() => {
    if (usedIds.length === 0) {
      setSelected(null);
    }
  }, [usedIds]);

  return (
    <section className="mt-4 rounded bg-zinc-800 p-4">
      <h2 className="mb-3 text-sm font-bold text-zinc-200">
        영향력 보드
      </h2>

      {/* 🎴 영향력 버튼 */}
      <div className="mb-4 flex gap-2">
        {VALUES.map((v) => {
          const remain = cardPools[v].length;
          const total = INFLUENCE_CARDS.filter(
            (c) => c.value === v
          ).length;

          return (
            <button
              key={v}
              disabled={remain === 0}
              onClick={() => drawInfluenceCard(v)}
              className={`
                flex-1 rounded py-2 text-sm
                ${remain === 0
                  ? "bg-zinc-600 text-zinc-400 cursor-not-allowed"
                  : "bg-zinc-700 hover:bg-zinc-600"}
              `}
            >
              {v} ({remain}/{total})
            </button>
          );
        })}
      </div>

      {/* 📜 카드 표시 */}
      {selected ? (
        <div className="rounded bg-zinc-900 p-4 text-sm space-y-4">
          <div>
            <div className="text-xs text-zinc-400">
              영향력 카드 {selected.value}
            </div>
            <div className="text-lg font-bold">
              {selected.title}
            </div>
          </div>

          {selected.keyword && (
            <div>
              <div className="font-semibold">
                {selected.keyword}
              </div>
              {selected.ruleText?.map((t, i) => (
                <div key={i} className="text-zinc-300">
                  {t}
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="font-semibold">발동 조건</div>
            {selected.activation.map((a, i) => (
              <div key={i} className="text-zinc-300">
                • {a}
              </div>
            ))}
          </div>

          <div>
            <div className="font-semibold">사건 지문</div>
            {selected.story.map((line, i) => (
              <div
                key={i}
                className="text-zinc-300 whitespace-pre-wrap"
              >
                {line || "\u00A0"}
              </div>
            ))}
          </div>

          <div>
            <div className="font-semibold">선택지</div>
            {selected.choices.map((c) => (
              <div
                key={c.id}
                className="mt-2 rounded border border-zinc-700 p-2"
              >
                <div className="font-semibold">
                  {c.label} {c.title}
                </div>

                {c.description.map((d, i) => (
                  <div key={i} className="text-zinc-300">
                    {d}
                  </div>
                ))}

                <div className="mt-1 text-xs text-zinc-400">
                  {c.effects.map((e, i) => (
                    <div key={i}>• {e}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-zinc-500">
          영향력 카드를 선택하세요.
        </div>
      )}
    </section>
  );
}
