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
  {
    id: "08-sales-257",
    topic: "08 sales deck vs tech board",
    text: "销售攻防课自报系统 257 kW / 580 N·m / 0–100 6.75 s；EM-P 技术专课板为 FWD 280 / AWD 436 — 双 badge，勿单选一边当唯一对外数",
    sourceBadge: "极氪学",
    course: "08 Competitor Attack and Defense",
    captured: "2026-09-04",
    tags: ["08", "EM-P"],
  },
  {
    id: "08-sales-size",
    topic: "08 sales self figures",
    text: "销售课自报：4820×1915×1685 · WB 2848 · 双电机 AWD · 15.4″ 2.5K · 23 扬声器 HK（课件销售口径，非独立实测）",
    sourceBadge: "极氪学",
    course: "08 Competitor Attack and Defense",
    captured: "2026-09-04",
    tags: ["08"],
  },
  {
    id: "08-sales-framework",
    topic: "08 sales framework",
    text: "销售框架 Acknowledge – Compare – Elevate；竞品页对 Q5 / GLC / X3 / RX（数字为课件销售主张）",
    sourceBadge: "极氪学",
    course: "08 Competitor Attack and Defense",
    captured: "2026-09-04",
    tags: ["08"],
  },
  {
    id: "900-arch-short",
    topic: "900 architecture short",
    text: "900 EM-P = GEEA 3.0 · AWD · 3DHT Pro（P1+P2 串并联）+ 独立后 P4；SPA Evo 名牌本课待补（公开口径仍写 SPA Evo）",
    sourceBadge: "极氪学",
    course: "Lynk & Co 900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "SPA-Evo", "EM-P"],
  },
];

// ─── Lynk 900 EM-P (Service Product Introduction; captured 2026-09-04) ───────

export const lynk900Facts: AcademyFact[] = [
  {
    id: "900-eea",
    topic: "900 EEA / drive",
    text: "电气结构 GEEA 3.0 · 驱动 AWD",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "GEEA"],
  },
  {
    id: "900-topology",
    topic: "900 hybrid topology",
    text: "前混 3DHT Pro Series-Parallel（P1+P2）· 3 Speed AT；拓扑 engine→P1→C0→P2；独立后 P4（不在 3DHT 内）",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "3DHT", "EM-P"],
  },
  {
    id: "900-engine",
    topic: "900 VEP4 engine",
    text: "VEP4 2.0TD · 1969 mL · CR 10.8:1 · 254 Ps / 187 kW@5500 · 350 N·m@1800–4800 · 95#",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "VEP4"],
  },
  {
    id: "900-p1p2",
    topic: "900 3DHT Pro P1/P2",
    text: "P1 峰值 60 kW / 180 N·m（额定 30/90）；P2 峰值 123 kW / 338 N·m（额定 50/160）；三相交流永磁 · 油冷+水冷行均印",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "3DHT"],
  },
  {
    id: "900-p4",
    topic: "900 rear P4",
    text: "后 P4 独立三相 PMSM · 峰值 230 kW / 350 N·m · 最高 17,000 rpm · 电机油冷 / 控制器水冷",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "P4"],
  },
  {
    id: "900-battery",
    topic: "900 battery detail vs table",
    text: "详参 52.38 kWh NCM 1P102S · 133.8 Ah · 374 V（系统标 400 V）· 296 kg · 液冷；规格表圆整 50 kWh — 须脚注双值",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "battery"],
  },
  {
    id: "900-range-perf",
    topic: "900 NEDC range / performance",
    text: "NEDC 条件纯电 170 km · 综合 870–1000 km · 油耗 7.1 L/100km · 0–100 4.6 s（规格表）",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900"],
  },
  {
    id: "900-charge-adas",
    topic: "900 charge / ADAS",
    text: "DC 130 kW · AC 6.6 kW · V2L/V2V 6 kW · ADAS 硬件 11V5R1L",
    sourceBadge: "极氪学",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "ADAS"],
  },
  {
    id: "900-spa-evo-tbd",
    topic: "900 SPA Evo string on course",
    text: "本课 SPA Evo 名牌字符串待补（未采到确定印刷行）；公开口径 lynkco.com.cn：900 = SPA Evo EM-P — 分 badge",
    sourceBadge: "待补",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900", "SPA-Evo"],
  },
  {
    id: "900-dims-tbd",
    topic: "900 dimensions on course",
    text: "轴距 / L×W×H / 离地 / 轮胎：本课待补；公开口径尺寸 5240×1999×1810 另存",
    sourceBadge: "待补",
    course: "900 EM-P Product Introduction (Service)",
    captured: "2026-09-04",
    tags: ["lynk900"],
  },
  {
    id: "900-pub-cltc",
    topic: "900 public CLTC vs NEDC",
    text: "公开口径（lynkco）：CLTC 纯电至高 280 km · 系统至高 650 kW / 1248 N·m · 5240×1999×1810 — 与极氪学 NEDC 170 不同循环，双标勿覆写",
    sourceBadge: "公开口径",
    captured: "2026-09-04",
    tags: ["lynk900"],
  },
];


// ─── Lynk 08 Product Training (极氪学; captured 2026-09-05) ───────────────────

export const lynk08ProductFacts: AcademyFact[] = [
  {
    id: "08pt-arch",
    topic: "08 product training architecture",
    text: "CMA Evo / Co EM-P（PHEV）— 产品课确认架构族，非 SEA、非 SPA MHEV",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08", "CMA", "EM-P"],
  },
  {
    id: "08pt-ee",
    topic: "08 cabin EE",
    text: "5G；Snapdragon 8155 8-core 7nm / 8 TOPS；12GB RAM / 128GB；15.4″ 2.5K + 10.2″ 仪表；15W 无线 / 60W 有线充电",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08"],
  },
  {
    id: "08pt-dims",
    topic: "08 dimensions / aero / cargo",
    text: "4820×1915×1685 mm · WB 2848 mm · Cd 0.295；行李箱 545 L → 座椅放倒 1277 L",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08"],
  },
  {
    id: "08pt-body-safety",
    topic: "08 body / passive safety",
    text: "车身高强钢 74.94%；热成型 1300–1600 MPa；侧梁最高 2000 MPa；七气囊",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08", "safety"],
  },
  {
    id: "08pt-battery-safety",
    topic: "08 battery safety",
    text: "电池 IP68；DP1180 护板屈服 900 MPa；气凝胶 4.2 mm；碰撞高压切断 65 ms；175 项安全试验",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08", "battery", "safety"],
  },
  {
    id: "08pt-adas",
    topic: "08 ADAS",
    text: "5R10V / 116 TOPS；ACC 0–155 km/h；ICC 0–150 km/h；脱手提醒 15/30/45 s",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08", "ADAS"],
  },
  {
    id: "08pt-competitor-claims",
    topic: "08 product-training competitor-slide claims",
    text: "本课竞品页主张：前电机 350 N·m；0–100 6.5 s；WLTC 纯电至高 200 km；综合 1400+ km；综合油耗 0.9 L/100 km；23 扬声器 / 1600 W Harman Kardon — 课件销售主张，须与专课分档分源",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08",
    captured: "2026-09-05",
    tags: ["08", "EM-P"],
  },
  {
    id: "08pt-dual-badge",
    topic: "08 triple-source power dual-badge",
    text: "三源勿单选：本产品课竞品页 前350 N·m / 6.5 s / WLTC EV≤200；销售攻防课 257 kW/580 N·m/6.75 s；EM-P 技术专课板 FWD 280 kW / AWD 436 kW — 双/三 badge",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co 08 · Competitor Attack · EM-P Tech",
    captured: "2026-09-05",
    tags: ["08", "EM-P"],
  },
  {
    id: "08pt-sea-course-tbd",
    topic: "SEA architecture course gap",
    text: "采录本课同时搜 Courses 页1：未找到 SEA 架构专课 — 待补",
    sourceBadge: "待补",
    course: "Courses search (alongside 08 Product Training)",
    captured: "2026-09-05",
    tags: ["SEA"],
  },
];


// ─── Lynk NEW 01 / 01 EM-P Product Training (极氪学; captured 2026-09-05) ───

