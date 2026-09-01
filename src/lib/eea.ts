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
      "极氪电子电气架构 2.5 代。课件落在 7X / 007GT：PCMU←EVCC/ECM/VCU；ADCU←DVR；CDM←VGM/CEM/CCM；另有 TCAM。与 001 / X 的 ZEEA 2.0 不同代，不要混称。",
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
    test: /GEEA\s*3/,
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
    test: /EEA\s*4|GEEA\s*4/,
    title: "EEA 4.0",
    src: "公开口径",
    paras: [
      "2026年4月正式发布，全球首个量子级AI电子电气架构。全球首个应用量子加密技术的车规级EEA；车端与云端全链路、量子级安全。",
      "车端总算力超3000TOPS。支持 L4（千里浩瀚 G-ASD）与 SOVD 车云一体诊断。全球首个 ISO 8800 AI Safety 与 ISO 42001 认证。",
      "首搭于吉利旗舰车型，计划 2026 年下半年量产（不编造车型名）。支撑 Robotaxi（Eva Cab 曹操出行定制版）与 2160 线数字化激光雷达。",
    ],
  },
  {
    test: /ZEEA|GEEA|EEA/,
    title: "EEA / 电子电气架构",
    src: "公开口径",
    paras: [
      "EEA（Electronic/Electrical Architecture）是吉利汽车智能化技术体系的核心底座。",
      "公开演进：GEEA 2.0（CMA 族，极氪学）→ GEEA 3.0（2024.8 量产，域融合→集成服务化 / SDV）→ EEA 4.0（2026.4 发布，量子级 AI EEA，计划 2026 下半年量产）。",
      "极氪线单独：ZEEA 2.0（001 / X）→ ZEEA 2.5（7X / 007GT）。若课件未给代数，墙上只保留原文，不编造版本。",
    ],
  },
];

export function eeaHelp(text: string | undefined | null) {
  const t = String(text || "");
  return EEA_HELP.find((x) => x.test.test(t)) || null;
}
