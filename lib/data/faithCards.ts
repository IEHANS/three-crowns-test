// lib/data/faithCards.ts
// 신앙 카드 데이터 정의 파일
// 규칙:
// - effect는 텍스트 기반 (로직은 추후 연결)
// - count는 덱에 포함되는 장 수
// - timing은 UI/사용 가능 시점 판별용

export type FaithTiming =
  | "anytime"          // 언제든
  | "turnStart"        // 내 턴 시작
  | "turn"             // 내 턴
  | "roundStart"       // 라운드 시작 직후
  | "battleBefore"     // 전면전 직전
  | "battleAfter"      // 전면전 직후
  | "battleWin";       // 전면전 승리 시

export type FaithCard = {
  id: string;
  name: string;
  timing: FaithTiming;
  description: string[];
  count: number;
};

export const FAITH_CARDS: FaithCard[] = [
  {
    id: "guardian_blessing",
    name: "수호의 은총",
    timing: "battleBefore",
    description: [
      "내 방어력 +4",
      "수비자일 때만 사용 가능",
      "라운드당 1회 제한"
    ],
    count: 2
  },
  {
    id: "divine_scale",
    name: "신의 저울",
    timing: "battleBefore",
    description: [
      "이번 전면전의 결과를 무승부로 취급한다",
      "공격합과 방어합이 동일한 것으로 처리"
    ],
    count: 1
  },
  {
    id: "holy_hammer",
    name: "신의 망치",
    timing: "battleBefore",
    description: [
      "상대가 성채를 보유하고 있다면",
      "상대 방어력 -3"
    ],
    count: 2
  },
  {
    id: "divine_punishment",
    name: "신벌",
    timing: "battleWin",
    description: [
      "내가 전면전에서 승리했고",
      "차이값 5 이상으로 트랙 피해 -1이 발생했을 때",
      "그 피해를 추가로 -1 (총 -2)"
    ],
    count: 1
  },
  {
    id: "saint_blessing",
    name: "수호성인의 축복",
    timing: "turnStart",
    description: [
      "이번 턴 동안 징집 1회 무료",
      "행동 소모 없음",
      "비용도 없음"
    ],
    count: 2
  },
  {
    id: "saint_healing",
    name: "성자의 치료",
    timing: "battleAfter",
    description: [
      "이번 전면전에서 승리했다면",
      "내 병력 중 2기를 추가로 생존시킨다",
      "전투로 제거될 병력을 제거하지 않거나 되살림"
    ],
    count: 2
  },
  {
    id: "invalid",
    name: "이건 무효야!",
    timing: "turn",
    description: [
      "이번 라운드 사건 카드의 효과를",
      "나에게만 무효로 만든다"
    ],
    count: 2
  },
  {
    id: "foresight",
    name: "예지",
    timing: "roundStart",
    description: [
      "사건 카드 덱의 윗장 2장을 미리 본다",
      "그중 1장을 이번 라운드 사건 카드로 선택",
      "남은 카드는 버린다"
    ],
    count: 2
  },
  {
    id: "empty_prayer",
    name: "닿지 않은 기도",
    timing: "anytime",
    description: [
      "아무 효과도 없다"
    ],
    count: 2
  },
  {
    id: "holy_distribution",
    name: "성스러운 분배",
    timing: "turn",
    description: [
      "플레이어 1명을 지목한다",
      "지목한 플레이어는 동화 +3",
      "나는 동화 +6"
    ],
    count: 2
  },
  {
    id: "steady_prayer",
    name: "꾸준한 기도",
    timing: "turnStart",
    description: [
      "이번 턴 동안 추가 행동 +1",
      "라운드당 1회 사용 가능"
    ],
    count: 2
  },
  {
    id: "sacred_wall",
    name: "신에게 바치는 장벽",
    timing: "turn",
    description: [
      "장원을 성채(부르크)로 즉시 업그레이드",
      "비용 없이 수행"
    ],
    count: 2
  },
  {
    id: "mission",
    name: "선교",
    timing: "turn",
    description: [
      "즉시 동화 +8을 얻는다"
    ],
    count: 2
  },
  {
    id: "confession",
    name: "고해성사",
    timing: "turn",
    description: [
      "플레이어 1명을 지목한다",
      "그 플레이어는 신앙 카드 1장을 공개한다"
    ],
    count: 2
  },
  {
    id: "heresy_voice",
    name: "이단의 목소리",
    timing: "turn",
    description: [
      "플레이어 1명을 지목한다",
      "그 플레이어는 자신의 턴 종료까지",
      "신앙 카드 사용 불가"
    ],
    count: 2
  },
  {
    id: "truce_bell",
    name: "휴전의 종",
    timing: "battleAfter",
    description: [
      "현재 진행 중인 전쟁을",
      "즉시 종전한다"
    ],
    count: 2
  }
];