export const lynk01ProductFacts: AcademyFact[] = [
  {
    id: "01pt-identity",
    topic: "NEW 01 / 01 EM-P identity",
    text: "Lynk & Co NEW 01 / 01 = Urban Utility Compact SUV；动力 01 EM-P；课内 ≠07 / Z20 / 20 / 9X",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "EM-P", "CMA"],
  },
  {
    id: "01pt-dims",
    topic: "NEW 01 dimensions",
    text: "4545×1860×1694 mm · WB 2734 mm · 课件 golden-ratio 示数 0.605",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01"],
  },
  {
    id: "01pt-arch",
    topic: "NEW 01 architecture / chassis",
    text: "CMA（Volvo+Geely / CEVT）；模块化；前麦弗逊 / 后多连杆 · HyperPro monotube · long-stroke — 课写 CMA，勿直接标成 CMA Evo",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "CMA"],
  },
  {
    id: "01pt-powertrain",
    topic: "01 EM-P powertrain",
    text: "P1+P2 双电机 3-DHT（串并联；3 前进+倒档）；发动机 BHE15-DFZ-A00 1.5T Miller 102 kW/230 N·m · TE 38.1% · CR 14:1",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "EM-P", "DHT"],
  },
  {
    id: "01pt-motors-system",
    topic: "01 EM-P motors / system / performance",
    text: "P1 60 kW/180 N·m；P2 107 kW/338 N·m；系统 206 kW/535 N·m；0–100 7.71 s catapult / 8.2 s；80–120 4.77 s；Vmax 200 km/h",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "EM-P"],
  },
  {
    id: "01pt-battery-range",
    topic: "01 EM-P pack / charge / range",
    text: "高镍 NCM 17.72 kWh L 形中央通道包；AC 6.6 kW ≈2.8 h；WLTP 综合 >750 km；馈电油耗 5.9–6.2 L/100 km（课件）",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "battery", "EM-P"],
  },
  {
    id: "01pt-adas-cabin-safety",
    topic: "NEW 01 ADAS / cabin / brake / NCAP claim",
    text: "3R1V；Snapdragon 8155 8 TOPS · 12/128GB；10.2″ 仪表 + 15.4″ 中控；100–0 ≤35 m；课内宣称 E-NCAP/C-NCAP 2021 五星",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "ADAS", "safety"],
  },
  {
    id: "01pt-competitors",
    topic: "NEW 01 competitor slides",
    text: "竞品页：RAV4 2.5L 2023 Adventure · CX-5 Signature AWD · Model Y（benchmark）· 08 EM-P（架构对比）",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01", "08", "EM-P"],
  },
  {
    id: "01pt-vs-08-dual-badge",
    topic: "01 vs 08 EM-P dual-badge",
    text: "01≠08：系统 206 kW ≠ 08 专课 280/436；TE 38.1% ≠ 44.26%；包 17.72 ≠ 39.6 kWh；架构课标 CMA ≠ 08 的 CMA Evo 标签 — 双 badge",
    sourceBadge: "极氪学",
    course: "Product Training of Lynk & Co NEW 01 · EM-P Tech / 08 Product",
    captured: "2026-09-05",
    tags: ["01", "08", "EM-P", "CMA"],
  },
  {
    id: "01pt-video-tbd",
    topic: "NEW 01 video capture gap",
    text: "PPT 规格已摘；视频约 2:09:33 未完整观看（待补）；Exam/Evaluate 未开 — 本遍以 PPT 确认数为准",
    sourceBadge: "待补",
    course: "Product Training of Lynk & Co NEW 01",
    captured: "2026-09-05",
    tags: ["01"],
  },
];


// ─── 2026 ZEEKR X New Model (极氪学; captured 2026-09-04) ─────────────────────

export const zeekrX2026Facts: AcademyFact[] = [
  {
    id: "x2026-platform",
    topic: "2026 X platform / drive",
    text: "全系 400V；Std/Prem = RWD；Flagship = AWD",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x", "SEA"],
  },
  {
    id: "x2026-trims-table",
    topic: "2026 X trim table",
    text: "Std：61 kWh LFP · WLTC 405 · 250 kW/373 N·m · AC11 · DC230 · 0–100 5.6s｜Prem：66 NCM · WLTC 445 · 250/373 · AC11 · DC150 · 5.3s｜Flag：66 NCM · WLTC 415 · 365(250+115)/573(373+200) · AC22 · DC150 · 3.7s",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x", "battery"],
  },
  {
    id: "x2026-flag-topspeed",
    topic: "2026 X Flagship top speed",
    text: "Flagship 最高车速 190 km/h；新 61 kWh LFP 最高 DC 快充 230 kW",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x"],
  },
  {
    id: "x2026-61lfp",
    topic: "2026 X 61 kWh LFP pack",
    text: "Std only：CTP（电芯不可维修）· IPS2.0 · 体积能量密度 73% · 1P132S · 总能量 61.47 kWh · 标称 413 V · DC 10–80% 15 min · 最高快充 230 kW",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x", "battery"],
  },
  {
    id: "x2026-61-repair",
    topic: "2026 X 61 pack repairable parts",
    text: "可修：接触器、外部 HV 连接器、前辅件；既有主熔断/PSS/CVS/接触器；新增 M1 fuse",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x", "battery"],
  },
  {
    id: "x2026-eea",
    topic: "2026 X E/E features",
    text: "高压布局未变（HVCH/QDP·ODP/ACCM/前后电机/交直流口/HV 电池）；ZEEA 2.0：DPOD/PPOD 前门锁电开合 · CDSM 驱动滑动 CSD；手套箱电动（CEM）；选装便携冰箱（LHD）；中控 50 W 风冷无线充",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x", "ZEEA"],
  },
  {
    id: "x2026-csd",
    topic: "2026 X sliding CSD",
    text: "滑动中控屏：电机化驾驶员↔副驾；防夹；导轨+滑动电机+CDSM+DHU+DHU LIN2",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x"],
  },
  {
    id: "x2026-trim-colors",
    topic: "2026 X exterior / interior",
    text: "哑光卡其绿；更多轮圈；内饰 Full Black / Black-White / Black-Orange；一体中控+卷帘储物+托盘+双杯架+X 铬标",
    sourceBadge: "极氪学",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x"],
  },
  {
    id: "x2026-pack-crosslink",
    topic: "X pack cross-link (do not collapse)",
    text: "本课 Std：61/61.47 kWh LFP @413 V nom｜本课 Prem/Flag：66 kWh NCM（本课电压待补）｜800V 课电压表 X：66 kWh @392 V｜旧 BE13-B Std：~49.6 kWh LFP 1P120S @380.6 V — 四源勿合并",
    sourceBadge: "极氪学",
    course: "2026 X New Model + 800V HV + BE13-B",
    captured: "2026-09-04",
    tags: ["x", "battery", "800V", "BE13-B"],
  },
  {
    id: "x2026-gaps",
    topic: "2026 X course gaps",
    text: "Quiz/exam 未做；Prem/Flag NCM 电芯详参 beyond「NCM」待补",
    sourceBadge: "待补",
    course: "2026 ZEEKR X New Model Introduction",
    captured: "2026-09-04",
    tags: ["x"],
  },
];

// ─── Thermal Control (极氪学 Thermal Control System Introduction) ────────────

