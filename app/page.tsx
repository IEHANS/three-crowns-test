"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";

/* ===== Context ===== */
import { MyPlayerProvider } from "../lib/MyPlayerContext";

/* ===== Components ===== */
import PlayerSheet from "../components/PlayerSheet";
import MainBoard from "../components/MainBoard";
import AdminControlPanel from "../components/AdminControlPanel";
import WidgetTray from "../components/WidgetTray";
import LogWidget from "../components/LogWidget";
import MySecretPanel from "../components/MySecretPanel";

export default function Home() {
  /* =======================
     로그 상태
  ======================= */
  const [logs, setLogs] = useState<string[]>([]);
  const [logOpen, setLogOpen] = useState(false);

  /* =======================
     로그 실시간 구독
  ======================= */
  useEffect(() => {
    const logsRef = ref(db, "room_1/logs");
    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      setLogs(data ? Object.values(data) : []);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MyPlayerProvider>
      <div className="min-h-screen bg-zinc-900 text-white p-4 relative">
        {/* =======================
            메인 게임 레이아웃
        ======================= */}
        <div
          className="
            grid
            grid-cols-[2fr_3fr_2fr]
            grid-rows-[auto_auto_auto]
            gap-4
          "
        >
          {/* ===== 1행 ===== */}
          <PlayerSheet playerId="A" />

          <div className="row-span-2">
            <MainBoard logs={logs} />
          </div>

          <PlayerSheet playerId="B" />

          {/* ===== 2행 ===== */}
          <PlayerSheet playerId="C" isAdmin />
          <PlayerSheet playerId="D" />

          {/* ===== 3행 : 관리자 패널 ===== */}
          <div className="col-span-3">
            <AdminControlPanel />
          </div>
        </div>

        {/* =======================
            🔒 나만 보는 가문 & 왕국 패널
            - 이 브라우저의 플레이어만 렌더링
            - 게임 종료 시 즉시 사라짐
        ======================= */}
        <div className="fixed bottom-4 left-4 z-50 w-72">
          <MySecretPanel />
        </div>

        {/* =======================
            위젯 트레이
        ======================= */}
        <WidgetTray onOpenLog={() => setLogOpen(true)} />

        {/* =======================
            로그 전체 보기
        ======================= */}
        {logOpen && (
          <LogWidget
            logs={logs}
            onClose={() => setLogOpen(false)}
          />
        )}
      </div>
    </MyPlayerProvider>
  );
}
