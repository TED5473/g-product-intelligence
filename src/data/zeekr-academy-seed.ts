/**
 * 极氪学 → g-product-intelligence seed (PR-ready drop-in for src/data/)
 *
 * Captured summaries from /workspace/zeekr-knowledge (edu.zeekrlife.com).
 * NEVER invent numbers. Prefer short sourced bullets over full slide dumps.
 * SPA-Evo PPT is 保密：一级 — public seed keeps short facts only.
 *
 * Naming aligned with pm-wall.ts / product-intel.ts:
 *   sourceBadge ∈ '极氪学' | '公开口径' | '待补'
 *   series keys: "7x" | "009" | "08" | "09" | "007gt" | …
 *
 * Wire-up: see MERGE.md in this folder.
 */

export type SourceBadge = "极氪学" | "公开口径" | "待补";

export type AcademyFact = {
  id: string;
  topic: string;
  /** short bullet; no confidential slide decks */
  text: string;
  sourceBadge: SourceBadge;
  /** optional course / capture pointer */
  course?: string;
  captured?: string;
  /** related product / arch keys used in the app */
  tags?: string[];
};

export type AcademyTrap = {
  id: string;
  wrong: string;
  right: string;
  sourceBadge: SourceBadge;
  tags?: string[];
};

/** Architecture brief seed (factIds / trapIds point into academyFacts / academyTraps) */
export type ArchSeed = {
  id: string;
  name: string;
  nameZh?: string;
  oneLiner: string;
  sourceBadge: SourceBadge;
  factIds: string[];
  trapIds: string[];
};

export const ACADEMY_CAPTURED = "2026-09-03";

/** Canonical badge map (mirrors pm-wall SRC) */
export const SOURCE_BADGE = {
  ZK: "极氪学" as const,
  PUB: "公开口径" as const,
  TBD: "待补" as const,
};

// ─── SPA-Evo (JUST CAPTURED; PPT 保密一级 — short bullets only) ─────────────

export const spaEvoFacts: AcademyFact[] = [
  {
    id: "spa-evo-position",
    topic: "SPA-Evo positioning",
    text: "大型电混车专属架构 / Dedicated architecture for large electric hybrid vehicles",
    sourceBadge: "极氪学",
    course: "SPA-Evo Features and Customer Benefits (C2021503002127708160)",
    captured: "2026-09-03",
    tags: ["SPA-Evo", "SPA"],
  },
  {
    id: "spa-evo-powertrain",
    topic: "SPA-Evo powertrain",
    text: "2.0T 电混发动机 + DHT Pro（P1+P2）+ 双 P4 电机 170 kW×2",
    sourceBadge: "极氪学",
    course: "SPA-Evo video 02:32",
    captured: "2026-09-03",
    tags: ["SPA-Evo", "EM-P", "DHT"],
  },
  {
    id: "spa-evo-wb",
    topic: "SPA-Evo wheelbase",
    text: "轴距覆盖 3050–3300 mm（课件空间页）",
    sourceBadge: "极氪学",
    course: "SPA-Evo PPT s9",
    captured: "2026-09-03",
    tags: ["SPA-Evo"],
  },
  {
    id: "spa-evo-g-aes",
    topic: "SPA-Evo G-AES",
    text: "G-AES 最高 130 km/h；同页亦标 AEB max 130 km/h",
    sourceBadge: "极氪学",
    course: "SPA-Evo PPT s15/s17",
    captured: "2026-09-03",
    tags: ["SPA-Evo", "ADAS"],
  },
  {
    id: "spa-evo-brake",
    topic: "SPA-Evo braking",
    text: "100–0 km/h 制动距离 33.95 m；前四活塞固定卡钳（课件）",
    sourceBadge: "极氪学",
    course: "SPA-Evo PPT s17",
    captured: "2026-09-03",
    tags: ["SPA-Evo"],
  },
  {
    id: "spa-evo-ntp",
    topic: "SPA-Evo NTP battery safety",
    text: "NTP：电芯隔热 2.5 mm · 底板 8 mm · 双壁绝缘 60 mm（360° 多层）",
    sourceBadge: "极氪学",
    course: "SPA-Evo PPT s20",
    captured: "2026-09-03",
    tags: ["SPA-Evo", "battery"],
  },
  {
    id: "spa-evo-no-models",
    topic: "SPA-Evo models in course",
    text: "课件未点名任何量产车型名（仅轿车/SUV/MPV 大型电混细分）",
    sourceBadge: "极氪学",
    course: "SPA-Evo video + 29 slides",
    captured: "2026-09-03",
    tags: ["SPA-Evo"],
  },
  {
    id: "spa-evo-900-pub",
    topic: "Lynk 900 vs course",
    text: "公开口径：领克 900 = SPA Evo EM-P；课件本身未写 900",
    sourceBadge: "公开口径",
    captured: "2026-09-03",
    tags: ["SPA-Evo", "lynk900", "09"],
  },
  {
    id: "spa-evo-dim-1684",
    topic: "SPA-Evo dimension callout",
    text: "视频 00:32 尺寸标注 1684 mm — 宽/轮距/高未在字幕标明，勿外推",
    sourceBadge: "极氪学",
    course: "SPA-Evo video 00:32",
    captured: "2026-09-03",
    tags: ["SPA-Evo"],
  },
  {
    id: "spa-evo-seats",
    topic: "SPA-Evo L113 seats",
    text: "L113 座椅行程 120 mm；靠背 10°–155°",
    sourceBadge: "极氪学",
    course: "SPA-Evo PPT s9",
    captured: "2026-09-03",
    tags: ["SPA-Evo"],
  },
];

