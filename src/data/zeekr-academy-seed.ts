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

export const academyFacts: AcademyFact[] = [
  ...spaEvoFacts,
  ...hv800Facts,
  ...cmaFacts,
  ...empFacts,
  ...modelFacts,
  ...lynk900Facts,
  ...thermalFacts,
  ...hvPartsFacts,
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
];

/** One-line wall trap string (matches pm-wall archCompare.trap style) */
export const WALL_TRAP_LINE =
  "009≠800V · 7X≠900V · 09≠CMA≠EM-P · 900 EM-P≠09 MHEV（3DHT+P4≠P0+8AT）· P4不在3DHT内 · 50≠唯一/须脚注52.38 · NEDC170≠CLTC280 · SPA-Evo课：L3-L5 vs L2+冲突 · 「66%」轴距延伸是陷阱 · E8=SEA≠GEA · 06=BMA≠CMA";

/** Gaps to clear / keep in pm-wall.gaps after merge */
export const SEED_GAP_UPDATES = {
  clear: ["SPA-Evo 课件页卡住，未提取"],
  add: [
    "SPA-Evo PPT 保密：一级 — 公开墙仅短 bullet，完整笔记留在私有 zeekr-knowledge/architecture/spa-evo.md",
    "SPA-Evo 课件自动驾驶 L3–L5 与 L2+ 冲突未裁决",
    "SPA-Evo 架构课未点名 900；900 EMP 产品课亦未印定 SPA Evo 字符串（名牌待补）；公开口径仍写 900=SPA Evo",
    "900 EMP 课：尺寸/轴距/轮胎待补；Studied UI ~63%，互动页未全验",
    "热泵专课无学习权限；Thermal/HV Parts 课多数 °C/流量/kW 设定点待补（已采 HVCH 7kW）",
  ],
};

export const ZEEKR_ACADEMY_SEED = {
  captured: ACADEMY_CAPTURED,
  SOURCE_BADGE,
  facts: academyFacts,
  lynk900Facts,
  thermalFacts,
  hvPartsFacts,
  traps: academyTraps,
  archSeeds: ARCH_SEEDS,
  wallTrapLine: WALL_TRAP_LINE,
  gapUpdates: SEED_GAP_UPDATES,
  footnote: "内部培训摘录，仅供个人学习；数字以极氪学课件为准。SPA-Evo PPT 保密一级：公开种子仅为短摘要。",
};

export default ZEEKR_ACADEMY_SEED;