export const thermalFacts: AcademyFact[] = [
  {
    id: "thermal-loops",
    topic: "Thermal control loops",
    text: "回路阀件：BCV（Battery Circuit Four-way）· BEXV · CEXV · EEXV；另有 PUMP-M/H、SOV1–3、Compressor、温压传感器",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction",
    captured: "2026-09-04",
    tags: ["thermal", "001", "x", "SEA"],
  },
  {
    id: "thermal-mode5",
    topic: "HV thermal mode 5",
    text: "Mode 5：电机冷却小循环（heat self-balancing）；电池冷却回路与乘员舱冷却回路并联，经 PTC 为电池与乘员舱加热",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction ~20:00",
    captured: "2026-09-04",
    tags: ["thermal"],
  },
  {
    id: "thermal-mode11",
    topic: "HV thermal mode 11",
    text: "Mode 11：四通阀切换，电机循环与电池循环串联；A/C 制冷系统与电机散热器共同冷却电机与电池",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction ~25:00",
    captured: "2026-09-04",
    tags: ["thermal"],
  },
  {
    id: "thermal-hp-4proc",
    topic: "Heat-pump heating 4 processes",
    text: "热泵制热工作原理四过程：Compression · Condensation and exothermic · Throttle expansion · Evaporation endothermic",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction ~30:00",
    captured: "2026-09-04",
    tags: ["thermal", "heat-pump"],
  },
  {
    id: "thermal-x-diagram",
    topic: "ZEEKR X control diagram",
    text: "X 控制图：VCU · ACCM · HVCH · BCV · BCTV · AGM（另 EEXV/BEXV/CEXV、散热水泵/电磁阀等）",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction ~40:00",
    captured: "2026-09-04",
    tags: ["thermal", "x"],
  },
  {
    id: "thermal-001-diagram",
    topic: "ZEEKR 001 control diagram",
    text: "001 控制图：双 ECM；输入冷却液/电池冷却液温传；输出 Battery Cooling Fan（MF02）· SOV1–3 · CPSR",
    sourceBadge: "极氪学",
    course: "Thermal Control System Introduction",
    captured: "2026-09-04",
    tags: ["thermal", "001"],
  },
  {
    id: "thermal-hp-no-perm",
    topic: "Heat Pump course permission",
    text: "《ZEEKR Heat Pump System Introduction》专课无学习权限（本账号 blocked）；勿编造 COP/kW",
    sourceBadge: "待补",
    course: "ZEEKR Heat Pump System Introduction",
    captured: "2026-09-04",
    tags: ["thermal", "heat-pump"],
  },
  {
    id: "thermal-setpoints-tbd",
    topic: "Thermal numeric setpoints",
    text: "除 HVCH 7kW（见高压件课）外，多数 kW/流量/°C 设定点待补；车型差异页无数值热参",
    sourceBadge: "待补",
    course: "Thermal Control System Introduction",
    captured: "2026-09-04",
    tags: ["thermal"],
  },
];

// ─── High Voltage Parts (极氪学 High Voltage Parts Introduction) ─────────────

export const hvPartsFacts: AcademyFact[] = [
  {
    id: "hvparts-x-layout",
    topic: "ZEEKR X HV layout",
    text: "X 高压布置：HV Battery · HVCH · ODP · ACCM · 前驱电机 · 后驱电机（充电口等标签部分遮挡待补）",
    sourceBadge: "极氪学",
    course: "High Voltage Parts Introduction Part1",
    captured: "2026-09-04",
    tags: ["hv-parts", "x", "SEA"],
  },
  {
    id: "hvparts-hvch-7kw",
    topic: "HVCH rating",
    text: "HVCH（High Voltage Coolant Heater）示意图标注 7 kW",
    sourceBadge: "极氪学",
    course: "High Voltage Parts Introduction Part3",
    captured: "2026-09-04",
    tags: ["hv-parts", "thermal", "x"],
  },
  {
    id: "hvparts-odp-cdd",
    topic: "ODP ECU name",
    text: "ODP 的 ECU 名称 = CDD",
    sourceBadge: "极氪学",
    course: "High Voltage Parts Introduction Part3",
    captured: "2026-09-04",
    tags: ["hv-parts", "x"],
  },
  {
    id: "hvparts-soc-soh",
    topic: "SOC / SOH",
    text: "概念：State of Charge（SOC）· State of Health（SOH）",
    sourceBadge: "极氪学",
    course: "High Voltage Parts Introduction Part1",
    captured: "2026-09-04",
    tags: ["hv-parts", "battery"],
  },
  {
    id: "hvparts-numeric-tbd",
    topic: "HV parts numeric gaps",
    text: "除 HVCH 7kW 外多数 V/A/°C 额定待补（Part2 深参中断）",
    sourceBadge: "待补",
    course: "High Voltage Parts Introduction",
    captured: "2026-09-04",
    tags: ["hv-parts"],
  },
];


// ─── Charging Control (极氪学 Charging Control Introduction) ─────────────────

export const chargingFacts: AcademyFact[] = [
  {
    id: "charge-modes",
    topic: "Charging modes",
    text: "AC：电网 AC → OBC → HV 电池；DC：EVSE DC → DC 接触器 → HV 电池（OBC 不在功率路径）；DCDC：HV → LV 车载低压",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "OBC", "SEA"],
  },
  {
    id: "charge-dc-seq",
    topic: "DC / CCS2 sequence",
    text: "EVSE↔EV 经 CP/PLC；PP、PE、锁监控。顺序：枪锁 → PLC → isolation check → pre-charge → DC 接触器（隔离/电压 OK 条件）",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "CCS2"],
  },
  {
    id: "charge-ccs2-pwm",
    topic: "CCS2 CP PWM duty",
    text: "CP PWM：<3% 禁止；3–<7% 需数字通信（5%=数字通信）；7–<8% 禁止；8–<10%=6A；10–85%→duty×0.6A；>86–96%→(duty−64)×2.5A；>96–97%=80A；>97% 禁止",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "CCS2"],
  },
  {
    id: "charge-pins",
    topic: "Charge port pin labels",
    text: "GB/T DC：S−, CC2, S+, CC1, DC−, DC+, A−, PE, A+；CCS2：PP, CP, PE, N, L1, L2, L3, DC−, DC+（课件 DC−/DC+ 极性标注或有不一致，按所示引用）",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "CCS2", "GB/T"],
  },
  {
    id: "charge-schematics",
    topic: "Charging schematic sets",
    text: "示意 A：001 / X / 009 RHD；示意 B：7X — 800V ODP · HV battery/BECM · PCMU · CAN-H/CAN-L · 充电口",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "001", "x", "009", "7x"],
  },
  {
    id: "charge-gun-lock",
    topic: "Charge-gun lock pins",
    text: "枪锁针脚：1 motor+ · 2 motor− · 3 status",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging"],
  },
  {
    id: "charge-cable-temp",
    topic: "Cable temperature routing",
    text: "001/X/009：AC 线缆温 → CDD；DC 线缆温 → BECM｜7X：AC/DC 线缆温 → PCMU",
    sourceBadge: "极氪学",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "CDD", "PCMU", "7x"],
  },
  {
    id: "charge-crosslink",
    topic: "Charging cross-links / gaps",
    text: "交叉：ODP ECU=CDD（高压件课）；800V Boost 充电模式见 007/7X。本课 Boost vs Direct / max kW 表待补",
    sourceBadge: "待补",
    course: "Charging Control Introduction",
    captured: "2026-09-04",
    tags: ["charging", "800V", "7x", "007"],
  },
];

// ─── Electric Drive (极氪学 Electric Drive System Introduction) ──────────────

export const electricDriveFacts: AcademyFact[] = [
  {
    id: "edrive-path",
    topic: "Electric drive power path",
    text: "功率路径：HV 电池 → inverter → motor controller → drive motor assembly",
    sourceBadge: "极氪学",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive", "SEA"],
  },
  {
    id: "edrive-inverter",
    topic: "Inverter PWM",
    text: "逆变器：H-bridge PWM 生成三相交流正弦；电平 +Vd / 0 / −Vd；时序 Ton/Toff",
    sourceBadge: "极氪学",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive", "inverter"],
  },
  {
    id: "edrive-motors",
    topic: "Motor types (principle)",
    text: "覆盖 PMSM 与感应电机结构（原理级）；本提取无车型峰值 kW/N·m 表",
    sourceBadge: "极氪学",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive", "PMSM"],
  },
  {
    id: "edrive-resolver",
    topic: "Resolver / position",
    text: "旋变：励磁 + SIN/COS 绕组；转子位示意 0°/90°/180°/270°；线束 EXC± · SIN± · COS±",
    sourceBadge: "极氪学",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive", "resolver"],
  },
  {
    id: "edrive-oil-pump",
    topic: "Cooling / oil pump wiring",
    text: "温度传感 + 冷却；油泵线束 BAT+ · LIN · BAT−",
    sourceBadge: "极氪学",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive", "cooling"],
  },
  {
    id: "edrive-gaps",
    topic: "Electric drive course gaps",
    text: "分车峰值功率/扭矩待补（用车型课 / 800V / X / 7X）；Lesson Exam 未做；UI Studied ~62%",
    sourceBadge: "待补",
    course: "Electric Drive System Introduction",
    captured: "2026-09-04",
    tags: ["electric-drive"],
  },
];


