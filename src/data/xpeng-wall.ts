// @ts-nocheck
/* XPeng Product Intelligence — public口径 only (官网配置表 + 汽车之家车系)
 * NEVER invent kW / kWh / mm.
 */
const SRC = { ZK: "极氪学", PUB: "公开口径", TBD: "待补", INF: "推断(课件无对比页)" };

const NCAP = {
  stars: null, year: null, adult: null, child: null, vru: null, assist: null,
  url: null, note: "未公布/未测试", source: "公开口径",
};

function ENCAP(year, url, note) {
  return { stars: 5, year, adult: null, child: null, vru: null, assist: null, url, note, source: "公开口径" };
}

const architectures = [
  {
    id: "SEPA2",
    name: "SEPA2",
    nameZh: "扶摇",
    color: "#ea580c",
    accent: "#fb923c",
    owner: "小鹏主食",
    note: "公开口径：2023-04 发布 SEPA 2.0「扶摇」全域智能进化架构。首款战略车 G6。标配全域 800V SiC。MONA 不是扶摇。",
    source: SRC.PUB,
    sourceNote: "xiaopeng.com/sepa.html；公司新闻 2023-04-16。",
    platforms: ["FY-SUV-C", "FY-SUV-D", "FY-SEDAN", "FY-MPV", "FY-FLAG"],
    skateBanner: "公开口径 · 扶摇 800V 滑板 · CIB · 无官方滑板专图，SVG 示意",
    hotspots: [
      { id: 1, key: "edrive_f", label: "前电驱", x: 28, y: 56, tip: "800V XPower 电驱" },
      { id: 2, key: "battery", label: "CIB 电池", x: 50, y: 50, tip: "电池车身一体化" },
      { id: 3, key: "edrive_r", label: "后电驱", x: 72, y: 44, tip: "后驱或四驱" },
      { id: 4, key: "pack", label: "800V 母线", x: 50, y: 36, tip: "标配全域 800V SiC" },
      { id: 5, key: "crash", label: "一体压铸", x: 48, y: 62, tip: "前后一体式铝压铸" },
      { id: 6, key: "eea", label: "X-EEA", x: 46, y: 30, tip: "中央超算 + 域控 · 千兆以太网" },
    ],
    teardown: {
      title: "扶摇拆解（公开口径）",
      publicOnly: true,
      details: {
        battery: {
          title: "CIB / 补能",
          items: [
            { k: "CIB", v: "电池车身一体化：电池包上盖当车身地板；垂直空间节约 5%；IP68，48 小时浸泡无进水。", s: SRC.PUB },
            { k: "侧梁", v: "8 个防撞空密隔舱，合计宽度 143 mm；通稿写整车能承载 80 吨侧碰冲击力。", s: SRC.PUB },
            { k: "电压", v: "标配全域 800V 高压 SiC；标配 3C 电芯兼容 4C。相较 400V 充电功率最大可提升 80%。", s: SRC.PUB },
            { k: "补能", v: "车桩结合最高：充电 5 min，最大续航 200 km+（实验室、4C 电芯 + S4 超快充桩，CLTC 表显）。", s: SRC.PUB },
          ],
        },
        edrive_f: {
          title: "XPower 电驱",
          items: [
            { k: "效率", v: "800V XPower：油冷扁线深度集成；综合工况效率 92%。通稿：综合效率每提升 1%，续航可提升 2%。", s: SRC.PUB },
            { k: "分车", v: "平台级统一 kW 未印。G6/G7/P7 等分车功率见各配置表，不汇总成平台保证值。", s: SRC.TBD },
          ],
        },
        edrive_r: { title: "后电驱", items: [{ k: "布置", v: "后驱或四驱时启用。G9 2026 配置表有 680 四驱 Max。", s: SRC.PUB }] },
        pack: {
          title: "覆盖",
          items: [
            { k: "轴距", v: "官网：兼容轴距 1,800–3,200 mm；轿车 / SUV / MPV 等品类。", s: SRC.PUB },
            { k: "首搭", v: "扶摇下首款战略车：G6（2023-04）。", s: SRC.PUB },
          ],
        },
        crash: {
          title: "车身",
          items: [
            { k: "压铸", v: "前后一体式铝压铸；车身减重 17%；集成零件数 161。", s: SRC.PUB },
            { k: "G6", v: "2026 款页：CIB + 高强度钢铝混合笼式车身。", s: SRC.PUB },
          ],
        },
        eea: {
          title: "X-EEA / 智驾",
          items: [
            { k: "X-EEA", v: "中央超算 + 域控制；通信速度 1,000 Mbps；智能平台与整车控制平台分区。", s: SRC.PUB },
            { k: "XNGP", v: "扶摇页：无人驾驶前智能辅助驾驶的终极形态。2023 高速千公里接管 <1；2025 城区百公里接管 <1 为当年目标口径。", s: SRC.PUB },
            { k: "热管理", v: "X-HP：冬季续航提升 15%；充电效率提升 90%；电池散热能力提升 100%（扶摇页百分比，非分车保证）。", s: SRC.PUB },
          ],
        },
        thermal: {
          title: "X-HP",
          items: [{ k: "口径", v: "扶摇页 X-HP 智能热管理。分车热泵数字待配置表。", s: SRC.PUB }],
        },
      },
    },
  },
  {
    id: "MONA",
    name: "MONA",
    nameZh: "MONA",
    color: "#7c3aed",
    accent: "#a78bfa",
    owner: "小鹏 MONA",
    note: "公开口径：MONA 是面向大众市场的智能产品线（与滴滴合作出身）。2024 款 M03 上市稿未写扶摇 800V 标配。不要把 MONA 整族升格为扶摇。",
    source: SRC.PUB,
    sourceNote: "xiaopeng.com M03 上市稿 2024-08-27；L03 配置表。",
    platforms: ["MONA-SEDAN", "MONA-SUV"],
    skateBanner: "公开口径 · MONA 大众智能车 · 非扶摇首发滑板",
    hotspots: [
      { id: 1, key: "edrive_f", label: "前电驱", x: 28, y: 56, tip: "M03 配置表：前驱永磁同步" },
      { id: 2, key: "battery", label: "高压电池", x: 50, y: 50, tip: "分车 kWh 见配置表" },
      { id: 3, key: "edrive_r", label: "后桥", x: 72, y: 44, tip: "M03：后扭力梁" },
      { id: 4, key: "crash", label: "笼式车身", x: 48, y: 62, tip: "上市稿：高强钢+铝 73%" },
      { id: 5, key: "eea", label: "图灵 / XNGP", x: 46, y: 30, tip: "M03 Max 搭图灵智驾" },
    ],
    teardown: {
      title: "MONA 拆解（公开口径）",
      publicOnly: true,
      details: {
        edrive_f: {
          title: "电驱",
          items: [
            { k: "M03", v: "2026 配置表：永磁同步（扁线）160 kW / 250 N·m；0–100 7.4 s；前驱。", s: SRC.PUB },
            { k: "勿混", v: "不是扶摇页那套 800V XPower 92% 效率口径。", s: SRC.PUB },
          ],
        },
        battery: {
          title: "电池",
          items: [{ k: "电压", v: "2024 款 M03 未官宣扶摇 800V。2026 款是否全域 800V，配置表未在本墙逐条核到前不升格。", s: SRC.TBD }],
        },
        edrive_r: { title: "后桥", items: [{ k: "M03", v: "配置表：前麦弗逊 / 后扭力梁半独立。转弯半径 5.3 m。", s: SRC.PUB }] },
        crash: {
          title: "车身",
          items: [{ k: "M03 上市稿", v: "超强笼式车身；高强度钢与铝合金混合使用占比 73%。", s: SRC.PUB }],
        },
        eea: {
          title: "智驾",
          items: [{ k: "M03 Max", v: "公司新闻：MONA M03 Max 搭图灵 AI 智驾，订单占比曾超 80%（2025 Q2 口径）。", s: SRC.PUB }],
        },
      },
    },
  },
];

