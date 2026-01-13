"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { db } from "../lib/firebase";

import { drawEventCard } from "../lib/drawEventCard";
import { drawFieldMonster } from "../lib/drawFieldMonster";
import { drawFaithCard } from "../lib/firebaseActions";

import { EVENT_CARDS } from "../lib/data/eventCards";
import { FIELD_MONSTERS } from "../lib/data/fieldMonsters";

import InfluenceBoard from "./InfluenceBoard";
import { useMyPlayer } from "../lib/MyPlayerContext";

type Props = {
  logs: string[];
};

export default function MainBoard({ logs }: Props) {
  /* =========================
     상태
  ========================= */
  const [round, setRound] = useState(0);
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const [lastEvent, setLastEvent] = useState<any>(null);
  const [lastMonster, setLastMonster] = useState<any>(null);

  const [usedEventIds, setUsedEventIds] = useState<string[]>([]);
  const [usedMonsterIds, setUsedMonsterIds] = useState<string[]>([]);

  const { myPlayerId } = useMyPlayer();

  /* =========================
     라운드 구독
  ========================= */
  useEffect(() => {
    const roundRef = ref(db, "room_1/game/round");
    return onValue(roundRef, snap => {
      setRound(snap.val() ?? 0);
    });
  }, []);

  /* =========================
     덱 상태 구독
  ========================= */
  useEffect(() => {
    const eventUsedRef = ref(db, "room_1/eventDeck/used");
    const monsterUsedRef = ref(db, "room_1/fieldMonsterDeck/used");

    const unsubEvent = onValue(eventUsedRef, snap => {
      setUsedEventIds(snap.val() ? Object.values(snap.val()) : []);
    });

    const unsubMonster = onValue(monsterUsedRef, snap => {
      setUsedMonsterIds(snap.val() ? Object.values(snap.val()) : []);
    });

    return () => {
      unsubEvent();
      unsubMonster();
    };
  }, []);

  /* =========================
     마지막 공개 카드
  ========================= */
  useEffect(() => {
    const eventRef = ref(db, "room_1/eventDeck/lastOpened");
    const monsterRef = ref(db, "room_1/fieldMonsterDeck/lastOpened");

    const unsubEvent = onValue(eventRef, snap =>
      setLastEvent(snap.val())
    );
    const unsubMonster = onValue(monsterRef, snap =>
      setLastMonster(snap.val())
    );

    return () => {
      unsubEvent();
      unsubMonster();
    };
  }, []);

  /* =========================
     라운드 종료
  ========================= */
  const endRound = async () => {
    await set(ref(db, "room_1/game/round"), round + 1);
    await push(ref(db, "room_1/logs"), `🕒 ${round} 라운드 종료`);
  };

  /* =========================
     계산 값
  ========================= */
  const remainEvent = EVENT_CARDS.length - usedEventIds.length;
  const remainMonster = FIELD_MONSTERS.length - usedMonsterIds.length;
  const recentLogs = logs.slice(-3);

  return (
    <section className="bg-zinc-700 p-4 rounded flex flex-col h-full">
      {/* =========================
          라운드 표시
      ========================= */}
      <div className="mb-3 text-center">
        <div className="text-xs text-zinc-400">현재 라운드</div>
        <div className="flex justify-center items-center gap-3">
          <div className="text-2xl font-bold text-yellow-400">
            {round} / 20
          </div>
          <button
            onClick={endRound}
            className="px-3 py-1 rounded bg-yellow-600 text-black text-xs font-bold hover:bg-yellow-500"
          >
            라운드 종료
          </button>
        </div>
      </div>

      {/* =========================
          개인 행동 시트
      ========================= */}
      <div className="mb-4">
        <button
          onClick={() => setOpenActionSheet(v => !v)}
          className="w-full text-left text-sm bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700"
        >
          {openActionSheet
            ? "▲ 개인 행동 시트 닫기"
            : "▼ 개인 행동 시트 보기"}
        </button>

        {openActionSheet && (
          <div className="mt-2 text-xs text-zinc-300 space-y-4 bg-zinc-800 p-3 rounded leading-relaxed">

            <div>
              <b>• 내정</b>
              <p>- 건설: 건물 건설 또는 업그레이드</p>
              <p className="ml-2 text-zinc-400">
                · 농지 → 장원 → 성채<br />
                · 업그레이드 시 이전 효과 유지
              </p>
              <p>- 세금 징수: 라운드 시작 수익 1회 추가</p>
            </div>

            <div>
              <b>• 건물 효과 요약</b>
              <p className="ml-2">
                · 농지: 수입 +1<br />
                · 장원: 수입 +2, 추가 징집 1회, 상한 2회<br />
                · 성채: 수입 +2, 수비 방어 +3,
                추가 징집 1회, 상한 3회
              </p>
            </div>

            <div>
              <b>• 전쟁</b>
              <p>- 징집: 병력 1기 획득</p>
              <p className="ml-2 text-zinc-400">
                · 기사: 공1 / 방2 (2)<br />
                · 궁수: 공2 / 방1 (2)<br />
                · 공성: 공1 / 방1 (3, 성채 공격 +2)
              </p>
              <p>- 토벌: 필드 몬스터 전투 (보상 동화 4)</p>
            </div>

            <div>
              <b>• 외교</b>
              <p>- 우호 관계 선언 (라운드 수입 +2)</p>
            </div>

            <div>
              <b>• 첩보</b>
              <p>- 정찰(2): 다음 사건 카드 확인</p>
              <p>- 내통(4): 상대 왕국 정보 확인</p>
            </div>

            <div>
              <b>• 신앙</b>
              <p>- 기도(4): 신앙 카드 1장 획득</p>
            </div>

            <div>
              <b>• 상업</b>
              <p>- 투자: 최대 7, 다음 턴 정산</p>
            </div>

          </div>
        )}
      </div>

      {/* =========================
          🎴 카드 뽑기
      ========================= */}
      <div className="space-y-2 mb-4">
        <button
          disabled={remainEvent === 0}
          onClick={drawEventCard}
          className={`w-full rounded px-4 py-2 text-sm font-bold ${
            remainEvent === 0
              ? "bg-zinc-600 text-zinc-400"
              : "bg-purple-600 hover:bg-purple-500"
          }`}
        >
          사건 카드 1장 뽑기 ({remainEvent}/{EVENT_CARDS.length})
        </button>

        <button
          disabled={remainMonster === 0}
          onClick={drawFieldMonster}
          className={`w-full rounded px-4 py-2 text-sm font-bold ${
            remainMonster === 0
              ? "bg-zinc-700 text-zinc-400"
              : "bg-red-800 hover:bg-red-700"
          }`}
        >
          필드 몬스터 1장 뽑기 ({remainMonster}/{FIELD_MONSTERS.length})
        </button>

        <button
          disabled={!myPlayerId}
          onClick={() => {
  if (
    myPlayerId === "A" ||
    myPlayerId === "B" ||
    myPlayerId === "C" ||
    myPlayerId === "D"
  ) {
    drawFaithCard("room_1", myPlayerId);
  }
}}
          className="w-full rounded px-4 py-2 text-sm font-bold bg-amber-700 hover:bg-amber-600"
        >
          ✝ 신앙 카드 1장 뽑기 (개인)
        </button>
      </div>

      {/* =========================
          📜 마지막 사건 카드
      ========================= */}
      {lastEvent ? (
        <div className="mb-3 rounded bg-zinc-800 p-3 text-sm">
          <div className="text-zinc-400 text-xs mb-1">
            마지막 사건 카드 #{lastEvent.no}
          </div>
          <div className="font-bold">{lastEvent.title}</div>
          <div className="text-zinc-200 mt-1">
            {lastEvent.description}
          </div>
        </div>
      ) : (
        <div className="mb-3 rounded bg-zinc-800 p-3 text-xs text-zinc-400">
          아직 뽑힌 사건 카드가 없습니다.
        </div>
      )}

      {/* =========================
          🐺 필드 몬스터
      ========================= */}
      {lastMonster ? (
        <div className="mb-4 rounded border border-red-700 bg-zinc-900 p-3 text-sm">
          <div className="text-red-400 text-xs mb-1">
            현재 필드 몬스터 #{lastMonster.no}
          </div>
          <div className="font-bold text-red-300">
            {lastMonster.name}
          </div>
          <div className="text-zinc-200 mt-1">
            {lastMonster.description}
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            기본 토벌 보상: 동화 {lastMonster.baseReward}
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded bg-zinc-800 p-3 text-xs text-zinc-400">
          현재 필드에 몬스터가 없습니다.
        </div>
      )}

      {/* =========================
          📜 최근 로그
      ========================= */}
      <div className="mb-4 text-sm text-zinc-300 space-y-1">
        {recentLogs.map((log, i) => (
          <div key={i}>• {log}</div>
        ))}
      </div>

      {/* =========================
          ⚖️ 영향력 보드
      ========================= */}
      <div className="mt-auto border-t border-zinc-600 pt-4">
        <InfluenceBoard />
      </div>
    </section>
  );
}
