/* Official-site intel captured 2026-08-31.
 * Sources: zeekrlife.com / lynkco.com.cn / volvocars.com.cn / galaxy-geely.com / geely.com / gtis.geely.com
 * Public口径 only. Never invent rates or warranty years not printed on the page.
 */
export type OfficialLink = {
  title: string;
  url: string;
  kind?: "owner" | "service" | "warranty" | "brochure" | "hub";
};

export type OfficialKV = { k: string; v: string };

export type OfficialBrand = {
  id: string;
  name: string;
  site: string;
  captured: string;
  hotline?: string;
  aftersales: OfficialKV[];
  finance: OfficialKV[];
  manualsHub: OfficialLink[];
};

export type OfficialVehicle = {
  url?: string;
  msrp?: string;
  highlights?: string[];
  manuals?: OfficialLink[];
  aftersales?: OfficialKV[];
  finance?: OfficialKV[];
};

export const OFFICIAL_CAPTURED = "2026-08-31";

export const officialBrands: Record<string, OfficialBrand> = {
  Zeekr: {
    id: "Zeekr",
    name: "极氪",
    site: "https://www.zeekrlife.com/zh-CN",
    captured: OFFICIAL_CAPTURED,
    hotline: "400-003-6036",
    aftersales: [
      { k: "手册入口", v: "用户手册 / 保养与基础权益以极氪 App 及随车《用户手册》《车主基础权益告知书》为准；官网未公开完整 PDF 目录。" },
      { k: "客服", v: "400-003-6036" },
      { k: "App", v: "极氪 App：车辆、手册、道路救援与权益查询。" },
    ],
    finance: [
      { k: "入口", v: "在线购车与金融方案以极氪官网 / App 实时展示为准，本墙不摘录变动中的费率。" },
    ],
    manualsHub: [
      { title: "极氪官网", url: "https://www.zeekrlife.com/zh-CN", kind: "hub" },
      { title: "极氪 App 下载", url: "https://m.zeekrlife.com/download", kind: "owner" },
    ],
  },
  Lynk: {
    id: "Lynk",
    name: "领克",
    site: "https://www.lynkco.com.cn/",
    captured: OFFICIAL_CAPTURED,
    hotline: "4006-010101",
    aftersales: [
      { k: "领悦服务", v: "智能养车 · 透明服务 · 用户差异服务 · 智慧产品（官网 智享服务）。" },
      { k: "质保 / 救援", v: "官网表述：家用车首任车主终身质保和终身道路救援。细则见服务权益页。" },
      { k: "道路救援", v: "中国大陆（不含港澳台）故障/事故救援；4006-010101 或领克 App；365×24。" },
      { k: "包修期内", v: "整车包修期内不限公里免费道路救援；超出后领克中心至施救地单程 100 km 内免费（service2 细则）。" },
      { k: "手册", v: "随车《用户手册》《保修保养手册》；电子版以领克 App 为准。" },
      { k: "电池回收", v: "动力电池回收通道见 /service3/batteryrecovery。" },
    ],
    finance: [
      { k: "灵活拥车", v: "厂家旗下直属金融机构。官网活动：12/18/24/36 期 0 息可选、首付 0% 起、提车快至 2 小时。以 /cars/finance 实时为准。" },
    ],
    manualsHub: [
      { title: "智享服务", url: "https://www.lynkco.com.cn/service", kind: "hub" },
      { title: "服务权益细则", url: "https://www.lynkco.com.cn/service2", kind: "warranty" },
      { title: "灵活拥车 / 金融", url: "https://www.lynkco.com.cn/cars/finance", kind: "hub" },
    ],
  },
  Volvo: {
    id: "Volvo",
    name: "沃尔沃",
    site: "https://www.volvocars.com.cn/zh-cn/",
    captured: OFFICIAL_CAPTURED,
    hotline: "10108666",
    aftersales: [
      { k: "沃世界", v: "查用车指南，享积分礼遇，约在线服务。" },
      { k: "六大服务承诺", v: "保修与保养 · 沃尔沃救援。" },
      { k: "手册", v: "各车型页「获取车型手册」；支持中心可下载最新软件或手册。具体保修条款以随车《保养及保修手册》为准。" },
      { k: "零件", v: "2020-07-01 起：符合条件时，客户自费购买并在授权经销商安装的原厂零件可享终身零件保修。" },
      { k: "救援", v: "沃尔沃救援。部分车型含首任车主终身免费救援权益；条款见救援车主手册。" },
      { k: "保养", v: "基础保养服务：项目与零件建议零售价在各车型页公示。" },
    ],
    finance: [
      { k: "金融服务", v: "官网购物工具「金融服务」。另有留学生及访问学者购车通道。费率以经销商/官网实时方案为准。" },
    ],
    manualsHub: [
      { title: "手册 / 软件下载", url: "https://www.volvocars.com.cn/zh-cn/support/", kind: "owner" },
      { title: "保修与保养", url: "https://www.volvocars.com.cn/zh-cn/l/own/after-sales-service/maintenance/", kind: "service" },
      { title: "沃尔沃救援", url: "https://www.volvocars.com.cn/zh-cn/l/own/after-sales-service/volvo-assistance/", kind: "warranty" },
    ],
  },
  Geely: {
    id: "Geely",
    name: "吉利",
    site: "https://www.geely.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [
      { k: "用户手册", v: "吉利用户手册中心（星越 L / 星瑞等分年款进入）。" },
      { k: "售后", v: "吉利官网导航「售后 / 售后服务」。保养周期以随车手册与授权经销商为准。" },
    ],
    finance: [
      { k: "入口", v: "金融与置换以吉利官网 / 经销商实时活动为准，本墙不摘录变动费率。" },
    ],
    manualsHub: [
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
      { title: "星越 L", url: "https://xingyue.geely.com/", kind: "brochure" },
      { title: "星瑞", url: "https://preface.geely.com/", kind: "brochure" },
    ],
  },
  Galaxy: {
    id: "Galaxy",
    name: "银河",
    site: "https://www.galaxy-geely.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [
      { k: "服务站", v: "银河官网「服务站查询」。" },
      { k: "手册", v: "用户手册走吉利用户手册中心；车型亮点与指导价以银河产品页为准。" },
    ],
    finance: [
      { k: "入口", v: "定购 / 金融以银河官网实时活动为准。" },
    ],
    manualsHub: [
      { title: "吉利银河官网", url: "https://www.galaxy-geely.com/", kind: "hub" },
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
    ],
  },
};