const platforms = {
  "FY-SUV-C": { id: "FY-SUV-C", arch: "SEPA2", name: "扶摇 SUV-C", desc: "G6 · 扶摇首款", source: SRC.PUB },
  "FY-SUV-D": { id: "FY-SUV-D", arch: "SEPA2", name: "扶摇 SUV-D", desc: "G7 / G9", source: SRC.PUB },
  "FY-SEDAN": { id: "FY-SEDAN", arch: "SEPA2", name: "扶摇轿车", desc: "全新 P7 / P7+", source: SRC.PUB },
  "FY-MPV": { id: "FY-MPV", arch: "SEPA2", name: "扶摇 MPV", desc: "X9 / GX", source: SRC.PUB },
  "FY-FLAG": { id: "FY-FLAG", arch: "SEPA2", name: "扶摇旗舰", desc: "G9L", source: SRC.PUB },
  "MONA-SEDAN": { id: "MONA-SEDAN", arch: "MONA", name: "MONA 轿跑", desc: "M03", source: SRC.PUB },
  "MONA-SUV": { id: "MONA-SUV", arch: "MONA", name: "MONA SUV", desc: "L03", source: SRC.PUB },
};

function V(p) {
  return { ncap: NCAP, source: SRC.PUB, publicOnly: true, ...p };
}