// ─── ODP Introduction (极氪学 ODP Introduction) ──────────────────────────────

export const odpFacts: AcademyFact[] = [
  {
    id: "odp-what",
    topic: "ODP definition",
    text: "集成电源总成：PDU + DC/DC + OBC；课件标签「OBC+DC/DC+PDU (CDD)」；交叉：高压件课 ODP ECU=CDD",
    sourceBadge: "极氪学",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP", "CDD", "SEA"],
  },
  {
    id: "odp-obc",
    topic: "OBC path",
    text: "OBC：充电桩 AC → DC 给 HV 电池；链路 Grid → Filter → PFC → DCDC (primary) → DCDC (secondary) → Filter → HV Battery",
    sourceBadge: "极氪学",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP", "OBC"],
  },
  {
    id: "odp-dcdc",
    topic: "DC/DC path",
    text: "DC/DC：HV 电池 → LV 给 12V 电池；电路 EMI filter → Q1–Q4 DC→AC → HF transformer → D1–D4 rectifier → LC filter；控制含 pre-charge、EMC、chopper、sampling、comms、gate driver",
    sourceBadge: "极氪学",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP", "DCDC"],
  },
  {
    id: "odp-pdu",
    topic: "PDU interfaces",
    text: "PDU 接口：HV battery / BDU / BECM；充电 EV1 AC / EV1 DC；驱动 MGM/EFAD 与 IEM/ERAD；热/充模块 ACCM、HVCH、HVAH；12V 经 MDB",
    sourceBadge: "极氪学",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP", "PDU"],
  },
  {
    id: "odp-layouts",
    topic: "ODP model layouts",
    text: "001/X：DCDC + OBC（独立 MGM/EFAD & IEM/ERAD）｜009 RHD：HVCM + OBC（含 HVAH + LV battery）｜7X：22 kW ODP；HVCM + OBC（EFAD/MGM、HVCH、ACCM、ERAD、BECM）",
    sourceBadge: "极氪学",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP", "001", "x", "009", "7x"],
  },
  {
    id: "odp-gaps",
    topic: "ODP course gaps",
    text: "Lesson Exam 未做；UI ~52%；除 7X 22 kW ODP 外其他 kW 额定待补",
    sourceBadge: "待补",
    course: "ODP Introduction",
    captured: "2026-09-04",
    tags: ["ODP"],
  },
];



// ─── BECM Control (极氪学 BECM Control Introduction) ─────────────────────────

export const becmFacts: AcademyFact[] = [
  {
    id: "becm-ntc",
    topic: "Battery module NTC (X)",
    text: "ZEEKR X：NTC1–NTC20 = 20 个电池模组温度传感器",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "x", "battery"],
  },
  {
    id: "becm-hvil-types",
    topic: "HVIL interlock types",
    text: "HVIL = Hardware Interlock + Software Interlock；故障判据：HV 连接器后端母线电压低于总电池电压的 80%",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL"],
  },
  {
    id: "becm-hvil-voltage",
    topic: "Voltage-type HVIL",
    text: "电压型 HVIL：MCU SAK-TC275 · HVILX_IN/OUT · supply · divider · enable · sampling · GND",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL"],
  },
  {
    id: "becm-hvil-current",
    topic: "Current-type HVIL",
    text: "电流型 HVIL：current source · D · R3 · R7 · R4 · C · HVIL loop；示意方：HVIL1/2/3 · HVIL IN/OUT · HV/LV connectors · CDD · HVCH · ACCM · LV service switch · BECM/PCMU",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL"],
  },
  {
    id: "becm-layout-001x",
    topic: "001/X HVIL layout",
    text: "001/X：EFAD(MGM/EM/TM) · ERAD(IEM/EM/TM) · ODP(ACCM/HVCH/DCDC/OBC) · HV BATT/BDU/BECM · HVIL2 · LV MSD · LV battery · collision · EVI AC/DC；线径标注 50/4/6/95 mm²",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL", "001", "x"],
  },
  {
    id: "becm-layout-009",
    topic: "009 RHD HVIL layout",
    text: "009 RHD：EFAD · ACCM · HVCH Front · HVAH Rear · ODP/HVCM/OBC · HV BATT/BDU/BECM · ERAD/IEM · LV MSD · EVI AC/DC；线径标注 50/35/4/3/6 mm²",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL", "009"],
  },
  {
    id: "becm-layout-7x",
    topic: "7X HVIL / HV layout",
    text: "7X：PCMU HVIL2 A52/A53；LV service switch A1–A4；High–Low Voltage Charging System Assembly；Power Battery/BECM；ERAD；HVIL3/4；ODP；EFAD/MGM；HVCH；ACCM；EVI AC/DC",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "HVIL", "7x"],
  },
  {
    id: "becm-isolation",
    topic: "Isolation monitoring",
    text: "隔离监测：HV 与底盘/LV（battery ground、shunt、connector、motor/charger/DCDC→12V、接触器）；Rp=HV+→chassis · Rn=HV−→chassis；监测网 R1–R5 · K1–K3 · Vp/Vn · VBUS± · VADC · MCU · 5V（K1/K2 切换 + R5 分压）",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "isolation"],
  },
  {
    id: "becm-isolation-fault",
    topic: "Isolation fault example",
    text: "故障例（课件印）：电池 400 V · 中点 200 V · battery ground 0 V；200→0 短路 → 底盘 200 V · 车机侧 212 V",
    sourceBadge: "极氪学",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM", "isolation"],
  },
  {
    id: "becm-gaps",
    topic: "BECM course gaps",
    text: "温传感前更早 BECM 章节本遍未全转录；Launch Lesson Exam 未做；UI ~45%",
    sourceBadge: "待补",
    course: "BECM Control Introduction",
    captured: "2026-09-04",
    tags: ["BECM"],
  },
];


// ─── ZEEKR 007GT Product Introduction (极氪学; captured 2026-09-05) ──────────