export const officialVehicles: Record<string, OfficialVehicle> = {
  "001": {
    url: "https://www.zeekrlife.com/global/vehicles/001",
    highlights: ["豪华猎装轿跑（官网定位）", "轿跑造型 + SUV 实用性 + 旅行车空间"],
  },
  "009": {
    url: "https://www.zeekrlife.com/global/vehicles/009",
    highlights: ["纯电豪华 MPV / 豪华旗舰 MPV"],
  },
  x: {
    url: "https://www.zeekrlife.com/global/vehicles/x",
    highlights: ["新奢全能 SUV / 都市全能五座 SUV"],
  },
  "007": {
    url: "https://www.zeekrlife.com/global/vehicles/007",
    highlights: ["纯电豪华轿车（官网 Luxury Sedan）"],
  },
  "007gt": {
    url: "https://www.zeekrlife.com/global/vehicles/007",
    highlights: ["欧洲车名 Zeekr 7GT，与 007 同族旅行版"],
  },
  "7x": {
    url: "https://www.zeekrlife.com/global/vehicles/7x",
    highlights: ["豪华五座 SUV（官网 Luxury 5-Seater SUV）"],
  },
  "08": {
    url: "https://www.lynkco.com.cn/cars/08",
    msrp: "8 月限时专享价 15.88 万元起（lynkco.com.cn/cars/08，2026-08）",
    highlights: ["家庭豪华智混 SUV", "轴距 2848 mm", "The Next Day 设计语言"],
  },
  "07": {
    url: "https://www.lynkco.com.cn/cars/07",
    highlights: ["07 EM-P（领克官网车系列表）"],
  },
  "09": {
    url: "https://www.lynkco.com.cn/cars/09mhev",
    msrp: "8 月限时专享价 23.28 万元（09 MHEV 四驱全球版）",
    highlights: ["大七座 SUV 旗舰之选", "浪涌式银瀑前格栅"],
  },
  lynk01: {
    url: "https://www.lynkco.com.cn/cars/01",
    msrp: "8 月限时专享价 11.98 万元起",
    highlights: ["全球出行好搭子", "4549 × 1860 × 1689 mm", "轴距 2734 mm"],
  },
  lynk10: {
    url: "https://www.lynkco.com.cn/cars/10",
    msrp: "8 月限时专享价 16.58 万元起（10 EM-P）",
    highlights: [
      "智能电混四驱轿车",
      "轴距 3005 mm",
      "综合续航至高 1400 km（官网 [2]）",
      "系统最大综合功率 390 kW（官网 [3]）",
      "CLTC 亏电油耗至低 4.2 L/100 km（官网 [6]）",
    ],
  },
  lynk10ev: {
    url: "https://www.lynkco.com.cn/cars/10ev",
    msrp: "8 月限时专享价 16.99 万元起（领克 10 纯电）",
    highlights: [
      "大型运动纯电轿车",
      "轴距 3005 mm",
      "77 kWh 神盾金砖：CLTC 至高 701 km，10–80% 至快 10.5 min",
      "95 kWh 神盾金砖电池（官网另档）",
    ],
  },
  lynk900: {
    url: "https://www.lynkco.com.cn/cars/900",
    msrp: "8 月限时置换价 26.99 万元起",
    highlights: [
      "旗舰大六座 SUV",
      "轴距 3160 mm",
      "CLTC 纯电续航至高 280 km（官网 [1]）",
      "1.5T / 2.0T 混动 + 后置单/双电机，峰值扭矩 1248 N·m（官网 [1]）",
    ],
  },
  lynk20: {
    url: "https://www.lynkco.com.cn/cars/20",
    highlights: ["全新领克 20（官网车系）"],
  },
  lynk06: {
    url: "https://www.lynkco.com.cn/cars/06remix",
    highlights: ["06 Relive / Remix（官网车系）"],
  },
  lynk03: {
    url: "https://www.lynkco.com.cn/cars/new03",
    highlights: ["全新 03（官网 /cars/new03）"],
  },
  lynk03plus: {
    url: "https://www.lynkco.com.cn/cars/new03jia",
    highlights: ["03+（官网 /cars/new03jia）"],
  },
  lynk02: {
    url: "https://www.lynkco.com.cn/cars/02hatchback",
    highlights: ["02 Hatchback（官网车系）"],
  },
  lynk05: {
    url: "https://www.lynkco.com.cn/cars/05jia",
    highlights: ["05+（官网 /cars/05jia）"],
  },
  xc90: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc90/",
    highlights: [
      "北欧豪华旗舰 SUV",
      "轻混；官网说明同时提供插电混动",
      "七座家用 SUV；最快 0–100 km/h 7.7 s（官网）",
    ],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc90/", kind: "owner" },
    ],
  },
  xc70: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc70-hybrid/",
    msrp: "¥229,900 – ¥411,900 起（官网 2027 年款配置级）",
    highlights: [
      "北欧豪华长续航混动 SUV",
      "插电式混合动力纯电续航可达 212 km（官网）",
    ],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc70-hybrid/", kind: "owner" },
    ],
  },
  xc40: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc40/",
    highlights: ["紧凑型轻度混合动力 SUV"],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc40/", kind: "owner" },
    ],
  },
  ex30: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/ex30-electric/",
    msrp: "EX30 焕新款限时参考尊享价 15.98 万元起",
    highlights: ["北欧高智感纯电 SUV", "纯电续航（CLTC）540 km（官网）"],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/ex30-electric/", kind: "owner" },
    ],
  },
  em90: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/em90-electric/",
    highlights: [
      "北欧豪华纯电旗舰 MPV",
      "纯电续航（CLTC）738 km",
      "最快充电 28 min · 272 马力 · 0–100 km/h 8.3 s",
    ],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/em90-electric/", kind: "owner" },
    ],
  },
  "galaxy-m9": {
    url: "https://www.galaxy-geely.com/M9",
    msrp: "限时先享指导价 17.38–25.98 万元",
    highlights: ["AI 科技大六座旗舰 SUV"],
  },
  "galaxy-e5": {
    url: "https://www.galaxy-geely.com/E5",
    msrp: "2026 款限时指导价 10.98–14.58 万元",
    highlights: ["全球智享纯电 SUV"],
  },
  "galaxy-xingyuan": {
    url: "https://www.galaxy-geely.com/xingyuan",
    msrp: "上市指导价 6.48–9.48 万元",
    highlights: [
      "新质感灵动纯电轿车",
      "70 L 前备箱 · 375–1320 L 后备箱",
      "全系宁德时代电芯 · 全系液冷电池",
    ],
  },
  e8: {
    url: "https://www.galaxy-geely.com/E8",
    msrp: "上市指导价 14.98–19.88 万元",
    highlights: ["中国新一代纯电旗舰", "全栈 800V 超高压平台", "SEA 架构（银河官网）"],
  },
  "galaxy-l7": {
    url: "https://www.galaxy-geely.com/",
    highlights: ["银河 L7（银河官网车系；专页未在本次抓取中打开）"],
  },
  "galaxy-zhanjian700": {
    url: "https://www.galaxy-geely.com/ZJ700",
    highlights: ["银河战舰 700（银河官网在售）"],
  },
  "xingyue-l": {
    url: "https://xingyue.geely.com/",
    msrp: "星越 L i-HEV 智擎混动凌云版市场指导价 145,700 元",
    highlights: ["1.5TD + DHT", "Flyme Auto 智能座舱", "全景四屏智联交互"],
    manuals: [
      { title: "吉利用户手册（含星越 L 各年款）", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
    ],
  },
  "xingyue-l-hev": {
    url: "https://xingyue.geely.com/",
    highlights: ["星越 L HiF / i-HEV 混动（吉利用户手册有独立年款）"],
    manuals: [
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
    ],
  },
  xingrui: {
    url: "https://preface.geely.com/",
    msrp: "星瑞 i-HEV 智擎混动凌云版市场指导价 104,700 元",
    highlights: ["可开启式全景天窗", "14.6 英寸高清中控屏", "L2 级驾驶辅助"],
    manuals: [
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
    ],
  },
  "xingrui-s": {
    url: "https://preface.geely.com/",
    highlights: ["星瑞家族（官网 preface.geely.com）"],
    manuals: [
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
    ],
  },
};