const vehicles = [
  V({
    id: "xp-m03",
    photo: "imgs/cars/xp-m03.webp",
    name: "MONA M03",
    brand: "小鹏MONA",
    body: "C-hatch",
    arch: "MONA",
    platform: "MONA-SEDAN",
    powertrain: "BEV",
    summary: "智能掀背轿跑 · 4785×1896×1445 WB2815",
    koujing: "不是扶摇 800V 首发族。2024-08 上市稿定位智能纯电掀背。",
    detail: {
      dims: "4785×1896×1445 · WB 2815",
      batteryNotes: "之家参配：51.8 / 61.6 / 62.2 kWh · 液冷 · 10.8 / 11.0 / 11.5 kWh/100km",
      range: "之家 CLTC 510 / 540 / 610 / 640 km",
      motors: "配置表：160 kW / 250 N·m · 0–100 7.4 s",
      homolog: "2026 配置表：前驱永磁同步；转弯半径 5.3 m。",
      note: "尺寸官网 m03_2026/configuration。汽车之家 6998。指导价 11.98–15.18 万（之家）。",
    },
  }),
  V({
    id: "xp-l03",
    photo: "imgs/cars/xp-l03.webp",
    name: "MONA L03",
    brand: "小鹏MONA",
    body: "C-SUV",
    arch: "MONA",
    platform: "MONA-SUV",
    powertrain: "BEV",
    summary: "MONA SUV · 4650×1920×1600 WB2850",
    koujing: "MONA 族，不是扶摇 G6 那条。配置表有纯电与增程。墙上主挂非 ROAM 尺寸。",
    detail: {
      dims: "4650×1920×1600 · WB 2850",
      motors: "之家参配：总功率 183 kW · 扭矩 280 N·m · 0–100 6.6 / 6.8 / 7.5 s",
      batteryNotes: "之家参配：37.2 / 56 / 69 kWh · 液冷 · 11.5 / 11.8 / 11.9 / 12.4 / 15.3 / 15.7 kWh/100km",
      range: "之家 CLTC 315 / 325 / 525 / 550 / 625 / 650 km",
      homolog: "官网 l03/configuration：非 ROAM 4650；ROAM 套装 4672×1920×1600；轴距 2850。",
      note: "汽车之家 8305。指导价 12.38–15.68 万（之家）。",
    },
  }),
  V({
    id: "xp-g6",
    photo: "imgs/cars/xp-g6.webp",
    name: "G6",
    brand: "小鹏",
    body: "C-SUV",
    arch: "SEPA2",
    platform: "FY-SUV-C",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    ncap: ENCAP(2024, "https://www.euroncap.com/assessments/xpeng/g6/1086/", null),
    summary: "扶摇首款 · 4771×1920×1650 WB2890",
    koujing: "SEPA 2.0 扶摇下首款战略车。2026 款页亦有超级增程口径。",
    detail: {
      dims: "4771×1920×1650 · WB 2890",
      motors: "之家参配：总功率 218 kW · 扭矩 450 N·m · 0–100 6.4 / 6.7 s",
      batteryNotes: "之家参配：68.5 kWh · 液冷 · 12.5 / 18.4 kWh/100km",
      range: "之家 CLTC 430 / 625 km",
      voltage: "2026 款页：800V + 5C",
      homolog: "xiaopeng.com/g6_2026.html。CIB；图灵 AI 芯片。",
      note: "尺寸官网 2026 款页。汽车之家 7162。指导价 17.68–18.68 万（2026 纯电 Max，公司新闻）。",
    },
  }),
  V({
    id: "xp-g7",
    photo: "imgs/cars/xp-g7.webp",
    name: "G7",
    brand: "小鹏",
    body: "C-SUV",
    arch: "SEPA2",
    platform: "FY-SUV-D",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    summary: "AI 家庭 SUV · 4918×1925×1655 WB2890",
    koujing: "2026 款纯电 + 超级增程。增程通稿 CLTC 综合 1704 km、纯电 430 km。墙上主挂纯电尺寸。",
    detail: {
      dims: "4918×1925×1655 · WB 2890",
      motors: "之家参配：总功率 218 kW · 扭矩 450 N·m · 0–100 6.5 / 6.6 / 6.9 s",
      batteryNotes: "之家参配：55.8 / 68.5 / 80.8 kWh · 液冷 · 12.9 / 13.2 / 18.5 kWh/100km",
      voltage: "官网：800V 高压碳化硅 + 5C 超充 AI 电池",
      range: "纯电 702 km CLTC（旗舰口径）；增程综合 1704 / 纯电 430 km CLTC",
      homolog: "xiaopeng.com/g7_2026.html。3 颗图灵 AI 芯片 + 高通 SA8295P，车端 2250 TOPS。",
      adas: "官网：3 颗图灵 AI 芯片 + 高通 SA8295P · 车端有效算力 2250 TOPS · 第二代 VLA",
      note: "尺寸官网。汽车之家 8014。指导价 19.58–20.58 万（2026 新闻）。",
    },
  }),
  V({
    id: "xp-g9",
    photo: "imgs/cars/xp-g9.webp",
    name: "G9",
    brand: "小鹏",
    body: "D-SUV",
    arch: "SEPA2",
    platform: "FY-SUV-D",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    ncap: ENCAP(2023, "https://www.euroncap.com/assessments/xpeng/g9/1048/", null),
    summary: "AI 豪华 SUV · 4891×1937×1670 WB2998",
    koujing: "2022 首发早于扶摇发布会；2026 配置表写全域 800V SiC / 5C，墙上挂扶摇族。G9L 是另一系列。",
    detail: {
      dims: "4891×1937×1670 · WB 2998",
      motors: "之家参配：总功率 258 / 423 kW · 扭矩 465 / 695 N·m · 0–100 4.2 / 6.4 / 6.6 s",
      batteryNotes: "之家参配：79 / 93.1 kWh · 液冷 · 13.9 / 14.5 / 15.6 kWh/100km",
      voltage: "2026 配置表：全域 800V 高压 SiC + 5C 超充 AI 电池",
      range: "CLTC 625 / 725 / 680（四驱）km",
      homolog: "xiaopeng.com/g9_2026/configuration.html。",
      note: "尺寸官网。汽车之家 6492。指导价 24.88–27.88 万（2026 新闻）。",
    },
  }),
  V({
    id: "xp-g9l",
    photo: "imgs/cars/xp-g9l.webp",
    name: "G9L",
    brand: "小鹏",
    body: "D-SUV",
    arch: "SEPA2",
    platform: "FY-FLAG",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    summary: "黄金大五座 · 5120×1999×1782 WB3100",
    koujing: "不是加长 G9 换标那么简单：独立系列。预售纯电 + 超级增程。",
    detail: {
      dims: "5120×1999×1782 · WB 3100",
      motors: "之家参配：总功率 270 / 370 / 430 kW · 扭矩 465 / 695 N·m · 0–100 4.45 / 4.6 / 4.95 / 6.8 s",
      batteryNotes: "之家参配：63.3 / 91.9 / 110 kWh · 液冷 · 14.9 / 16.1 / 16.2 / 21.7 kWh/100km",
      range: "之家 CLTC 435 / 660 / 702 / 755 km",
      homolog: "公司新闻 2026-08-11：预售价 25.98 万；5120×1999×1782，轴距 3100。",
      note: "汽车之家 8659。kW/kWh 未在预售稿完整列出，不编造。",
    },
  }),
  V({
    id: "xp-p7",
    photo: "imgs/cars/xp-p7.webp",
    name: "P7",
    brand: "小鹏",
    body: "D-sedan",
    arch: "SEPA2",
    platform: "FY-SEDAN",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    ncap: ENCAP(2023, "https://www.euroncap.com/assessments/xpeng/p7/1034/", "欧洲测试为 2023 初代 XPENG P7，不是墙上 2025 全新 P7"),
    summary: "全新 AI 轿跑 · 5017×1970×1427 WB3008",
    koujing: "初代 P7 不是扶摇。墙上挂 2025 全新 P7：800V、858 电池包、820 km 口径。",
    detail: {
      dims: "5017×1970×1427 · WB 3008",
      motors: "之家参配：总功率 270 / 437 kW · 扭矩 465 / 695 N·m · 0–100 3.7 / 5.4 / 5.8 s",
      batteryNotes: "之家参配：74.9 / 92.2 kWh · 液冷 · 12.0 / 13.5 kWh/100km",
      range: "之家 CLTC 702 / 750 / 820 km",
      voltage: "上市稿：800V 高压平台 + 5C；820 km 超长续航版",
      homolog: "xiaopeng.com/p7n.html 与 p7n/configuration。",
      note: "尺寸官网。汽车之家 5213 为 P7 车系（含历代）。指导价 20.38–30.18 万（之家）。",
    },
  }),
  V({
    id: "xp-p7p",
    photo: "imgs/cars/xp-p7p.webp",
    name: "P7+",
    brand: "小鹏",
    body: "D-sedan",
    arch: "SEPA2",
    platform: "FY-SEDAN",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    summary: "超大空间轿车 · 5071×1937×1512 WB3000",
    koujing: "不是全新 P7。2026 配置表 5071×1937×1512；早期款 5056。墙上挂 2026 尺寸。亦有超级增程。",
    detail: {
      dims: "5071×1937×1512 · WB 3000",
      motors: "之家参配：总功率 180 / 230 kW · 扭矩 450 N·m · 0–100 5.9 / 6.9 s",
      batteryNotes: "之家参配：49.2 / 61.7 / 74.9 kWh · 液冷 · 10.9 / 11.7 / 16.6 kWh/100km",
      range: "之家 CLTC 430 / 615 / 725 km",
      homolog: "xiaopeng.com/p7_plus_2026/configuration.html。",
      note: "汽车之家 7554。指导价 18.68–19.88 万（2026 新闻）。",
    },
  }),
  V({
    id: "xp-x9",
    photo: "imgs/cars/xp-x9.webp",
    name: "X9",
    brand: "小鹏",
    body: "D-MPV",
    arch: "SEPA2",
    platform: "FY-MPV",
    powertrain: "BEV",
    voltageClass: "800V",
    eea: "X-EEA",
    summary: "旗舰 7 座 MPV · 5316×1988×1785 WB3160",
    koujing: "2026 配置表亦有超级增程（CLTC 综合 1602 / 纯电 452，电池 63.3 kWh）。墙上主挂 2026 尺寸。",
    detail: {
      dims: "5316×1988×1785 · WB 3160",
      motors: "之家参配：总功率 210 / 235 / 370 kW · 扭矩 450 / 465 / 640 N·m · 0–100 5.7 / 7.7 / 8 s",
      batteryNotes: "之家参配：63.3 / 94.8 / 110 kWh · 液冷 · 15.9 / 16.2 / 16.3 / 16.7 / 20.5 kWh/100km",
      range: "之家 CLTC 452 / 650 / 665 / 710 / 750 km",
      chassis: "官网：标配智能双腔空气悬架 + 主动式后轮转向，最小转弯半径 5.4 m",
      adas: "官网：最高三颗图灵 AI 芯片 · 有效算力 2250 TOPS · 第二代 VLA",
      homolog: "xiaopeng.com/x9_2026/configuration.html：7 座；轴距 3160。",
      note: "早期款 5293×1988×1785。汽车之家 7067。指导价 30.98–36.98 万（之家）。",
    },
  }),
  V({
    id: "xp-gx",
    photo: "imgs/cars/xp-gx.webp",
    name: "GX",
    brand: "小鹏",
    body: "D-MPV",
    arch: "SEPA2",
    platform: "FY-MPV",
    powertrain: "PHEV",
    voltageClass: "800V",
    eea: "X-EEA",
    summary: "6 座旗舰 · 5265×1999×1800 WB3115",
    koujing: "配置表能源类型 REEV 增程式电动。不是 X9 换标。",
    detail: {
      dims: "5265×1999×1800 · WB 3115",
      motors: "之家参配：总功率 270 / 370 / 430 kW · 扭矩 465 / 695 N·m",
      batteryNotes: "之家参配：63.3 / 91.9 / 110 kWh · 液冷 · 15.2 / 16.3 / 21.8 kWh/100km",
      range: "之家 CLTC 430 / 665 / 750 km",
      homolog: "xiaopeng.com/gx/configuration.html：6 座；REEV。",
      note: "汽车之家 8224。上市稿 5265×1999×1800。",
    },
  }),
];