export const zeekr007gtFacts: AcademyFact[] = [
  {
    id: "007gt-platform",
    topic: "007GT platform / EEA / ADAS",
    text: "Long Range 示于 800V 平台；电气架构 ZEEA 2.5；ADAS 硬件 7V3R",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction",
    captured: "2026-09-05",
    tags: ["007gt", "800V", "ZEEA", "ADAS", "SEA"],
  },
  {
    id: "007gt-battery-range",
    topic: "007GT battery / WLTC range",
    text: "Std：75 kWh LFP / 519 km WLTC｜Long Range：100 kWh NCM / 655 km｜Performance：100 kWh NCM / 558 km",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction",
    captured: "2026-09-05",
    tags: ["007gt", "battery"],
  },
  {
    id: "007gt-motors-rwd",
    topic: "007GT Std / Long Range motors",
    text: "Std / Long Range：后 NDE34（以色列名 NDE31）峰值 335 kW / 520 N·m",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction",
    captured: "2026-09-05",
    tags: ["007gt", "motor"],
  },
  {
    id: "007gt-motors-awd",
    topic: "007GT Performance AWD motors",
    text: "Performance：前 NDE16 感应 + 后 NDE34 PMSM；峰值 500 kW（335+165）/ 790 N·m（520+270）",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction",
    captured: "2026-09-05",
    tags: ["007gt", "motor", "AWD"],
  },
  {
    id: "007gt-dims",
    topic: "007GT dimensions",
    text: "L 4864 mm · W 1900 mm · H 1460 / 1445 mm · WB 2925 mm",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction",
    captured: "2026-09-05",
    tags: ["007gt"],
  },
  {
    id: "007gt-pack-dual-badge",
    topic: "007GT pack dual-badge vs 800V course",
    text: "本课 WLTC 表 75/100 kWh；800V 课 007/7X 包电压 618/685 V — 双 badge，勿与本课续航表合并成单一行",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction · 800V HV",
    captured: "2026-09-05",
    tags: ["007gt", "007", "7x", "800V"],
  },
  {
    id: "007gt-vs-7x-power",
    topic: "007GT vs 7X peak power cross-link",
    text: "7X 销售课 AWD 475 kW / 710 N·m 是另一车型；勿与 007GT Performance 500/790 混报",
    sourceBadge: "极氪学",
    course: "ZEEKR 007GT Product Introduction · 7X New Model",
    captured: "2026-09-05",
    tags: ["007gt", "7x"],
  },
  {
    id: "007-non-gt-course-tbd",
    topic: "007 non-GT product course gap",
    text: "搜 Courses「007」（2026-09-05）仅返回 007GT Product Introduction — 非 GT 007 产品专课待补；共享参数用 800V/007GT，勿编轿车独有数",
    sourceBadge: "待补",
    course: "Courses search 007 (alongside 007GT Product Introduction)",
    captured: "2026-09-05",
    tags: ["007", "007gt"],
  },
  {
    id: "8x-course-tbd",
    topic: "8X product course gap",
    text: "Courses search「8X」/「ZEEKR 8」（2026-09-05）页1：无 8X 产品/新车型/销讲专课 — 待补",
    sourceBadge: "待补",
    course: "Courses search 8X / ZEEKR 8",
    captured: "2026-09-05",
    tags: ["8x"],
  },
  {
    id: "9x-course-tbd",
    topic: "9X product course gap",
    text: "Courses search「9X」/「ZEEKR 9」（2026-09-05）页1：无 9X 产品专课；命中 NX21-A2 / 7X / 009 等勿假定=9X — 待补",
    sourceBadge: "待补",
    course: "Courses search 9X / ZEEKR 9",
    captured: "2026-09-05",
    tags: ["9x"],
  },
];


// ─── ZEEKR 009 Sales Training (极氪学; captured 2026-09-05) ─────────────────

export const zeekr009SalesFacts: AcademyFact[] = [
  {
    id: "009-sales-position",
    topic: "009 Sales positioning / deliveries",
    text: "首款真正为电而生的 MPV；2025 交付 53,000；月销 1000–1500 持续约 3 年；50 万+ MPV 销量第一（课件主张）",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009"],
  },
  {
    id: "009-sales-dynamics",
    topic: "009 Sales dynamics",
    text: "0–100 4.5 s；100–0 36.9 m；电机峰值 450 kW",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009", "motor"],
  },
  {
    id: "009-sales-xpin-gearbox",
    topic: "009 X-pin motor / gearbox",
    text: "X-pin 电机效率 +9.5% · 体积 −24%；变速箱效率 96.7%→97.7%；齿轮箱输出 250 kW / 373 N·m",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009", "motor"],
  },
  {
    id: "009-sales-chassis",
    topic: "009 chassis / control",
    text: "dTCS 6 ms（约为常规 TCS 的 10×）；双腔空气悬架 55 mm；CCD 5×；转弯直径 6.2 m；侧向滑移角 0.84°",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009", "chassis"],
  },
  {
    id: "009-sales-lightning-switch",
    topic: "009 Lightning Switch",
    text: "Lightning Switch：2WD 续航主张 +38–45 km；AWD 切换 0.4 s",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009", "AWD"],
  },
  {
    id: "009-sales-competitors",
    topic: "009 sales competitors (displayed)",
    text: "竞品页点名：问界 M9 / 腾势 D9 / 小鹏 X9 / GL8 / MEGA；课件展示销量 16462 / 10158 / 6374 / 1625 / 644（统计周期课件未标明）",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009"],
  },
  {
    id: "009-sales-gaps",
    topic: "009 Sales gaps this capture",
    text: "本遍销讲：尺寸 / 电池包 kWh / 额定续航 待补 — 勿发明，亦勿从 800V 课贴包/续航",
    sourceBadge: "待补",
    course: "ZEEKR 009 Sales Training",
    captured: "2026-09-05",
    tags: ["009", "800V"],
  },
  {
    id: "009-sales-not-800v",
    topic: "009 ≠ 800V pack/range trap reminder",
    text: "009 ≠ 800V；本课未给 pack/rated range — 勿把 800V 课包/续航外推到本遍销讲",
    sourceBadge: "极氪学",
    course: "ZEEKR 009 Sales Training · 800V HV",
    captured: "2026-09-05",
    tags: ["009", "800V"],
  },
];



// ─── Network Structure Introduction Lynk (极氪学; captured 2026-09-05) ───────

export const networkStructureLynkFacts: AcademyFact[] = [
  {
    id: "net-geea-gens",
    topic: "GEEA generations",
    text: "GEEA = Geely / Lynk & Co 面向智能与新能源的电子电气架构；代际：GEEA 2.0、2.5、3.0",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "lynk900", "08"],
  },
  {
    id: "net-bus-types",
    topic: "In-vehicle networks covered",
    text: "课内网络：LIN · CAN / CAN FD · FlexRay · Ethernet · LVDS",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "lynk900", "08"],
  },
  {
    id: "net-flexray",
    topic: "FlexRay payload / bit time",
    text: "FlexRay payload 0–127 words（0–254 bytes）；1 bit = 100 ns @ 10 Mbit/s",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "FlexRay"],
  },
  {
    id: "net-ethernet",
    topic: "Ethernet 100BASE-T1 / AD+display",
    text: "Ethernet 100BASE-T1（双绞）；100M / 1G 用于自动驾驶与显示单元等",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "Ethernet", "ADAS"],
  },
  {
    id: "net-lvds",
    topic: "LVDS electrical",
    text: "LVDS：摆幅 350 mV · 电流源 3.5 mA · 端接 100 Ω",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "LVDS"],
  },
  {
    id: "net-gateway-topo",
    topic: "Gateway / topology diagrams",
    text: "Gateway：CAN↔FlexRay；拓扑含 ADCU、DHU、ECM；含 900 与 08 EM-P 网络拓扑图（细节以原课图为准）",
    sourceBadge: "极氪学",
    course: "Network Structure Introduction (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["GEEA", "network", "lynk900", "08"],
  },
];


// ─── ADAS Basic Lynk (极氪学; captured 2026-09-05) ───────────────────────────

export const adasBasicLynkFacts: AcademyFact[] = [
  {
    id: "adas-lynk-flow",
    topic: "ADAS Basic flow",
    text: "Perception（camera / 毫米波 / 超声波）→ Decision（controllers）→ Execution（reminder / 电子制动 / 电子转向）",
    sourceBadge: "极氪学",
    course: "Intelligent Driving Assistance System Introduction_Basic (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["ADAS", "08", "lynk900"],
  },
  {
    id: "adas-lynk-08-5r1v",
    topic: "08 EM-P ADAS Basic hardware",
    text: "08 EM-P：5R1V（本课未给 TOPS）；含前后角雷达、前向雷达、FLC 等 — 勿与产品课 5R10V/116 TOPS 合并",
    sourceBadge: "极氪学",
    course: "Intelligent Driving Assistance System Introduction_Basic (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["ADAS", "08"],
  },
  {
    id: "adas-lynk-900-lidar",
    topic: "900 ADAS Basic hardware",
    text: "900：5R11V1V/L 含 LiDAR；超声波 6F+6R；100M/1G Ethernet · Safety CANFD；本课未显示 TOPS / GEEA",
    sourceBadge: "极氪学",
    course: "Intelligent Driving Assistance System Introduction_Basic (Lynk & Co)",
    captured: "2026-09-05",
    tags: ["ADAS", "lynk900"],
  },
];


// ─── Electric Door Working Principle (极氪学; captured 2026-09-05) ───────────

export const electricDoorFacts: AcademyFact[] = [
  {
    id: "edoor-x-private-can",
    topic: "ZEEKR X electric door buses",
    text: "ZEEKR X：DPOD/PPOD — Private CAN — DDRM/PDRM；另有 Body Exposed CAN；TCAM（Telematics & Connectivity Antenna Module）",
    sourceBadge: "极氪学",
    course: "Electric Door Working Principle",
    captured: "2026-09-05",
    tags: ["x", "door", "ZEEA"],
  },
];


