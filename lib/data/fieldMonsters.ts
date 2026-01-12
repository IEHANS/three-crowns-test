export type FieldMonster = {
  id: string;
  no: number;
  name: string;
  description: string;
  baseReward: number;
  note?: string;
};

export const FIELD_MONSTERS: FieldMonster[] = [
  {
    id: "fm_01",
    no: 1,
    name: "늑대 무리",
    description: "국경 인근 숲에서 늑대 무리가 출몰했다.",
    baseReward: 4,
    note: "초반 테스트용 몬스터",
  },
  {
    id: "fm_02",
    no: 2,
    name: "도적 떼",
    description: "무장한 도적들이 상단과 마을을 습격하고 있다.",
    baseReward: 5,
  },
  {
    id: "fm_03",
    no: 3,
    name: "산적 두목",
    description: "여러 산적을 이끄는 악명 높은 두목이 모습을 드러냈다.",
    baseReward: 6,
  },
  {
    id: "fm_04",
    no: 4,
    name: "고블린 습격대",
    description: "성채 외곽에 고블린 습격대가 집결하고 있다.",
    baseReward: 5,
  },
  {
    id: "fm_05",
    no: 5,
    name: "언데드 배회자",
    description: "버려진 전장에서 되살아난 망자들이 배회한다.",
    baseReward: 6,
  },
  {
    id: "fm_06",
    no: 6,
    name: "거대 곰",
    description: "산맥에서 내려온 거대한 곰이 농지를 파괴하고 있다.",
    baseReward: 5,
  },
  {
    id: "fm_07",
    no: 7,
    name: "트롤",
    description: "다리를 점거한 트롤이 통행을 막고 있다.",
    baseReward: 7,
  },
  {
    id: "fm_08",
    no: 8,
    name: "오우거",
    description: "마을을 위협하는 오우거가 모습을 드러냈다.",
    baseReward: 7,
  },
  {
    id: "fm_09",
    no: 9,
    name: "고대 수호수",
    description: "숲 깊은 곳에서 깨어난 고대 수호수가 영역을 침범한 자를 공격한다.",
    baseReward: 8,
  },
  {
    id: "fm_10",
    no: 10,
    name: "고룡의 사도",
    description: "고룡을 섬기는 사도가 병력을 이끌고 나타났다.",
    baseReward: 9,
    note: "강한 몬스터, 후반 또는 연출용",
  },
  {
    id: "fm_11",
    no: 11,
    name: "사막 모래벌레",
    description: "무역로 아래에서 거대한 모래벌레가 활동을 시작했다.",
    baseReward: 6,
    note: "중반 이후 압박용",
  },
  {
    id: "fm_12",
    no: 12,
    name: "빙결 늑대",
    description: "혹한의 땅에서 내려온 푸른 털의 늑대 무리.",
    baseReward: 6,
  },
  {
    id: "fm_13",
    no: 13,
    name: "저주받은 기사",
    description: "과거 전쟁에서 죽어 저주로 되살아난 기사.",
    baseReward: 7,
  },
  {
    id: "fm_14",
    no: 14,
    name: "숲의 거대 거미",
    description: "숲 깊은 곳에서 영역을 넓히는 거대한 거미.",
    baseReward: 7,
  },
  {
    id: "fm_15",
    no: 15,
    name: "화염 정령",
    description: "제어를 잃은 불의 정령이 마을을 위협한다.",
    baseReward: 8,
  },
  {
    id: "fm_16",
    no: 16,
    name: "암흑 사제단",
    description: "금지된 의식을 준비하는 수상한 사제단.",
    baseReward: 8,
    note: "스토리 연출용 몬스터",
  },
  {
    id: "fm_17",
    no: 17,
    name: "타락한 성수호자",
    description: "왕국을 지키던 수호자가 타락하여 적이 되었다.",
    baseReward: 9,
  },
  {
    id: "fm_18",
    no: 18,
    name: "고대 리치",
    description: "죽음을 다루는 고대 리치가 부활했다.",
    baseReward: 9,
    note: "후반부 고난도",
  },
  {
    id: "fm_19",
    no: 19,
    name: "심연의 추적자",
    description: "어둠 속에서 플레이어를 노리는 미지의 존재.",
    baseReward: 10,
  },
  {
    id: "fm_20",
    no: 20,
    name: "고룡의 화신",
    description: "고룡의 힘이 실체화되어 왕국을 위협한다.",
    baseReward: 12,
    note: "최종급 필드 몬스터",
  },
];