const homologGroups = [
  {
    id: "xp-fy-suv",
    title: "扶摇 SUV",
    source: SRC.PUB,
    members: ["xp-g6", "xp-g7", "xp-g9"],
    note: "G9L 独立系列，不进本组。",
  },
  {
    id: "xp-mona",
    title: "MONA",
    source: SRC.PUB,
    members: ["xp-m03", "xp-l03"],
    note: "不是扶摇 800V 首发族。",
  },
];

const brandMap = {
  note: "公开口径：小鹏主品牌吃扶摇 800V；MONA 是大众智能产品线，不要整族写成扶摇。",
  source: SRC.PUB,
  rows: [
    { brand: "小鹏", primary: "SEPA 2.0 扶摇", also: "G6 首搭；G7/G9/P7/P7+/X9/GX/G9L" },
    { brand: "小鹏MONA", primary: "MONA", also: "M03 / L03。不是扶摇首发滑板" },
  ],
};

const P = SRC.PUB;
const archCompare = {
  trap: "MONA≠扶摇 · 初代P7≠全新P7 · G9L≠G9加长换标 · GX≠X9 · 2022款G9早于扶摇发布会。",
  columns: [
    { id: "SEPA2", name: "SEPA2" },
    { id: "MONA", name: "MONA" },
  ],
  groups: [
    { id: "pos", label: "定位" },
    { id: "struct", label: "结构" },
    { id: "energy", label: "电气 / 动力" },
    { id: "prod", label: "产品" },
    { id: "risk", label: "易混" },
  ],
  rows: [
    { key: "fullname", group: "pos", label: "全称", cells: {
      SEPA2: { v: "SEPA 2.0「扶摇」全域智能进化架构", s: P },
      MONA: { v: "MONA 大众智能产品线", s: P },
    }},
    { key: "one", group: "pos", label: "一句话", cells: {
      SEPA2: { v: "800V SiC + CIB + X-EEA，G6 首搭", s: P },
      MONA: { v: "面向年轻大众市场的智能车，不是扶摇标配 800V 口径", s: P },
    }},
    { key: "dev", group: "pos", label: "研发", cells: {
      SEPA2: { v: "小鹏；通稿历时 5 年、投资超百亿", s: P },
      MONA: { v: "小鹏 MONA（滴滴合作出身）", s: P },
    }},
    { key: "brands", group: "pos", label: "品牌", cells: {
      SEPA2: { v: "小鹏", s: P },
      MONA: { v: "小鹏MONA", s: P },
    }},
    { key: "form", group: "struct", label: "底盘形态", cells: {
      SEPA2: { v: "纯电滑板：CIB 地板电池 + 前后电驱；可上超级增程", s: P },
      MONA: { v: "M03 前驱 + 后扭力梁；L03 有纯电/增程", s: P },
    }},
    { key: "span", group: "struct", label: "覆盖", cells: {
      SEPA2: { v: "官网轴距 1800–3200 mm；轿车 / SUV / MPV", s: P },
      MONA: { v: "紧凑轿跑 + 紧凑 SUV", s: P },
    }},
    { key: "pt", group: "energy", label: "动力", cells: {
      SEPA2: { v: "BEV 为主；G6/G7/P7+/X9/G9L 有超级增程；GX 配置表为 REEV", s: P },
      MONA: { v: "BEV；L03 配置表亦有增程", s: P },
    }},
    { key: "voltage", group: "energy", label: "电压", cells: {
      SEPA2: { v: "标配全域 800V SiC（扶摇页）", s: P },
      MONA: { v: "2024 款 M03 未官宣 800V；2026 款待配置表核验", s: SRC.TBD },
    }},
    { key: "eea", group: "energy", label: "EEA / 智驾", cells: {
      SEPA2: { v: "X-EEA（中央超算+域控，1000 Mbps）· XNGP · 图灵芯片（新车 Ultra）", s: P },
      MONA: { v: "M03 Max / 图灵智驾（新闻口径）", s: P },
    }},
    { key: "cell", group: "energy", label: "电池", cells: {
      SEPA2: { v: "CIB；3C 标配兼容 4C；新车 5C 超充 AI 电池", s: P },
      MONA: { v: "分车 kWh 见配置表，不编造平台数", s: SRC.TBD },
    }},
    { key: "heroes", group: "prod", label: "代表车", cells: {
      SEPA2: { v: "G6 / G7 / G9 / P7 / P7+ / X9 / GX / G9L", s: P },
      MONA: { v: "M03 / L03", s: P },
    }},
    { key: "mixup", group: "risk", label: "易混点", cells: {
      SEPA2: { v: "G9L ≠ G9；全新 P7 ≠ 初代 P7；GX ≠ X9", s: P },
      MONA: { v: "MONA ≠ 扶摇；L03 ≠ G6", s: P },
    }},
  ],
};

export const XPENG_WALL = {
  SRC,
  architectures,
  platforms,
  vehicles,
  homologGroups,
  brandMap,
  flashcards: [],
  briefBank: [],
  archCompare,
  compareFields: [],
  footnote: "公开口径，仅供产品对照；数字以小鹏官网配置表与汽车之家车系为准，不编造。",
  gaps: [
    "扶摇平台级统一 kW 未印",
    "MONA 2026 款电压未在本墙逐条核到配置表原文",
    "G9L 预售稿未给完整 kW/kWh",
    "停售 P5 / G3 / 初代 P7 未上墙",
  ],
};

export default XPENG_WALL;
