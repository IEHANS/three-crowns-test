// lib/game/kingdoms.ts

/* =========================
   왕국 타입
========================= */
export type KingdomType = "A" | "B" | "C";

/* =========================
   왕국 시너지 단일 효과
========================= */
export type KingdomEffect = {
  id: string;          // 내부 식별자 (엔진화 대비)
  description: string; // UI 표시용 텍스트
};

/* =========================
   가문 × 왕국 시너지 구조
========================= */
export type FamilyKingdomSynergy = {
  [familyId: number]: {
    A: KingdomEffect[];
    B: KingdomEffect[];
    C: KingdomEffect[];
  };
};

/* =========================
   가문 × 왕국 시너지 데이터
========================= */
export const FAMILY_KINGDOM_SYNERGY: FamilyKingdomSynergy = {
  // ================== FAMILY 001 : JUSTINIANUS ==================
  1: {
    A: [
      {
        id: "silver_income_plus_1",
        description: "은화 수입을 받을 때마다 추가로 1을 얻습니다."
      },
      {
        id: "first_income_plus_2",
        description: "이번 라운드 첫 은화 수입이 +2 증가합니다."
      }
    ],
    B: [
      {
        id: "ignore_damage_1_on_defense",
        description: "방어 행동을 선택하면 피해를 1 무시합니다."
      },
      {
        id: "preserve_unit_on_defeat",
        description: "전투 패배 시에도 병력 1을 보존합니다."
      }
    ],
    C: [
      {
        id: "diplomacy_bonus_silver",
        description: "외교 성공 시 은화 1을 추가로 얻습니다."
      },
      {
        id: "free_negotiation_once",
        description: "협상 행동을 무료로 1회 수행할 수 있습니다."
      }
    ]
  },

  // ================== FAMILY 002 : CAROLINGIAN ==================
  2: {
    A: [
      {
        id: "end_round_silver_plus_1",
        description: "라운드 종료 시 은화 1을 얻습니다."
      },
      {
        id: "bank_action_bonus",
        description: "은행 행동을 수행하면 은화 1을 추가로 받습니다."
      }
    ],
    B: [
      {
        id: "attack_bonus_1",
        description: "공격 전투에서 공합이 +1 증가합니다."
      },
      {
        id: "combat_stability",
        description: "전투 패배 시 병력 제거 수가 1 감소합니다."
      }
    ],
    C: [
      {
        id: "ignore_diplomacy_failure_once",
        description: "이번 라운드 외교 실패를 1회 무시합니다."
      },
      {
        id: "extra_action_after_diplomacy",
        description: "외교 행동 후 즉시 추가 행동 1회를 얻습니다."
      }
    ]
  },

  // ================== FAMILY 003 : NORMAN ==================
  3: {
    A: [
      {
        id: "plunder_bonus_silver",
        description: "전쟁 또는 약탈로 은화를 얻을 때 +1을 추가로 얻습니다."
      },
      {
        id: "war_income_boost",
        description: "전쟁 승리 후 은화 수입이 +1 증가합니다."
      }
    ],
    B: [
      {
        id: "damage_plus_1_on_attack",
        description: "공격 전투 승리 시 차이값이 +1 증가합니다."
      },
      {
        id: "siege_pressure",
        description: "공성 병기 사용 시 추가 소모 없이 효과를 적용합니다."
      }
    ],
    C: [
      {
        id: "free_diplomacy_after_conquest",
        description: "전쟁 승리 후 외교 행동을 즉시 1회 수행할 수 있습니다."
      },
      {
        id: "ignore_retaliation",
        description: "외교로 인한 즉시 반작용을 무시합니다."
      }
    ]
  },

  // ================== FAMILY 004 : TEMPLAR ==================
  4: {
    A: [
      {
        id: "faith_income_bonus",
        description: "신앙 관련 효과로 은화를 얻을 때 +1을 추가로 얻습니다."
      },
      {
        id: "round_income_plus_1",
        description: "이번 라운드 수입이 +1 증가합니다."
      }
    ],
    B: [
      {
        id: "defense_plus_1",
        description: "수비 전투 시 방합이 +1 증가합니다."
      },
      {
        id: "castle_damage_reduction",
        description: "성채가 있을 경우 전투 피해를 1 감소시킵니다."
      }
    ],
    C: [
      {
        id: "faith_diplomacy_boost",
        description: "외교 행동 시 영향력 1을 즉시 얻습니다."
      },
      {
        id: "extra_reward_choice",
        description: "외교 성공 시 보상 선택지를 하나 더 확인합니다."
      }
    ]
  },

  // ================== FAMILY 005 : LAGUNA ==================
  5: {
    A: [
      {
        id: "commerce_silver_plus_2",
        description: "상업 행동 시 은화 2를 획득합니다."
      },
      {
        id: "first_trade_bonus",
        description: "이번 라운드 첫 거래 수익이 +2 증가합니다."
      }
    ],
    B: [
      {
        id: "post_battle_silver",
        description: "전투 종료 후 은화 1을 즉시 얻습니다."
      },
      {
        id: "naval_advantage",
        description: "성채가 없는 전투에서 차이값이 +1 증가합니다."
      }
    ],
    C: [
      {
        id: "diplomacy_cost_reduction",
        description: "외교 행동 비용이 1 감소합니다."
      },
      {
        id: "diplomacy_silver_bonus",
        description: "외교 성공 시 은화 1을 추가로 얻습니다."
      }
    ]
  },

  // ================== FAMILY 006 : HABSBURG ==================
  6: {
    A: [
      {
        id: "kingdom_income_plus_1",
        description: "왕국 보너스로 받는 은화가 +1 증가합니다."
      },
      {
        id: "end_round_income",
        description: "라운드 종료 시 은화 1을 얻습니다."
      }
    ],
    B: [
      {
        id: "defense_ignore_bonus",
        description: "수비 시 상대의 추가 방어 보정을 무시합니다."
      },
      {
        id: "damage_reduction_1",
        description: "모든 전투에서 피해를 1 감소시킵니다."
      }
    ],
    C: [
      {
        id: "auto_diplomacy_success",
        description: "특정 외교 행동 1종이 자동 성공합니다."
      },
      {
        id: "free_diplomacy_choice",
        description: "외교 선택지 중 하나를 무료로 선택합니다."
      }
    ]
  },

  // ================== FAMILY 007 : BLACK PRINCE ==================
  7: {
    A: [
      {
        id: "battle_reward_plus_1",
        description: "전투 승리 시 은화 1을 추가로 얻습니다."
      },
      {
        id: "combat_income_boost",
        description: "이번 라운드 전투 보상이 +1 증가합니다."
      }
    ],
    B: [
      {
        id: "attack_power_plus_2",
        description: "공격 전투에서 공합이 +2 증가합니다."
      },
      {
        id: "reroll_advantage",
        description: "전투 결과가 불리할 경우 병력 제거를 1 줄입니다."
      }
    ],
    C: [
      {
        id: "replace_diplomacy_with_war",
        description: "외교 대신 전쟁 보상을 선택할 수 있습니다."
      },
      {
        id: "ignore_diplomacy_penalty",
        description: "외교 실패로 인한 불이익을 받지 않습니다."
      }
    ]
  },

  // ================== FAMILY 008 : JOAN OF ARC ==================
  8: {
    A: [
      {
        id: "faith_event_bonus",
        description: "신앙 관련 사건 발생 시 은화 1을 얻습니다."
      },
      {
        id: "faith_scaled_income",
        description: "이번 라운드 수입이 영향력 수치만큼 증가합니다."
      }
    ],
    B: [
      {
        id: "defense_damage_reduction_2",
        description: "수비 전투에서 피해를 2 감소시킵니다."
      },
      {
        id: "post_defeat_bonus",
        description: "전투 패배 시 다음 전투에서 공합 +1을 얻습니다."
      }
    ],
    C: [
      {
        id: "morale_recovery",
        description: "외교 행동 시 가문 트랙을 즉시 1 회복합니다."
      },
      {
        id: "unit_recovery_on_diplomacy",
        description: "외교 성공 시 병력 1기를 회복합니다."
      }
    ]
  },

  // ================== FAMILY 009 : ROSE ==================
  9: {
    A: [
      {
        id: "political_income",
        description: "정치 행동 시 은화 1을 얻습니다."
      },
      {
        id: "first_politic_discount",
        description: "이번 라운드 첫 정치 행동 비용이 1 감소합니다."
      }
    ],
    B: [
      {
        id: "civil_war_bonus",
        description: "내전 상황에서 전투 차이값이 +1 증가합니다."
      },
      {
        id: "ignore_enemy_bonus",
        description: "수비 시 상대의 추가 보너스를 무시합니다."
      }
    ],
    C: [
      {
        id: "multi_target_diplomacy",
        description: "외교 행동으로 두 명의 플레이어에게 영향을 줍니다."
      },
      {
        id: "extra_diplomacy_option",
        description: "외교 성공 시 추가 선택지를 공개합니다."
      }
    ]
  },

  // ================== FAMILY 010 : OTTOMAN ==================
  10: {
    A: [
      {
        id: "conquest_income",
        description: "정복한 지역마다 은화 1을 추가로 얻습니다."
      },
      {
        id: "post_battle_income",
        description: "전투 후 수입이 +1 증가합니다."
      }
    ],
    B: [
      {
        id: "ignore_defense_bonus",
        description: "공격 전투에서 상대의 방어 보정을 무시합니다."
      },
      {
        id: "free_unit_on_war",
        description: "전투 시작 시 병력 1기를 즉시 추가합니다."
      }
    ],
    C: [
      {
        id: "tribute_instead_of_diplomacy",
        description: "외교 대신 조공을 요구할 수 있습니다."
      },
      {
        id: "extra_demand_on_success",
        description: "외교 성공 시 상대에게 추가 요구를 할 수 있습니다."
      }
    ]
  }
};
