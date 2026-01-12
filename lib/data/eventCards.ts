export type EventCardType =
  | "일반"
  | "호재"
  | "악재"
  | "네임드 몬스터";

export type EventCard = {
  id: string;        // 🔑 덱 관리용
  no: number;        // 화면 표시용
  title: string;
  type: EventCardType;
  description: string;
};

export const EVENT_CARDS: EventCard[] = [
  // ===== 1~20 =====
  {
    id: "EVT-01",
    no: 1,
    title: "왕실 세금 재조정",
    type: "일반",
    description: "모든 플레이어는 동화 2를 낸다.",
  },
  {
    id: "EVT-02",
    no: 2,
    title: "풍년",
    type: "호재",
    description: "모든 플레이어는 동화 1을 얻는다.",
  },
  {
    id: "EVT-03",
    no: 3,
    title: "흉작",
    type: "악재",
    description:
      "다음 라운드 시작 기본 수입이 있는 플레이어는 그 수입이 1 감소한다.",
  },
  {
    id: "EVT-04",
    no: 4,
    title: "도적단 출몰",
    type: "악재",
    description: "동화가 가장 많은 플레이어는 동화 3을 잃는다.",
  },
  {
    id: "EVT-05",
    no: 5,
    title: "상단 호황",
    type: "호재",
    description:
      "상업 태그 행동을 이번 라운드에 수행하면 동화 2를 추가로 얻는다.",
  },
  {
    id: "EVT-06",
    no: 6,
    title: "왕국 축제",
    type: "호재",
    description:
      "모든 플레이어는 이번 라운드에 첫 행동을 수행할 때 동화 1을 얻는다.",
  },
  {
    id: "EVT-07",
    no: 7,
    title: "역병 확산",
    type: "악재",
    description:
      "이번 라운드 동안 모든 플레이어는 행동을 1개만 수행한다.",
  },
  {
    id: "EVT-08",
    no: 8,
    title: "국경 긴장",
    type: "일반",
    description:
      "이번 라운드에 전쟁 태그 행동을 수행하면 동화 1을 지불해야 한다.",
  },
  {
    id: "EVT-09",
    no: 9,
    title: "징집령",
    type: "일반",
    description: "이번 라운드에 징집 비용이 모두 동화 1 감소한다.",
  },
  {
    id: "EVT-10",
    no: 10,
    title: "군수 물자 부족",
    type: "악재",
    description: "이번 라운드에 징집 비용이 모두 동화 1 증가한다.",
  },

  // ===== 11~20 =====
  {
    id: "EVT-11",
    no: 11,
    title: "외교 사절단 방문",
    type: "호재",
    description: "외교 태그 행동을 수행한 플레이어는 동화 2를 얻는다.",
  },
  {
    id: "EVT-12",
    no: 12,
    title: "첩보망 혼란",
    type: "악재",
    description:
      "이번 라운드에 첩보 태그 행동 비용이 동화 2 증가한다.",
  },
  {
    id: "EVT-13",
    no: 13,
    title: "밀수 성행",
    type: "일반",
    description:
      "원하는 플레이어 한 명은 동화 2를 잃고, 다른 한 명은 동화 2를 얻는다.",
  },
  {
    id: "EVT-14",
    no: 14,
    title: "왕실 감사",
    type: "일반",
    description:
      "이번 라운드에 세금 징수 행동을 수행한 플레이어는 추가 효과를 얻지 못한다.",
  },
  {
    id: "EVT-15",
    no: 15,
    title: "광산 붕괴",
    type: "악재",
    description:
      "다음 라운드 시작 수입이 있는 플레이어는 그 수입이 1 감소한다.",
  },
  {
    id: "EVT-16",
    no: 16,
    title: "시장 개방",
    type: "호재",
    description: "이번 라운드 동안 투자 상한이 +2 증가한다.",
  },
  {
    id: "EVT-17",
    no: 17,
    title: "왕국 명령",
    type: "일반",
    description: "모든 플레이어는 동화 1을 낼 수 있다면 낸다.",
  },
  {
    id: "EVT-18",
    no: 18,
    title: "야생 몬스터 출현",
    type: "네임드 몬스터",
    description: "이번 라운드에 네임드 몬스터가 등장한다.",
  },
  {
    id: "EVT-19",
    no: 19,
    title: "고대 유적 발견",
    type: "호재",
    description:
      "몬스터 토벌에 성공한 플레이어는 동화 2를 추가로 얻는다.",
  },
  {
    id: "EVT-20",
    no: 20,
    title: "전운 고조",
    type: "일반",
    description:
      "이번 라운드 동안 전쟁 태그 행동은 행동 1개를 소모하지 않는다.",
  },

  // ===== 21~40 =====
  {
    id: "EVT-21",
    no: 21,
    title: "왕실 보조금",
    type: "호재",
    description: "모든 플레이어는 동화 2를 얻는다.",
  },
  {
    id: "EVT-22",
    no: 22,
    title: "화폐 가치 혼란",
    type: "악재",
    description: "이번 라운드 동안 모든 비용은 동화 1 증가한다.",
  },
  {
    id: "EVT-23",
    no: 23,
    title: "곡물 저장고 개방",
    type: "호재",
    description:
      "다음 라운드 시작 기본 지출이 있다면 그 지출이 1 감소한다.",
  },
  {
    id: "EVT-24",
    no: 24,
    title: "관료 부패",
    type: "악재",
    description:
      "이번 라운드에 내정 태그 행동을 수행하면 동화 2를 추가로 지불해야 한다.",
  },
  {
    id: "EVT-25",
    no: 25,
    title: "왕실 도로 정비",
    type: "일반",
    description:
      "이번 라운드 동안 외교 및 상업 태그 행동 비용이 동화 1 감소한다.",
  },
  {
    id: "EVT-26",
    no: 26,
    title: "징발 명령",
    type: "악재",
    description:
      "모든 플레이어는 동화 1을 낸다. 낼 수 없다면 징집할 수 없다.",
  },
  {
    id: "EVT-27",
    no: 27,
    title: "상인 길드 결성",
    type: "호재",
    description:
      "이번 라운드에 투자 행동을 수행하면 동화 1을 추가로 얻는다.",
  },
  {
    id: "EVT-28",
    no: 28,
    title: "항구 폐쇄",
    type: "악재",
    description:
      "이번 라운드 동안 상업 태그 행동을 수행할 수 없다.",
  },
  {
    id: "EVT-29",
    no: 29,
    title: "신앙 집회",
    type: "일반",
    description:
      "이번 라운드에 신앙 태그 행동을 수행하면 동화 1을 얻는다.",
  },
  {
    id: "EVT-30",
    no: 30,
    title: "이단 논쟁",
    type: "악재",
    description:
      "이번 라운드 동안 신앙 태그 행동 비용이 동화 2 증가한다.",
  },

  {
    id: "EVT-31",
    no: 31,
    title: "변경 요새 강화",
    type: "일반",
    description:
      "성채를 보유한 플레이어는 몬스터 토벌 보상으로 동화 1을 추가로 얻는다.",
  },
  {
    id: "EVT-32",
    no: 32,
    title: "민병대 소집",
    type: "일반",
    description:
      "이번 라운드에 첫 징집은 비용을 지불하지 않는다.",
  },
  {
    id: "EVT-33",
    no: 33,
    title: "군마 부족",
    type: "악재",
    description:
      "이번 라운드에 기사 징집 비용이 동화 1 증가한다.",
  },
  {
    id: "EVT-34",
    no: 34,
    title: "용병단 유입",
    type: "호재",
    description:
      "이번 라운드에 병력을 징집하면 병력 1개를 추가로 얻는다.",
  },
  {
    id: "EVT-35",
    no: 35,
    title: "국경 감시 강화",
    type: "일반",
    description:
      "이번 라운드 동안 전쟁 태그 행동을 수행하면 동화 1을 얻는다.",
  },
  {
    id: "EVT-36",
    no: 36,
    title: "첩보망 확장",
    type: "호재",
    description:
      "이번 라운드에 첩보 태그 행동을 처음 수행하면 비용을 지불하지 않는다.",
  },
  {
    id: "EVT-37",
    no: 37,
    title: "정보 유출",
    type: "악재",
    description:
      "이번 라운드에 첩보 태그 행동을 수행하면 동화 1을 추가로 지불해야 한다.",
  },
  {
    id: "EVT-38",
    no: 38,
    title: "야생 거대수 출현",
    type: "네임드 몬스터",
    description:
      "네임드 몬스터가 등장한다. 토벌 보상에 동화 2 추가.",
  },
  {
    id: "EVT-39",
    no: 39,
    title: "고대 무기 발견",
    type: "호재",
    description:
      "몬스터 토벌에 성공한 플레이어는 동화 3을 얻는다.",
  },
  {
    id: "EVT-40",
    no: 40,
    title: "전면 충돌 직전",
    type: "일반",
    description:
      "이번 라운드 동안 전쟁 태그 행동 1회는 행동을 소모하지 않는다.",
  },
];