// ─── 800V / SEA voltage split ────────────────────────────────────────────────

export const hv800Facts: AcademyFact[] = [
  {
    id: "hv-400-models",
    topic: "400V-class models",
    text: "001 100 kWh @407 V · X 66 kWh @392 V · 009 116 kWh @398 V",
    sourceBadge: "极氪学",
    course: "800V High Voltage System",
    captured: "2026-08-27",
    tags: ["800V", "001", "x", "009", "SEA"],
  },
  {
    id: "hv-800-models",
    topic: "800V-class models",
    text: "007 / 7X：75.6 kWh @618 V（LFP）或 100.01 kWh @685 V（NCM）",
    sourceBadge: "极氪学",
    course: "800V High Voltage System",
    captured: "2026-08-27",
    tags: ["800V", "007", "7x", "SEA"],
  },
  {
    id: "hv-boost",
    topic: "Boost charging threshold",
    text: "DC 快充电压低于 818.4 V 时进入 Boost；HVCM 集成在后电机逆变器内",
    sourceBadge: "极氪学",
    course: "800V High Voltage System",
    captured: "2026-08-27",
    tags: ["800V", "7x", "007"],
  },
];

// ─── CMA ─────────────────────────────────────────────────────────────────────

export const cmaFacts: AcademyFact[] = [
  {
    id: "cma-what",
    topic: "CMA definition",
    text: "Compact Modular Architecture · CEVT 共研 · >25 模块 · ICE/HEV/PHEV/EV；极氪不在 CMA（极氪主食 SEA）",
    sourceBadge: "极氪学",
    course: "CMA History, Milestone and Customer Benefit",
    captured: "2026-08-27",
    tags: ["CMA"],
  },
  {
    id: "cma-gens",
    topic: "CMA generations",
    text: "CMA 1.0（01/XC40…）· 1.5（星越L…）· 2.0 / E-CMA（08、银河 L7 等）",
    sourceBadge: "极氪学",
    course: "CMA Mini Class",
    captured: "2026-08-27",
    tags: ["CMA", "08"],
  },
  {
    id: "cma-eea",
    topic: "CMA EEA",
    text: "GEEA 2.0 · Snapdragon 8155 · FOTA · E/E 设计寿命 10–15 年",
    sourceBadge: "极氪学",
    course: "CMA Mini Class",
    captured: "2026-08-27",
    tags: ["CMA"],
  },
];

