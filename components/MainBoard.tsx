"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { db } from "../lib/firebase";

import { drawEventCard } from "../lib/drawEventCard";
import { drawFieldMonster } from "../lib/drawFieldMonster";

import { EVENT_CARDS } from "../lib/data/eventCards";
import { FIELD_MONSTERS } from "../lib/data/fieldMonsters";

import InfluenceBoard from "./InfluenceBoard";

type Props = {
  logs: string[];
};

export default function MainBoard({ logs }: Props) {
  /* =========================
     상태
  ========================= */
  const [round, setRound] = useState<number>(0);
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const [lastEvent, setLastEvent] = useState<any>(null);
  const [lastMonster, setLastMonster] = useState<any>(null);

  const [usedEventIds, setUsedEventIds] = useState<string[]>([]);
  const [usedMonsterIds, setUsedMonsterIds] = useState<string[]>([]);

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
          라운드 표시 + 종료 버튼
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
          📜 개인 행동 시트 (아코디언)
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
          <div className="mt-2 text-xs text-zinc-300 space-y-4 bg-zinc-800 p-3 rounded">
            <div>
              <b>• 내정</b>
              <p>- 건설: 은화로 건물 건설 / 업그레이드</p>
              <p>- 세금 징수: 이번  라운드 시작 수입 1회 추가</p>
            </div>

            <div>
              <b>• 전쟁</b>
              <p>- 징집: 은화로 병사 획득 (유지비 없음)</p>
              <p>- 병종: 기사 / 궁수 / 공성 병기</p>
              <p>- 토벌: 몬스터 토벌</p>
              <p className="ml-2 text-zinc-400">
                · 기본 몬스터 보상: 동화 4<br />
                · 네임드 몬스터: 사건 카드로 등장
              </p>
              <p>
                - 플레이어 전쟁: 선전포고 이후 가능<br />
                (1라운드 직접 공격 불가)
              </p>
            </div>

            <div>
              <b>• 첩보</b>
              <p>- 정찰: 동화 2 → 다음 라운드 사건 카드 확인</p>
              <p>- 내통: 동화 4 → 플레이어 1명의 왕국 정보 확인</p>
            </div>

            <div>
              <b>• 신앙</b>
              <p>- 기도: 동화 4 → 신앙 카드 1장 손패 획득</p>
              <p className="ml-2 text-zinc-400">
                · 원하는 타이밍에 사용<br />
                · 사용 후 버림 더미
              </p>
            </div>

            <div>
              <b>• 외교</b>
              <p>- 우호 관계 선언 (거절 시 행동 소모)</p>
            </div>

            <div>
              <b>• 상업</b>
              <p>- 투자: 동화 X (최대 7)</p>
              <p className="ml-2 text-zinc-400">
                · 다음 턴 시작 정산<br />
                · 성공: 2배 / 실패: 원금
              </p>
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
              ? "bg-zinc-600 text-zinc-400 cursor-not-allowed"
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
              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              : "bg-red-800 hover:bg-red-700"
          }`}
        >
          필드 몬스터 1장 뽑기 ({remainMonster}/{FIELD_MONSTERS.length})
        </button>
      </div>

      {/* =========================
          🃏 마지막 사건 카드
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
