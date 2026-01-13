"use client";

import { useState } from "react";

type Props = {
  cards: (string | null)[];
  onSave: (index: number, text: string) => void;
  onClear: (index: number) => void;
};

export default function PersistentCardPanel({
  cards,
  onSave,
  onClear
}: Props) {
  const [drafts, setDrafts] = useState<(string | null)[]>(
    [null, null, null, null]
  );

  const updateDraft = (i: number, value: string) => {
    const next = [...drafts];
    next[i] = value;
    setDrafts(next);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded p-3 space-y-2 text-xs">
      <p className="text-zinc-300 font-bold">지속효과카드</p>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="border border-zinc-700 rounded p-2 bg-zinc-800 space-y-1"
          >
            {!card ? (
              <>
                <textarea
                  value={drafts[i] ?? ""}
                  onChange={(e) => updateDraft(i, e.target.value)}
                  placeholder={`슬롯 ${i + 1}`}
                  className="w-full h-20 bg-zinc-900 text-zinc-200 p-1 rounded resize-none"
                />
                <button
                  onClick={() => {
                    if (drafts[i]?.trim()) {
                      onSave(i, drafts[i]!.trim());
                      updateDraft(i, "");
                    }
                  }}
                  className="w-full bg-emerald-500 text-black text-xs rounded py-1"
                >
                  저장
                </button>
              </>
            ) : (
              <>
                <div className="whitespace-pre-wrap text-zinc-200">
                  {card}
                </div>
                <button
                  onClick={() => onClear(i)}
                  className="text-red-400 underline"
                >
                  제거
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <p className="text-zinc-500">
        · 효과는 자동 적용되지 않습니다  
        · 공개 정보입니다
      </p>
    </div>
  );
}