// ─── EM-P ────────────────────────────────────────────────────────────────────

export const empFacts: AcademyFact[] = [
  {
    id: "emp-topology",
    topic: "EM-P topology",
    text: "FWD = P1+P3；AWD = P1+P3+P4；3-speed DHT Evo；BHE15 1.5T（技术专课 120 kW / 230 N·m，热效率 44.26%）",
    sourceBadge: "极氪学",
    course: "Lynk & Co EM-P Super Hybrid Tech Training",
    captured: "2026-08-27",
    tags: ["EM-P", "08", "07"],
  },
  {
    id: "emp-08-board",
    topic: "08 EM-P tech-course board",
    text: "08 技术专课：FWD 280 kW/615 N·m/6.5 s · AWD 436 kW/905 N·m/4.6 s · 包 39.6 kWh NCM · CLTC 综合 1400 km",
    sourceBadge: "极氪学",
    course: "EM-P Tech Training lesson 01",
    captured: "2026-08-27",
    tags: ["EM-P", "08"],
  },
  {
    id: "emp-cars-named",
    topic: "EM-P cars in course",
    text: "本课点名 08 EM-P、07 EM-P；900 / 06 / 09 未提（09 = 48V MHEV 另课）",
    sourceBadge: "极氪学",
    course: "EM-P Tech Training",
    captured: "2026-08-27",
    tags: ["EM-P", "08", "07", "09"],
  },
  {
    id: "emp-08-product-alt",
    topic: "08 product-course alternate numbers",
    text: "08 产品课另有：系统 257 kW/580 N·m、发动机 102 kW、EV 200 km WLTC — 与技术专课分档不同；简报优先技术专课并标注口径差异",
    sourceBadge: "极氪学",
    course: "08 Product Training vs EM-P Tech",
    captured: "2026-08-27",
    tags: ["EM-P", "08"],
  },
];

// ─── Model short facts (for wall / intel merge) ──────────────────────────────

export const modelFacts: AcademyFact[] = [
  {
    id: "7x-voltage",
    topic: "7X voltage class",
    text: "7X = 800V 级（618/685 V），勿标 900V；Boost 门槛 818.4 V",
    sourceBadge: "极氪学",
    course: "7X New Model + 800V HV",
    captured: "2026-08-27",
    tags: ["7x", "800V"],
  },
  {
    id: "7x-motors",
    topic: "7X motors",
    text: "后 PMSM 310 kW/440 N·m；AWD 前 AC 异步 165 kW/270 N·m；EEA = ZEEA 2.5；ADAS MF 12V1R L2",
    sourceBadge: "极氪学",
    course: "7X New Model Introduction",
    captured: "2026-08-27",
    tags: ["7x"],
  },
  {
    id: "009-voltage",
    topic: "009 voltage",
    text: "009 = ~400V（398 V）/ 116 kWh CTP2.0「极芯」— 不是 800V",
    sourceBadge: "极氪学",
    course: "009 Sales Training + 800V HV",
    captured: "2026-08-27",
    tags: ["009", "800V"],
  },
  {
    id: "009-power",
    topic: "009 powertrain",
    text: "AWD 450 kW/693 N·m（前 200 + 后 250）；0–100 4.5 s；WB 3205 mm；EyeQ5H L2+（无城市 NOA）",
    sourceBadge: "极氪学",
    course: "009 Sales Training",
    captured: "2026-08-27",
    tags: ["009"],
  },
  {
    id: "08-arch",
    topic: "08 architecture",
    text: "08 = CMA Evo + EM-P（PHEV），不是 SPA，不是 48V MHEV",
    sourceBadge: "极氪学",
    course: "08 Product + EM-P Tech + CMA",
    captured: "2026-08-27",
    tags: ["08", "CMA", "EM-P"],
  },
  {
    id: "09-arch",
    topic: "09 architecture",
    text: "09（本课）= SPA 48V MHEV · Drive-E 2.0TD 187 kW/350 N·m + 8AT · P0 10 kW — 不是 CMA，不是 EM-P",
    sourceBadge: "极氪学",
    course: "09 MHEV Product Training",
    captured: "2026-08-27",
    tags: ["09", "SPA"],
  },
  {
    id: "09-dims",
    topic: "09 dimensions",
    text: "09：5042×1977×1780 mm，轴距 2984 mm（尺寸级大于 08 的 4820 / WB 2848）",
    sourceBadge: "极氪学",
    course: "09 MHEV Product Training",
    captured: "2026-08-27",
    tags: ["09"],
  },
];