// ─── Electric Control Working Principle (极氪学; captured 2026-09-05) ───────

export const electricControlFacts: AcademyFact[] = [
  {
    id: "ectl-pwm",
    topic: "PWM output",
    text: "PWM：Vout = Vmax × duty（课内例 5 V × 50% = 2.5 V）",
    sourceBadge: "极氪学",
    course: "Electric Control Working Principle",
    captured: "2026-09-05",
    tags: ["electric-control"],
  },
  {
    id: "ectl-sent-psi5",
    topic: "SENT / PSI5",
    text: "SENT：Single Edge Nibble Transmission；PSI5：两线电流接口（ECU microcontroller + receiver ASIC）",
    sourceBadge: "极氪学",
    course: "Electric Control Working Principle",
    captured: "2026-09-05",
    tags: ["electric-control"],
  },
  {
    id: "ectl-ntc-chain",
    topic: "NTC / sensor→ECU→actuator",
    text: "NTC：温度升高→电阻下降；链路 Sensor signal → ECU → actuator control",
    sourceBadge: "极氪学",
    course: "Electric Control Working Principle",
    captured: "2026-09-05",
    tags: ["electric-control"],
  },
];

export const academyFacts: AcademyFact[] = [
  ...spaEvoFacts,
  ...hv800Facts,
  ...cmaFacts,
  ...empFacts,
  ...modelFacts,
  ...lynk900Facts,
  ...lynk08ProductFacts,
  ...lynk01ProductFacts,
  ...zeekrX2026Facts,
  ...thermalFacts,
  ...hvPartsFacts,
  ...chargingFacts,
  ...electricDriveFacts,
  ...odpFacts,
  ...becmFacts,
  ...zeekr007gtFacts,
  ...zeekr009SalesFacts,
  ...networkStructureLynkFacts,
  ...adasBasicLynkFacts,
  ...electricDoorFacts,
  ...electricControlFacts,
];

// ─── Traps (ids referenced by archSeeds / TRAPS.md) ──────────────────────────

