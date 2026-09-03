export type EeaHelp = {
  test: RegExp;
  title: string;
  src: string;
  paras: string[];
};

export const EEA_HELP: EeaHelp[] = [
  {
    test: /ZEEA\s*2\.5/,
    title: "ZEEA 2.5",
    src: "极氪学",
    paras: [
      "极氪电子电气架构 2.5 代。课件落在 7X / 007GT：PCMU←EVCC/ECM/VCU；ADCU←DVR；CDM←VGM/CEM/CCM；另有 TCAM。",
      "与 001 / X 的 ZEEA 2.0 不同代，不要混称，也不要把 GEEA 写成 ZEEA。",
    ],
  },
  {
    test: /ZEEA\s*2\.0/,
    title: "ZEEA 2.0",
    src: "极氪学",
    paras: [
      "极氪电子电气架构 2.0 代。课件落在 001 / X。不要按 2.5 的域控清单外推。",
    ],
  },
  {
    test: /ZEEA/,
    title: "ZEEA",
    src: "极氪学",
    paras: [
      "Zeekr Electrical/Electronic Architecture，极氪自有电子电气架构。公开代际：ZEEA 2.0（001 / X）→ ZEEA 2.5（7X / 007GT）。",
      "不要写成 GEEA。若课件未给代数，墙上只保留原文。",
    ],
  },
  {
    test: /GEEA\s*3|GEEA3/,
    title: "GEEA 3.0",
    src: "公开口径",
    paras: [
      "2024年8月量产上车。从「域融合架构」向「集成服务化架构」进化，支撑整车功能高度集成与软件定义汽车（SDV）。",
      "银河科技页：GEEA3.0 融合「多模态AIGC、AI数字底盘、AI智能驾驶」。极氪学无 GEA 专课，无对照表或域控清单。",
    ],
  },
  {
    test: /GEEA\s*2/,
    title: "GEEA 2.0",
    src: "极氪学",
    paras: [
      "吉利电子电气架构 2.0。CMA 族（含 EM-P 课）按 GEEA 2.0 记。不要写成 ZEEA，也不要升到 GEEA 3.0。",
    ],
  },
  {
    test: /GEEA|GEE(?![A-Za-z])/,
    title: "GEEA / GEE",
    src: "公开口径",
    paras: [
      "Geely Electrical/Electronic Architecture，吉利集团电子电气架构。公开演进：GEEA 2.0（CMA 族，极氪学）→ GEEA 3.0（2024.8 量产）→ EEA 4.0（2026.4 发布）。",
      "GEE 是 GEEA 的简称写法。极氪线用 ZEEA，不要和 GEEA 混称。",
    ],
  },
  {
    test: /EEA\s*4|GEEA\s*4/,
    title: "EEA 4.0",
    src: "公开口径",
    paras: [
      "2026年4月正式发布，全球首个量子级AI电子电气架构。车端与云端全链路量子级安全；车端总算力超3000TOPS。",
      "支持 L4（千里浩瀚 G-ASD）与 SOVD 车云一体诊断。计划 2026 年下半年量产（不编造车型名）。",
    ],
  },
  {
    test: /AI\s*数字底盘/,
    title: "AI 数字底盘",
    src: "公开口径",
    paras: [
      "银河 / 吉利科技页把 AI 数字底盘与 GEEA 3.0、多模态 AIGC、AI 智能驾驶并列，作为软件定义底盘的能力层。",
      "公开口径未给独立 kW / 域控对照表。不要外推为某车的悬架行程或转向比。",
    ],
  },
  {
    test: /易三方|e³|e³/,
    title: "e³ 易三方",
    src: "公开口径",
    paras: [
      "2024-08 腾势科技日发布，官方写作 e³ | 易三方。腾势专属整车智能控制技术平台：三电机独立驱动 + 后轮双电机独立转向（±10°）+ VMC + 全系 CTB。",
      "通稿写「融合第五代 DM、e平台 3.0 Evo」，所以 e³ ≠ e平台 3.0。首搭 Z9GT；N9 官宣同平台。D9 / N7 仍是 e平台 3.0。",
      "不是仰望易四方（四电机四轮独立）。Z9GT 转弯半径 4.62 m，N9 4.65 m。",
    ],
  },
  {
    test: /扶摇|SEPA\s*2/,
    title: "SEPA 2.0 扶摇",
    src: "公开口径",
    paras: [
      "2023-04 小鹏发布的全域智能进化架构。官网：轴距 1800–3200 mm；标配全域 800V SiC；CIB 电池车身一体化；X-EEA；X-HP；XNGP。",
      "首款战略车 G6。MONA 不是扶摇。初代 P7 / P5 / G3 也不是。",
    ],
  },
  {
    test: /X-EEA|XEEA/,
    title: "X-EEA",
    src: "公开口径",
    paras: [
      "小鹏电子电气架构，扶摇页写中央超算 + 域控制，通信速度 1,000 Mbps；智能平台与整车控制平台分区。",
      "不要写成 ZEEA / GEEA。",
    ],
  },
  {
    test: /XNGP/,
    title: "XNGP",
    src: "公开口径",
    paras: [
      "小鹏智能辅助驾驶。扶摇页：无人驾驶前智能辅助驾驶的终极形态。",
      "2023 高速千公里接管 <1、2025 城区百公里接管 <1 是当年目标口径，不是分车保证。",
    ],
  },
  {
    test: /千里浩瀚|昊智驾|G-ASD/,
    title: "千里浩瀚",
    src: "公开口径",
    paras: [
      "吉利智驾品牌（G-ASD）。EEA 4.0 公开材料写其支撑 L4。",
      "墙上不编造传感器个数或算力分车数字；只保留公开页已写的能力层。",
    ],
  },
  {
    test: /浩瀚/,
    title: "浩瀚 / SEA",
    src: "公开口径",
    paras: [
      "SEA（Sustainable Experience Architecture）中文名浩瀚架构。极氪主食专电滑板，可 400V 或 800V 级。",
      "无独立 SEA 架构课；电压以 800V / 车型课为准。E8 是 SEA 不是 GEA。",
    ],
  },
  {
    test: /EEA/,
    title: "EEA / 电子电气架构",
    src: "公开口径",
    paras: [
      "EEA（Electronic/Electrical Architecture）是整车控制器、总线与电源网络的总成，决定智驾 / 座舱 / 底盘软件能集成到哪一层。",
      "吉利线：GEEA 2.0 → GEEA 3.0 → EEA 4.0。极氪线：ZEEA 2.0 → ZEEA 2.5。课件未给代数时只保留原文。",
    ],
  },
];

export function eeaHelp(text: string | undefined | null) {
  const t = String(text || "");
  return EEA_HELP.find((x) => x.test.test(t)) || null;
}

export const EEA_TERMS = [
  "ZEEA 2.5",
  "ZEEA 2.0",
  "ZEEA",
  "GEEA 3.0",
  "GEEA3.0",
  "GEEA 2.0",
  "GEEA",
  "EEA 4.0",
  "AI数字底盘",
  "AI 数字底盘",
  "易三方",
  "e³",
  "扶摇",
  "SEPA 2.0",
  "SEPA2",
  "X-EEA",
  "XNGP",
  "千里浩瀚",
  "昊智驾",
  "浩瀚",
  "G-ASD",
  "GEE",
  "EEA",
];
