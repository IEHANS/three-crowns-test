"use client";

import { useState } from "react";

const SECTIONS = [
  {
    title: "내정",
    items: [
      "건설: 은화로 건물 건설 / 업그레이드",
      "농지: 비용 은화 2 · 라운드 시작 수입 +1",
      "세금 징수: 이번 라운드 은화 수입 1회 추가"
    ]
  },
  {
    title: "전쟁",
    items: [
      "징집: 은화로 병사 획득 (유지비 없음)",
      "기사 / 궁수 / 공성 병기",
      "토벌: 몬스터 처치 시 보상 획득",
      "플레이어 전쟁: 선전포고 이후 가능",
      "1라운드 직접 공격 불가 (예외 가문 존재)"
    ]
  },
  {
    title: "첩보",
    items: [
      "정찰: 은화 2 → 다음 라운드 카드 미리 확인",
      "합스부르크 등 특화 가문은 비용 할인"
    ]
  },
  {
    title: "신앙",
    items: [
      "기도: 신앙 덱 1장 획득",
      "꽝 카드 존재",
      "사건 카드 효과 개인 무효 카드 등"
    ]
  },
  {
    title: "외교",
    items: [
      "우호 관계 제안 → 상대 수락 시 성립",
      "거절 시 행동 소모",
      "동맹은 우호 관계 상태에서만 가능",
      "동맹 파기 패널티 예정"
    ]
  },
  {
    title: "상업",
    items: [
      "투자: 은화 X → 다음 턴 코인 토스",
      "성공: 2배 회수",
      "실패: 원금만 회수",
      "라구나 등 상업 특화 가문 존재"
    ]
  }
];

export default function ActionAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-3 space-y-1 text-xs">
      {SECTIONS.map(sec => (
        <div key={sec.title} className="border border-zinc-700 rounded">
          <button
            onClick={() =>
              setOpen(open === sec.title ? null : sec.title)
            }
            className="w-full text-left px-2 py-1 bg-zinc-700 hover:bg-zinc-600 font-bold"
          >
            {sec.title}
          </button>

          {open === sec.title && (
            <div className="px-3 py-2 space-y-1 text-zinc-300 bg-zinc-800">
              {sec.items.map((it, i) => (
                <div key={i}>• {it}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