export const academyFacts: AcademyFact[] = [
  ...spaEvoFacts,
  ...hv800Facts,
  ...cmaFacts,
  ...empFacts,
  ...modelFacts,
];

// ─── Traps (ids referenced by archSeeds / TRAPS.md) ──────────────────────────

export const academyTraps: AcademyTrap[] = [
  {
    id: "trap-009-not-800v",
    wrong: "009 是 800V",
    right: "009 ≈400V（398 V）/ 116 kWh；800V 级是 007/7X",
    sourceBadge: "极氪学",
    tags: ["009", "800V", "7x", "007"],
  },
  {
    id: "trap-7x-not-900v",
    wrong: "7X 是 900V",
    right: "7X 系统电压 618/685 V（800V 级）；Boost 门槛 818.4 V — 勿写 900V",
    sourceBadge: "极氪学",
    tags: ["7x", "800V"],
  },
  {
    id: "trap-09-not-cma",
    wrong: "09 是 CMA / EM-P",
    right: "09（极氪学本课）= SPA 48V MHEV；CMA EM-P 代表是 08/07",
    sourceBadge: "极氪学",
    tags: ["09", "CMA", "EM-P", "SPA"],
  },
  {
    id: "trap-09-not-900",
    wrong: "09 = 900 / 同一套电混",
    right: "900 公开口径 = SPA Evo EM-P；09 = SPA 1.0 MHEV（P0+8AT）。拓扑不同",
    sourceBadge: "公开口径",
    tags: ["09", "lynk900", "SPA-Evo"],
  },
  {
    id: "trap-spa-evo-l3-l5",
    wrong: "SPA-Evo 统一标 L3–L5 自动驾驶",
    right: "同一课件内：s7/s21 写 L3/L4/L5 或 L3-L5，s25 写 L2+ — 冲突，简报须标注口径冲突，勿单选一边当事实",
    sourceBadge: "极氪学",
    tags: ["SPA-Evo", "ADAS"],
  },
  {
    id: "trap-spa-evo-66pct",
    wrong: "轴距可「延长 66%」（3050→3300）",
    right: "3050→3300 mm 算术约 +8%；「66% extension」是课件陷阱，保留为 trap 勿当规格",
    sourceBadge: "极氪学",
    tags: ["SPA-Evo"],
  },
  {
    id: "trap-spa-evo-no-names",
    wrong: "把课件动力总成直接贴到某车型名（未点名）",
    right: "SPA-Evo 课未点名量产车；公开口径可写 900=SPA Evo，但须分 badge",
    sourceBadge: "极氪学",
    tags: ["SPA-Evo", "lynk900"],
  },
  {
    id: "trap-spa-evo-not-sea-skateboard",
    wrong: "用 SEA 滑板图讲 SPA-Evo",
    right: "仅 SEA 是专电滑板课图；SPA-Evo 为大型电混滚动底盘叙事，勿复用 SEA 拆解图",
    sourceBadge: "极氪学",
    tags: ["SPA-Evo", "SEA"],
  },
  {
    id: "trap-zeekr-not-cma",
    wrong: "极氪车型挂 CMA",
    right: "极氪主食 SEA；CMA 服务领克/沃尔沃/Polestar/吉利星系列",
    sourceBadge: "极氪学",
    tags: ["CMA", "SEA"],
  },
  {
    id: "trap-08-vs-09-hybrid",
    wrong: "08 与 09 是同一种混动",
    right: "08 = CMA Evo EM-P（大电池 PHEV）；09 = SPA 48V MHEV",
    sourceBadge: "极氪学",
    tags: ["08", "09", "EM-P"],
  },
];