export function officialPriceTag(msrp?: string | null): string | null {
  if (!msrp) return null;
  const wan = msrp.match(/([\d.]+)\s*万/);
  if (wan) return `${wan[1]}万起`;
  const yen = msrp.match(/¥\s*([\d,]+)/);
  if (yen) return `¥${yen[1]}起`;
  const yuan = msrp.match(/([\d,]+)\s*元/);
  if (yuan) return `${yuan[1]}元`;
  return null;
}

export function splitOfficialHighlights(hs?: string[]) {
  const specs: string[] = [];
  const pitch: string[] = [];
  const specRe =
    /(\d[\d.,]*\s*(mm|km|kW|kWh|N·?m|Nm|s\b|L\/100|万元|%)|轴距|续航|功率|扭矩|油耗|充电|CLTC|0[–-]100)/i;
  for (const h of hs || []) {
    (specRe.test(h) ? specs : pitch).push(h);
  }
  return { specs, pitch };
}

export const MANUAL_KIND: Record<string, string> = {
  owner: "用户手册",
  service: "保养",
  warranty: "质保 / 救援",
  brochure: "产品页",
  hub: "官网入口",
};

export function serviceGroup(k: string): string {
  if (/救援/.test(k)) return "救援";
  if (/质保|包修|零件|保修/.test(k)) return "质保";
  if (/手册|保养/.test(k)) return "手册 / 保养";
  if (/电池/.test(k)) return "电池";
  if (/客服|App|热线|沃世界/.test(k)) return "客服";
  return "服务体系";
}