export const academyTraps: AcademyTrap[] = [
  {
    id: "trap-009-not-800v",
    wrong: "009 是 800V / 把 800V 课包或续航直接贴到 009 销讲",
    right: "009 ≠ 800V；800V 级是 007/7X。本遍 009 Sales（2026-09-05）dims / pack kWh / rated range 待补 — 勿从 800V 课贴包/续航；历史 398 V·116 kWh 等须分 badge",
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
    right: "900 EM-P（极氪学）= HV NCM + NEDC EV 170 + 3DHT Pro(P1+P2) + 独立 P4；09 = SPA 48V MHEV P0+8AT。公开口径另写 900=SPA Evo — 拓扑不同勿混",
    sourceBadge: "极氪学",
    tags: ["09", "lynk900", "SPA-Evo"],
  },
  {
    id: "trap-900-p4-not-in-3dht",
    wrong: "P4 在 3DHT Pro 里面",
    right: "3DHT Pro = 前桥 P1+P2 串并联；P4 是独立后电机（峰值 230 kW / 350 N·m）",
    sourceBadge: "极氪学",
    tags: ["lynk900", "3DHT", "P4"],
  },
  {
    id: "trap-900-50-vs-5238",
    wrong: "只报 50 kWh 或只报 52.38 kWh 当唯一值",
    right: "规格表圆整 50 kWh；详参 52.38 kWh NCM 1P102S — 简报须脚注双值",
    sourceBadge: "极氪学",
    tags: ["lynk900", "battery"],
  },
  {
    id: "trap-900-nedc-vs-cltc",
    wrong: "用 CLTC 280 覆盖 NEDC 170（或反之）当同一数字",
    right: "极氪学规格表 NEDC EV 170；公开口径 CLTC 纯电至高 280 — 不同循环，双 badge",
    sourceBadge: "极氪学",
    tags: ["lynk900"],
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
  {
    id: "trap-08-257-vs-280-436",
    wrong: "对外只报 257 kW（或只报 280/436，或只报产品课竞品页 350 N·m/6.5 s）当唯一功率口径",
    right: "三源分 badge：产品课竞品页 前350 N·m/6.5 s/WLTC EV≤200；销售攻防 257 kW/580 N·m/6.75 s；技术专课 FWD 280 / AWD 436 — 简报须分源，勿单选",
    sourceBadge: "极氪学",
    tags: ["08", "EM-P"],
  },
  {
    id: "trap-x-pack-collapse",
    wrong: "把 X Std 只报一个包（49.6 / 61 / 66 任选其一当唯一）",
    right: "2026 课 Std=61/61.47 LFP @413V（CTP IPS2.0 1P132S）；旧 BE13-B Std≈49.6 LFP 1P120S @380.6V；Prem/Flag=66 NCM；800V 课表 X 66@392V — 双/多 badge 勿覆写",
    sourceBadge: "极氪学",
    tags: ["x", "battery", "BE13-B"],
  },
  {
    id: "trap-x-66-voltage",
    wrong: "本课 66 NCM 直接写成 392 V（或把 413 V 套到 Prem/Flag）",
    right: "413 V 是 61 LFP Std 标称；Prem/Flag 66 NCM 电压本课待补；392 V 来自 800V 课电压表（X 66 kWh）— 分源标注",
    sourceBadge: "极氪学",
    tags: ["x", "800V"],
  },
  {
    id: "trap-007gt-pack-vs-800v-table",
    wrong: "把 007GT 课 WLTC 75/100 与 800V 课 618/685V 合成一行唯一口径",
    right: "续航/化学看 007GT 产品课 WLTC 表；包电压看 800V 课 007/7X 618/685 V — 双 badge",
    sourceBadge: "极氪学",
    tags: ["007gt", "007", "7x", "800V"],
  },
  {
    id: "trap-007gt-vs-7x-awd-peak",
    wrong: "007GT Performance 与 7X AWD 共用 475/710 或 500/790 当同一数",
    right: "7X AWD 销售口径 475 kW / 710 N·m；007GT Performance 500 kW（335+165）/ 790 N·m（520+270）— 分车分 badge",
    sourceBadge: "极氪学",
    tags: ["007gt", "7x"],
  },
  {
    id: "trap-08-adas-5r1v-vs-5r10v",
    wrong: "把 ADAS Basic 课 08 的 5R1V（无 TOPS）与产品课 5R10V/116 TOPS 合成唯一硬件口径",
    right: "产品课：5R10V / 116 TOPS；ADAS Basic（Lynk）：08 EM-P = 5R1V 且本课未给 TOPS — 不同课程，双 badge 勿塌缩",
    sourceBadge: "极氪学",
    tags: ["08", "ADAS"],
  },
  {
    id: "trap-01-vs-08-system-206",
    wrong: "把 01 EM-P 系统功率写成 08 的 280/436（或反过来）",
    right: "NEW 01 产品课系统 206 kW / 535 N·m；08 技术专课 FWD 280 / AWD 436 — 分车分 badge",
    sourceBadge: "极氪学",
    tags: ["01", "08", "EM-P"],
  },
  {
    id: "trap-01-te-38-vs-44",
    wrong: "把 01 的 BHE15 TE 38.1% 与 EM-P/08 技术课 44.26% 合成唯一热效率",
    right: "NEW 01 产品课 BHE15-DFZ-A00 TE 38.1%（CR 14:1）；08/EM-P 技术专课 TE 44.26% — 机型/课源不同，双 badge",
    sourceBadge: "极氪学",
    tags: ["01", "08", "EM-P"],
  },
  {
    id: "trap-01-pack-17-vs-39",
    wrong: "把 01 包 17.72 kWh 与 08 包 39.6 kWh 混用",
    right: "NEW 01：17.72 kWh NCM L 形包；08 技术专课：39.6 kWh NCM — 分车勿塌缩",
    sourceBadge: "极氪学",
    tags: ["01", "08", "battery"],
  },
  {
    id: "trap-01-cma-vs-cma-evo",
    wrong: "把 NEW 01 直接标成 CMA Evo（与 08 同标签）",
    right: "NEW 01 产品课写 CMA；08 产品课写 CMA Evo — 除非他课明示，勿把 Evo 标签贴到 01",
    sourceBadge: "极氪学",
    tags: ["01", "08", "CMA"],
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
      "trap-900-p4-not-in-3dht",
      "trap-900-50-vs-5238",
      "trap-900-nedc-vs-cltc",
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
    oneLiner: "CEVT · 极氪≠CMA · 01 产品课=CMA（勿贴Evo）· 08 属 CMA Evo / EM-P",
    sourceBadge: "极氪学",
    factIds: cmaFacts.map((f) => f.id),
    trapIds: ["trap-09-not-cma", "trap-zeekr-not-cma", "trap-01-cma-vs-cma-evo"],
  },
  {
    id: "EM-P",
    name: "EM-P",
    nameZh: "超级电混",
    oneLiner: "08/07 DHT Evo；01 EM-P（206/535 · 17.72 · TE38.1%）≠08 280/436·39.6·TE44.26%；≠09 MHEV；≠7X BEV",
    sourceBadge: "极氪学",
    factIds: empFacts.map((f) => f.id),
    trapIds: [
      "trap-08-vs-09-hybrid",
      "trap-09-not-cma",
      "trap-08-257-vs-280-436",
      "trap-01-vs-08-system-206",
      "trap-01-te-38-vs-44",
      "trap-01-pack-17-vs-39",
      "trap-01-cma-vs-cma-evo",
    ],
  },
  {
    id: "Lynk900",
    name: "Lynk 900 EM-P",
    nameZh: "领克 900",
    oneLiner:
      "GEEA 3.0 AWD · VEP4 2.0TD + 3DHT Pro(P1+P2) + 独立 P4 230kW · 52.38/50 kWh NCM · NEDC EV 170；SPA Evo 名牌本课待补",
    sourceBadge: "极氪学",
    factIds: lynk900Facts.map((f) => f.id),
    trapIds: [
      "trap-09-not-900",
      "trap-900-p4-not-in-3dht",
      "trap-900-50-vs-5238",
      "trap-900-nedc-vs-cltc",
    ],
  },
  {
    id: "Lynk08Product",
    name: "Lynk 08 Product Training",
    nameZh: "领克 08 产品课",
    oneLiner:
      "CMA Evo · 4820×1915×1685 / WB2848 / Cd0.295 · 5R10V/116TOPS · 车身74.94%HSS · 电池IP68/DP1180 900MPa/气凝胶4.2mm/65ms · 三源功率勿单选（竞品页350Nm/6.5s vs 销售257/6.75 vs 专课280/436）",
    sourceBadge: "极氪学",
    factIds: lynk08ProductFacts.map((f) => f.id),
    trapIds: ["trap-08-257-vs-280-436", "trap-08-vs-09-hybrid", "trap-08-adas-5r1v-vs-5r10v"],
  },
  {
    id: "Lynk01Product",
    name: "Lynk NEW 01 / 01 EM-P Product Training",
    nameZh: "领克 NEW 01 产品课",
    oneLiner:
      "Urban Utility Compact SUV · CMA（非Evo标签）· 4545×1860×1694/WB2734/0.605 · P1+P2 3-DHT · BHE15-DFZ-A00 102kW/230Nm TE38.1% · 系统206/535 · 17.72kWh · WLTP>750 · 3R1V/8155 8TOPS · ≠08 280/436·39.6·TE44.26%",
    sourceBadge: "极氪学",
    factIds: lynk01ProductFacts.map((f) => f.id),
    trapIds: [
      "trap-01-vs-08-system-206",
      "trap-01-te-38-vs-44",
      "trap-01-pack-17-vs-39",
      "trap-01-cma-vs-cma-evo",
    ],
  },
  {
    id: "ZeekrX2026",
    name: "ZEEKR X 2026",
    nameZh: "极氪 X 2026",
    oneLiner:
      "400V · Std 61/61.47 LFP @413V CTP IPS2.0 1P132S DC230 · Prem/Flag 66 NCM · Flag AWD 365kW/3.7s/190km/h；勿与旧 BE13-B ~49.6/380.6 或 800V 表 66@392 合并",
    sourceBadge: "极氪学",
    factIds: zeekrX2026Facts.map((f) => f.id),
    trapIds: ["trap-x-pack-collapse", "trap-x-66-voltage"],
  },
  {
    id: "Thermal",
    name: "Thermal Control",
    nameZh: "热管理",
    oneLiner:
      "BCV/BEXV/CEXV/EEXV · Mode5 小循环+并联PTC · Mode11 串联+AC/散热器共冷 · 热泵四过程；X图 VCU/ACCM/HVCH/BCV/BCTV/AGM；热泵专课无权限",
    sourceBadge: "极氪学",
    factIds: thermalFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "HV-Parts",
    name: "High Voltage Parts",
    nameZh: "高压件",
    oneLiner: "X 布局 HVCH/ODP/ACCM/前后电机 · HVCH 7kW · ODP ECU=CDD · SOC/SOH；其余额定待补",
    sourceBadge: "极氪学",
    factIds: hvPartsFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "Charging",
    name: "Charging Control",
    nameZh: "充电控制",
    oneLiner:
      "AC→OBC→电池 · DC→接触器→电池 · DCDC HV→LV；CCS2：锁→PLC→隔离→预充→接触器；示意A 001/X/009 · 示意B 7X PCMU；线温 001/X/009 AC→CDD DC→BECM / 7X→PCMU；Boost/kW表待补",
    sourceBadge: "极氪学",
    factIds: chargingFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "ElectricDrive",
    name: "Electric Drive",
    nameZh: "电驱",
    oneLiner:
      "HV→逆变器→电机控制器→驱动电机；H-bridge PWM ±Vd；PMSM/感应原理；旋变 EXC/SIN/COS；油泵 BAT+/LIN/BAT−；分车峰值待补",
    sourceBadge: "极氪学",
    factIds: electricDriveFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "ODP",
    name: "ODP",
    nameZh: "集成电源",
    oneLiner:
      "PDU+DC/DC+OBC（CDD）；OBC AC→DC；DC/DC HV→12V；PDU：BDU/BECM·EV1 AC/DC·MGM/EFAD·IEM/ERAD·ACCM/HVCH/HVAH·MDB；001/X DCDC+OBC · 009 RHD HVCM+OBC · 7X 22kW；其他kW待补",
    sourceBadge: "极氪学",
    factIds: odpFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "BECM",
    name: "BECM Control",
    nameZh: "电池能量控制",
    oneLiner:
      "NTC1–20（X）；HVIL 软硬互锁·故障<80%总压；电压型 SAK-TC275 / 电流型 loop；001/X·009 RHD·7X 分布局；隔离 Rp/Rn + 400V例；更早章节/Exam待补 UI~45%",
    sourceBadge: "极氪学",
    factIds: becmFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "GEEA-Network",
    name: "GEEA / Network Structure (Lynk)",
    nameZh: "网络结构 · 领克",
    oneLiner:
      "GEEA 2.0/2.5/3.0 · LIN/CAN/CAN FD/FlexRay/Ethernet/LVDS · FlexRay 0–127 words/0–254B · 1bit=100ns@10M · 100BASE-T1 100M/1G AD+显示 · LVDS 350mV/3.5mA/100Ω · Gateway CAN↔FlexRay · ADCU/DHU/ECM · 900&08 EM-P 拓扑图",
    sourceBadge: "极氪学",
    factIds: networkStructureLynkFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "ADAS-Basic-Lynk",
    name: "ADAS Basic (Lynk)",
    nameZh: "智驾基础 · 领克",
    oneLiner:
      "Perception→Decision→Execution；08 EM-P 5R1V（无TOPS）≠产品课5R10V/116TOPS；900 5R11V1V/L+LiDAR · 超声6F+6R · 100M/1G Ethernet · Safety CANFD",
    sourceBadge: "极氪学",
    factIds: adasBasicLynkFacts.map((f) => f.id),
    trapIds: ["trap-08-adas-5r1v-vs-5r10v"],
  },
  {
    id: "ElectricDoor",
    name: "Electric Door",
    nameZh: "电动门",
    oneLiner: "ZEEKR X：DPOD/PPOD — Private CAN — DDRM/PDRM；Body Exposed CAN；TCAM",
    sourceBadge: "极氪学",
    factIds: electricDoorFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "ElectricControl",
    name: "Electric Control",
    nameZh: "电气控制原理",
    oneLiner: "PWM Vout=Vmax×duty · SENT · PSI5 · NTC · Sensor→ECU→actuator（通用原理，非车型额定）",
    sourceBadge: "极氪学",
    factIds: electricControlFacts.map((f) => f.id),
    trapIds: [],
  },
  {
    id: "Zeekr009Sales",
    name: "ZEEKR 009 Sales Training",
    nameZh: "极氪 009 销讲",
    oneLiner:
      "首款为电而生 MPV · 2025交付5.3万 · 月销1000–1500≈3年 · 50万+MPV第一；0–100 4.5s · 100–0 36.9m · 峰450kW；X-pin +9.5%/−24% · 箱96.7→97.7% · 出250kW/373Nm；dTCS 6ms · 双腔55mm · CCD5× · 转圈6.2m · 侧滑0.84°；Lightning 2WD +38–45km · AWD 0.4s；竞品 M9/D9/X9/GL8/MEGA 销量示数；dims/pack/rated range 本课待补 — 009≠800V勿贴包续航",
    sourceBadge: "极氪学",
    factIds: zeekr009SalesFacts.map((f) => f.id),
    trapIds: ["trap-009-not-800v"],
  },
  {
    id: "Zeekr007GT",
    name: "ZEEKR 007GT",
    nameZh: "极氪 007GT",
    oneLiner:
      "800V · ZEEA 2.5 · 7V3R · Std 75LFP/519 · LR 100NCM/655 · Perf 100NCM/558 · NDE34 335/520（以NDE31）· AWD NDE16+NDE34 500/790 · 4864×1900×1460/1445 WB2925；包电压618/685双badge；非GT007/8X/9X专课待补",
    sourceBadge: "极氪学",
    factIds: zeekr007gtFacts.map((f) => f.id),
    trapIds: ["trap-007gt-pack-vs-800v-table", "trap-007gt-vs-7x-awd-peak", "trap-7x-not-900v"],
  },
];

/** One-line wall trap string (matches pm-wall archCompare.trap style) */
export const WALL_TRAP_LINE =
  "009≠800V（本遍销讲勿贴800V课包/续航；dims/pack/rated range待补） · 7X≠900V · 09≠CMA≠EM-P · 900 EM-P≠09 MHEV（3DHT+P4≠P0+8AT）· P4不在3DHT内 · 50≠唯一/须脚注52.38 · NEDC170≠CLTC280 · 08功率三源：产品课竞品页350Nm/6.5s ≠ 销售257/6.75 ≠ 专课280/436 · 01≠08：系统206≠280/436 · TE38.1%≠44.26% · 包17.72≠39.6 · CMA≠CMA Evo标签 · X包勿合并：2026 Std 61@413 ≠ BE13-B ~49.6@380.6 ≠ 800V表66@392 · 007GT WLTC≠800V包压表 · 007GT 500/790≠7X 475/710 · 08 ADAS：产品课5R10V/116TOPS ≠ Basic课5R1V无TOPS · SPA-Evo课：L3-L5 vs L2+冲突 · 「66%」轴距延伸是陷阱 · E8=SEA≠GEA · 06=BMA≠CMA";

/** Gaps to clear / keep in pm-wall.gaps after merge */
export const SEED_GAP_UPDATES = {
  clear: ["SPA-Evo 课件页卡住，未提取"],
  add: [
    "SPA-Evo PPT 保密：一级 — 公开墙仅短 bullet，完整笔记留在私有 zeekr-knowledge/architecture/spa-evo.md",
    "SPA-Evo 课件自动驾驶 L3–L5 与 L2+ 冲突未裁决",
    "SPA-Evo 架构课未点名 900；900 EMP 产品课亦未印定 SPA Evo 字符串（名牌待补）；公开口径仍写 900=SPA Evo",
    "900 EMP 课：尺寸/轴距/轮胎待补；Studied UI ~63%，互动页未全验",
    "SEA 架构专课待补：08 产品课采录时 Courses 搜索页1未找到",
    "08 产品课：Videos 01–03 + PPT 04–08 已采；quiz 跳过；功率须三源分 badge（竞品页/销售攻防/技术专课）",
    "NEW 01 / 01 EM-P 产品课：PPT 规格已摘（2026-09-05）；视频约2:09:33未完整观看待补；Exam/Evaluate未开；01≠08（206/535·17.72·TE38.1%·CMA vs 280/436·39.6·TE44.26%·CMA Evo）",
    "热泵专课无学习权限；Thermal/HV Parts 课多数 °C/流量/kW 设定点待补（已采 HVCH 7kW）",
    "2026 X：Prem/Flag 66 NCM 电压/电芯详参本课待补；Quiz/exam 未做；旧 BE13-B 与 800V 表包须双 badge 并存",
    "Charging 课：Boost vs Direct / max kW 表待补；Launch Lesson Exam 跳过；UI ~35%",
    "Electric Drive 课：分车峰值 kW/N·m 待补；Lesson Exam 未做；UI Studied ~62%",
    "ODP 课：除 7X 22 kW 外其他 ODP kW 额定待补；Lesson Exam 未做；UI ~52%",
    "BECM 课：温传感前更早章节本遍未全转录；Launch Lesson Exam 未做；UI ~45%",
    "009 Sales Training 已采短摘（2026-09-05）：定位/交付 · 4.5s/36.9m/450kW · X-pin/箱 · dTCS/双腔/CCD/6.2m/0.84° · Lightning · 竞品销量示数；dims/pack kWh/rated range 本课待补 — 009≠800V勿从800V课贴包续航",
    "007GT 产品课已采（2026-09-05）：800V/ZEEA2.5/7V3R · WLTC 519/655/558 · NDE34 335/520 · AWD 500/790 · 4864×1900×1460/1445；quiz跳过；包电压仍看800V课双badge",
    "007 非GT产品专课待补（Courses搜007仅返回007GT）；8X/9X 产品专课待补（页1无命中；NX21-A2勿假定=9X）",
    "Network Structure（Lynk）已采（2026-09-05）：GEEA 2.0/2.5/3.0 · LIN/CAN/CAN FD/FlexRay/Ethernet/LVDS · FlexRay/Ethernet/LVDS 课内数；Quiz/Exam 未开 UI~17%",
    "ADAS Basic（Lynk）已采：08=5R1V无TOPS ≠ 产品课5R10V/116TOPS；900=5R11V1V/L+LiDAR；Exam/Quiz 未开 UI~46%",
    "Electric Door 已采（X：DPOD/PPOD/Private CAN/DDRM/PDRM/Body Exposed CAN/TCAM）；Exam/Quiz 跳过 UI~97%",
    "Electric Control 已采短原理（PWM/SENT/PSI5/NTC/sensor→ECU→actuator）；通用课勿外推车型额定；Exam 跳过 UI~44%",
  ],
};

export const ZEEKR_ACADEMY_SEED = {
  captured: ACADEMY_CAPTURED,
  SOURCE_BADGE,
  facts: academyFacts,
  lynk900Facts,
  lynk08ProductFacts,
  lynk01ProductFacts,
  zeekrX2026Facts,
  zeekr007gtFacts,
  zeekr009SalesFacts,
  networkStructureLynkFacts,
  adasBasicLynkFacts,
  electricDoorFacts,
  electricControlFacts,
  thermalFacts,
  hvPartsFacts,
  chargingFacts,
  electricDriveFacts,
  odpFacts,
  becmFacts,
  traps: academyTraps,
  archSeeds: ARCH_SEEDS,
  wallTrapLine: WALL_TRAP_LINE,
  gapUpdates: SEED_GAP_UPDATES,
  footnote: "内部培训摘录，仅供个人学习；数字以极氪学课件为准。SPA-Evo PPT 保密一级：公开种子仅为短摘要。",
};

export default ZEEKR_ACADEMY_SEED;