export const ARCH_SEEDS: ArchSeed[] = [
  {
    id: "SPA-Evo",
    name: "SPA-Evo",
    nameZh: "大型电混专属",
    oneLiner:
      "大型电混专属：2.0T + DHT Pro(P1+P2) + 170kW×2 P4；WB 3050–3300；课件未点名车型",
    sourceBadge: "极氪学",
    factIds: spaEvoFacts.map((f) => f.id),
    trapIds: [
      "trap-spa-evo-l3-l5",
      "trap-spa-evo-66pct",
      "trap-spa-evo-no-names",
      "trap-spa-evo-not-sea-skateboard",
      "trap-09-not-900",
    ],
  },
  {
    id: "SEA-HV",
    name: "SEA / 800V",
    nameZh: "浩瀚 · 电压分档",
    oneLiner: "001/X/009 ≈400V；007/7X = 800V 级（618/685 V）",
    sourceBadge: "极氪学",
    factIds: hv800Facts.map((f) => f.id),
    trapIds: ["trap-009-not-800v", "trap-7x-not-900v"],
  },
  {
    id: "CMA",
    name: "CMA",
    nameZh: "紧凑模块化",
    oneLiner: "CEVT · 极氪≠CMA · 08 属 CMA Evo / EM-P",
    sourceBadge: "极氪学",
    factIds: cmaFacts.map((f) => f.id),
    trapIds: ["trap-09-not-cma", "trap-zeekr-not-cma"],
  },
  {
    id: "EM-P",
    name: "EM-P",
    nameZh: "超级电混",
    oneLiner: "08/07 DHT Evo；≠09 MHEV；≠7X BEV",
    sourceBadge: "极氪学",
    factIds: empFacts.map((f) => f.id),
    trapIds: ["trap-08-vs-09-hybrid", "trap-09-not-cma"],
  },
];

/** One-line wall trap string (matches pm-wall archCompare.trap style) */
export const WALL_TRAP_LINE =
  "009≠800V · 7X≠900V · 09≠CMA≠EM-P · 900=SPA Evo EM-P（官网）≠09 MHEV · SPA-Evo课：L3-L5 vs L2+冲突 · 「66%」轴距延伸是陷阱 · E8=SEA≠GEA · 06=BMA≠CMA";

/** Gaps to clear / keep in pm-wall.gaps after merge */
export const SEED_GAP_UPDATES = {
  clear: ["SPA-Evo 课件页卡住，未提取"],
  add: [
    "SPA-Evo PPT 保密：一级 — 公开墙仅短 bullet，完整笔记留在私有 zeekr-knowledge/architecture/spa-evo.md",
    "SPA-Evo 课件自动驾驶 L3–L5 与 L2+ 冲突未裁决",
    "SPA-Evo 课件未点名 900；900 归属仅公开口径",
  ],
};

export const ZEEKR_ACADEMY_SEED = {
  captured: ACADEMY_CAPTURED,
  SOURCE_BADGE,
  facts: academyFacts,
  traps: academyTraps,
  archSeeds: ARCH_SEEDS,
  wallTrapLine: WALL_TRAP_LINE,
  gapUpdates: SEED_GAP_UPDATES,
  footnote: "内部培训摘录，仅供个人学习；数字以极氪学课件为准。SPA-Evo PPT 保密一级：公开种子仅为短摘要。",
};

export default ZEEKR_ACADEMY_SEED;
