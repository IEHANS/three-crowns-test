export type FamilyCard = {
  id: number;
  code: string;
  name: string;
  roleMain: string;
  roleSub?: string; // ✅ ? 하나 추가
  balance: string;
  influenceStart: number;
  influenceMax: number;
};

export const FAMILY_CARDS: FamilyCard[] = [
  {
    id: 1,
    code: "JUSTINIANUS",
    name: "유스티니아누스",
    roleMain: "내정",
    roleSub: "신앙",
    balance: "밸런스형",
    influenceStart: 10,
    influenceMax: 25
  },
  {
    id: 2,
    code: "CAROLINGIAN",
    name: "카롤루스 왕조",
    roleMain: "내정",
    roleSub: "신앙",
    balance: "왕귀형",
    influenceStart: 5,
    influenceMax: 30
  },
  {
    id: 3,
    code: "NORMAN",
    name: "노르만 왕조",
    roleMain: "전쟁",
    balance: "성장형",
    influenceStart: 5,
    influenceMax: 20
  },
  {
    id: 4,
    code: "TEMPLAR",
    name: "성전 기사단",
    roleMain: "신앙",
    roleSub: "전쟁",
    balance: "초반강세형",
    influenceStart: 15,
    influenceMax: 25
  },
  {
    id: 5,
    code: "LAGUNA",
    name: "라구나 가문",
    roleMain: "상업",
    roleSub: "외교",
    balance: "자본형",
    influenceStart: 10,
    influenceMax: 30
  },
  {
    id: 6,
    code: "HABSBURG",
    name: "합스부르크 가문",
    roleMain: "외교",
    roleSub: "첩보",
    balance: "장기설계형",
    influenceStart: 10,
    influenceMax: 30
  },
  {
    id: 7,
    code: "BLACK_PRINCE",
    name: "흑태자",
    roleMain: "전쟁",
    balance: "전쟁원툴형",
    influenceStart: 0,
    influenceMax: 15
  },
  {
    id: 8,
    code: "JOAN_OF_ARC",
    name: "잔 다르크",
    roleMain: "신앙",
    roleSub: "전쟁",
    balance: "조건형",
    influenceStart: 0,
    influenceMax: 30
  },
  {
    id: 9,
    code: "ROSE",
    name: "로즈 가문",
    roleMain: "전쟁",
    roleSub: "첩보",
    balance: "조건형",
    influenceStart: 5,
    influenceMax: 25
  },
  {
    id: 10,
    code: "OTTOMAN",
    name: "오스만 왕조",
    roleMain: "전쟁",
    roleSub: "내정",
    balance: "제국형",
    influenceStart: 10,
    influenceMax: 30
  }
];
