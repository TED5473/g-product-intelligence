/* Official-site intel captured 2026-09-03.
 * Public口径 only. Never invent rates, kWh or kW not printed on the page.
 */
import { brochureManuals } from "@/data/brochure-intel";

export type OfficialLink = {
  title: string;
  url: string;
  kind?: "owner" | "service" | "warranty" | "brochure" | "hub" | "config" | "overseas";
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

export const OFFICIAL_CAPTURED = "2026-09-03";

export const officialBrands: Record<string, OfficialBrand> = {
  Zeekr: {
    id: "Zeekr",
    name: "极氪",
    site: "https://www.zeekrlife.com/zh-CN",
    captured: OFFICIAL_CAPTURED,
    hotline: "400-003-6036",
    aftersales: [
      { k: "手册入口", v: "用户手册 / 保养与基础权益以极氪 App 及随车《用户手册》《车主基础权益告知书》为准；官网配置页为 SPA，未公开完整 PDF 目录。" },
      { k: "客服", v: "400-003-6036" },
      { k: "App", v: "极氪 App：车辆、手册、道路救援与权益查询。" },
    ],
    finance: [{ k: "入口", v: "在线购车与金融方案以极氪官网 / App 实时展示为准，本墙不摘录变动中的费率。" }],
    manualsHub: [
      { title: "极氪官网", url: "https://www.zeekrlife.com/zh-CN", kind: "hub" },
      { title: "极氪参数配置", url: "https://www.zeekrlife.com/config", kind: "config" },
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
      { k: "手册", v: "随车《用户手册》《保修保养手册》；电子版以领克 App 为准。各车型「产品配置表」已挂到详情页手册栏。" },
      { k: "电池回收", v: "动力电池回收通道见 /service3/batteryrecovery。" },
    ],
    finance: [{ k: "灵活拥车", v: "厂家旗下直属金融机构。以 /cars/finance 实时为准。" }],
    manualsHub: [
      { title: "智享服务", url: "https://www.lynkco.com.cn/service", kind: "hub" },
      { title: "服务权益细则", url: "https://www.lynkco.com.cn/service2", kind: "warranty" },
      { title: "灵活拥车 / 金融", url: "https://www.lynkco.com.cn/cars/finance", kind: "hub" },
      { title: "在线选配", url: "https://www.lynkco.com.cn/cars/model-config", kind: "config" },
    ],
  },
  Volvo: {
    id: "Volvo",
    name: "沃尔沃",
    site: "https://www.volvocars.com.cn/zh-cn/",
    captured: OFFICIAL_CAPTURED,
    hotline: "10108666",
    aftersales: [
      { k: "手册", v: "各车型页「获取车型手册」；技术参数及配置表见 /l/specifications/。" },
      { k: "救援", v: "沃尔沃救援。部分车型含首任车主终身免费救援权益。" },
    ],
    finance: [{ k: "金融服务", v: "官网购物工具「金融服务」。费率以经销商/官网实时方案为准。" }],
    manualsHub: [
      { title: "手册 / 软件下载", url: "https://www.volvocars.com.cn/zh-cn/support/downloads/", kind: "owner" },
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
      { k: "配置表", v: "星越 L / 星瑞 / 博越 L 产品页「参数配置」已摘录进详情页手册栏。" },
    ],
    finance: [{ k: "入口", v: "金融与置换以吉利官网 / 经销商实时活动为准。" }],
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
    aftersales: [{ k: "手册", v: "用户手册走吉利用户手册中心；车型亮点、指导价与参数配置表以银河产品页为准。" }],
    finance: [{ k: "入口", v: "定购 / 金融以银河官网实时活动为准。" }],
    manualsHub: [
      { title: "吉利银河官网", url: "https://www.galaxy-geely.com/", kind: "hub" },
      { title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" },
      { title: "银河 E5 参数配置", url: "https://www.galaxy-geely.com/E5", kind: "config" },
      { title: "银河 E8 参数配置", url: "https://www.galaxy-geely.com/E8", kind: "config" },
      { title: "银河 M9 参数配置", url: "https://www.galaxy-geely.com/M9", kind: "config" },
      { title: "银河 M7 参数配置", url: "https://www.galaxy-geely.com/M7", kind: "config" },
      { title: "银河星舰7 产品页", url: "https://www.galaxy-geely.com/p145", kind: "brochure" },
    ],
  },
  比亚迪: {
    id: "比亚迪",
    name: "比亚迪",
    site: "https://www.byd.com/cn",
    captured: OFFICIAL_CAPTURED,
    aftersales: [
      { k: "官网", v: "byd.com/cn；王朝 / 海洋 / 腾势 / 方程豹 / 仰望分品牌入口。" },
      { k: "手册", v: "随车手册及比亚迪 App；官网 https://www.byd.com/cn/user-manual。" },
    ],
    finance: [{ k: "入口", v: "金融方案以官网 / App 实时为准。" }],
    manualsHub: [
      { title: "比亚迪官网", url: "https://www.byd.com/cn", kind: "hub" },
      { title: "车型手册下载", url: "https://www.byd.com/cn/user-manual", kind: "owner" },
      { title: "参数对比", url: "https://www.byd.com/cn/parameter-comparison", kind: "config" },
      { title: "王朝首页", url: "https://www.byd.com/cn/dynasty-home", kind: "hub" },
      { title: "海洋首页", url: "https://www.byd.com/cn/ocean-home", kind: "hub" },
    ],
  },
  腾势: {
    id: "腾势",
    name: "腾势",
    site: "https://www.tengshiauto.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "tengshiauto.com 中国站。易三方是腾势专属整车智控，不是 e平台3.0。不把 denza.com 海外数字当 CLTC。" }],
    finance: [{ k: "入口", v: "以腾势官网 / App 实时为准。" }],
    manualsHub: [
      { title: "腾势官网", url: "https://www.tengshiauto.com/", kind: "hub" },
      { title: "2026款 Z9GT", url: "https://www.tengshiauto.com/product-detail/26-z9gt.html", kind: "brochure" },
      { title: "第二代 D9", url: "https://www.tengshiauto.com/product-detail/D9-2.html", kind: "brochure" },
      { title: "N9 闪充版", url: "https://www.tengshiauto.com/product-detail/N9-2026.html", kind: "brochure" },
    ],
  },
  方程豹: {
    id: "方程豹",
    name: "方程豹",
    site: "https://www.fangchengbao.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "豹 5 / 豹 8 = DMO；钛 3 = 智能 EVO+ 纯电，不是 DMO。" }],
    finance: [{ k: "入口", v: "以方程豹官网实时为准。" }],
    manualsHub: [
      { title: "方程豹官网", url: "https://www.fangchengbao.com/", kind: "hub" },
      { title: "钛3 参数配置", url: "https://www.fangchengbao.com/disposition-tai3.html", kind: "config" },
      { title: "豹5智驾版参数配置", url: "https://www.fangchengbao.com/disposition-bao5.html", kind: "config" },
      { title: "豹8 参数配置", url: "https://www.fangchengbao.com/disposition-bao8.html", kind: "config" },
    ],
  },
  仰望: {
    id: "仰望",
    name: "仰望",
    site: "https://www.yangwangauto.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "yangwangauto.com。易四方四电机。U8L 鼎藏版是另一车型，不和 U8 混挂。" }],
    finance: [{ k: "入口", v: "以仰望官网实时为准。" }],
    manualsHub: [
      { title: "仰望官网", url: "https://www.yangwangauto.com/", kind: "hub" },
      { title: "U9 产品页", url: "https://www.yangwangauto.com/u9-detail-page.html", kind: "brochure" },
    ],
  },
  奇瑞: {
    id: "奇瑞",
    name: "奇瑞",
    site: "https://www.chery.cn/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "chery.cn。瑞虎燃油/混动走火星架构，不要写成 E0X。" }],
    finance: [{ k: "入口", v: "以奇瑞官网实时为准。" }],
    manualsHub: [{ title: "奇瑞官网", url: "https://www.chery.cn/", kind: "hub" }],
  },
  风云: {
    id: "风云",
    name: "风云",
    site: "http://fulwin.chery.cn/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "风云独立站 fulwin.chery.cn。T9 / A8L 配置表已挂到详情页。" }],
    finance: [{ k: "入口", v: "以风云官网实时为准。" }],
    manualsHub: [
      { title: "风云官网", url: "http://fulwin.chery.cn/", kind: "hub" },
      { title: "T9 配置表", url: "http://fulwin.chery.cn/vehicles/t9/config/", kind: "config" },
      { title: "A8L 配置表", url: "http://fulwin.chery.cn/vehicles/a8l/config/", kind: "config" },
    ],
  },
  星途: {
    id: "星途",
    name: "星途",
    site: "https://www.exeed.com.cn/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "星纪元 ET = E0X；瑶光不要写成 E0X。" }],
    finance: [{ k: "入口", v: "以星途官网实时为准。" }],
    manualsHub: [{ title: "星途官网", url: "https://www.exeed.com.cn/", kind: "hub" }],
  },
  智界: {
    id: "智界",
    name: "智界",
    site: "https://hima.auto/zhijie/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "鸿蒙智行 hima.auto/zhijie。E0X + 华为途灵/乾崑。途灵不是奇瑞架构名。luxeed.com 本次为占位页。" }],
    finance: [{ k: "入口", v: "以鸿蒙智行 / 智界门店实时为准。" }],
    manualsHub: [
      { title: "鸿蒙智行 · 智界", url: "https://hima.auto/zhijie/", kind: "hub" },
      { title: "新S7 参数配置表", url: "https://hima.auto/zhijie/s7/configuration/", kind: "config" },
      { title: "R7 参数配置表", url: "https://hima.auto/zhijie/r7/configuration/", kind: "config" },
    ],
  },
  捷途: {
    id: "捷途",
    name: "捷途",
    site: "https://www.jetour.com.cn/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "旅行者 / 山海 L7 产品页已挂到详情。" }],
    finance: [{ k: "入口", v: "以捷途官网实时为准。" }],
    manualsHub: [
      { title: "捷途官网", url: "https://www.jetour.com.cn/", kind: "hub" },
      { title: "2026款旅行者", url: "https://www.jetour.com.cn/vehicles/2026traveler/", kind: "brochure" },
      { title: "山海L7超越版", url: "https://www.jetour.com.cn/vehicles/shanhail7beyond/", kind: "brochure" },
    ],
  },
  iCAR: {
    id: "iCAR",
    name: "iCAR",
    site: "https://www.icar.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "iCAR 纯电方盒子。本次 icar.com 未打开。" }],
    finance: [{ k: "入口", v: "以 iCAR 官网实时为准。" }],
    manualsHub: [{ title: "iCAR 官网", url: "https://www.icar.com/", kind: "hub" }],
  },
  小鹏: {
    id: "小鹏",
    name: "小鹏",
    site: "https://www.xiaopeng.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "手册", v: "用户手册中心；各车配置表已挂到详情页手册栏。" }],
    finance: [{ k: "入口", v: "以小鹏官网 / App 实时为准。" }],
    manualsHub: [
      { title: "小鹏官网", url: "https://www.xiaopeng.com/", kind: "hub" },
      { title: "用户手册中心", url: "https://www.xiaopeng.com/instruction_book/2?type=page", kind: "owner" },
    ],
  },
  小鹏MONA: {
    id: "小鹏MONA",
    name: "小鹏MONA",
    site: "https://www.xiaopeng.com/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "口径", v: "MONA 是 M03 / L03，不是扶摇 800V 首发滑板。" }],
    finance: [{ k: "入口", v: "以小鹏官网 / App 实时为准。" }],
    manualsHub: [{ title: "小鹏官网", url: "https://www.xiaopeng.com/", kind: "hub" }],
  },
  Smart: {
    id: "Smart",
    name: "smart",
    site: "https://www.smart.cn/",
    captured: OFFICIAL_CAPTURED,
    aftersales: [{ k: "官网", v: "smart.cn。本墙 z20 = 精灵 #1，不是领克 Z20，也不是精灵#3 / #5。" }],
    finance: [{ k: "入口", v: "以 smart 官网实时为准。" }],
    manualsHub: [
      { title: "smart 中国官网", url: "https://www.smart.cn/", kind: "hub" },
      { title: "精灵#1 产品页", url: "https://www.smart.cn/zh-cn/cars/1", kind: "brochure" },
    ],
  },
};

export const officialVehicles: Record<string, OfficialVehicle> = {
  "001": {
    url: "https://www.zeekrlife.com/global/vehicles/001",
    highlights: [
      "豪华猎装轿跑（官网定位）",
      "官网全球页（Mainland China · CLTC）：100 kWh 麒麟 / 95 kWh 神行 · RWD 750 km · AWD 580 kW · 0–100 3.3 s",
      "香港 001 手册页本次为占位；不把香港 WLTP 当 CLTC",
    ],
  },
  "009": {
    url: "https://www.zeekrlife.com/global/vehicles/009",
    highlights: [
      "纯电豪华旗舰 MPV",
      "官网全球页（Mainland China · CLTC）：140 kWh CTP 3.0 Kirin · 822 km · 400 kW · 0–100 4.5 s · 5209×2024×1848",
      "极氪学销讲 116 kWh / 400V 与官网 140 kWh 分列，不覆盖课表",
      "009 Grand 是四座超豪华另一车型，不混挂",
      "香港产品手册（WLTP）：116 kWh · 582 km · 450 kW · 不是 CLTC",
    ],
    manuals: [{ title: "香港产品手册 PDF（WLTP）", url: "https://www.datocms-assets.com/145744/1761192511-zeekr-all-new-009-rgb.pdf", kind: "overseas" }],
  },
  x: {
    url: "https://www.zeekrlife.com/global/vehicles/x",
    highlights: [
      "新奢全能 / 都市全能五座 SUV",
      "官网全球页（Mainland China · CLTC）：66 kWh · 512 km · AWD 315 kW / 543 N·m · 0–100 3.7 s",
      "香港产品手册（WLTP）：61 / 66 kWh · 405 / 415 km · 不是 CLTC",
    ],
    manuals: [{ title: "香港产品手册 PDF（WLTP）", url: "https://www.datocms-assets.com/145744/1780017615-260527-zeekr-x-rgb.pdf", kind: "overseas" }],
  },
  "007": {
    url: "https://www.zeekrlife.com/global/vehicles/007",
    highlights: [
      "纯电豪华轿车（官网 Luxury Sedan）",
      "官网全球页（Mainland China · CLTC）：870 km · AWD 475 kW / 710 N·m · 0–100 2.84 s · 800V",
      "产品页未印 pack kWh；香港 001/007 手册页本次为占位",
    ],
  },
  "007gt": {
    url: "https://www.zeekrlife.com/global/vehicles/007",
    highlights: ["欧洲车名 Zeekr 7GT，与 007 同族旅行版", "007GT / 7GT 全球页本次 404，不把 007 轿车数字挂过来"],
  },
  "7x": {
    url: "https://www.zeekrlife.com/global/vehicles/7x",
    highlights: [
      "豪华五座 SUV",
      "官网全球页（Mainland China · CLTC）：75 / 100 kWh · 780 km（100 kWh）· AWD 475 kW / 710 N·m · 0–100 3.8 s",
      "香港产品页（WLTP）：75 / 100 kWh · 480 / 615 / 543 km · 不是 CLTC",
      "澳洲手册 75 kWh 档不与香港 100 kWh 混挂",
    ],
  },
  "08": {
    url: "https://www.lynkco.com.cn/cars/08",
    msrp: "8 月限时专享价 15.88 万元起",
    highlights: [
      "家庭豪华智混 SUV",
      "官网配置表：4825×1915×1660 mm · 轴距 2848 mm",
      "官网配置表：神盾金砖 28.3 / 38.2 kWh · 系统 300 / 456 kW",
    ],
  },
  "07": {
    url: "https://www.lynkco.com.cn/cars/07",
    highlights: ["都市科技智混轿车", "官网配置表：系统 300 kW / 615 N·m · CLTC 纯电 126 / 200 km"],
  },
  "09": {
    url: "https://www.lynkco.com.cn/cars/09mhev",
    msrp: "9 月限时专享价 23.28 万元（09 MHEV 四驱全球版）",
    highlights: ["大七座 SUV", "09 MHEV ≠ 09 EM-P"],
  },
  lynk01: {
    url: "https://www.lynkco.com.cn/cars/01",
    msrp: "8 月限时专享价 11.98 万元起",
    highlights: ["全球出行好搭子", "官网配置表：Drive-E 2.0TD T5 187 kW"],
  },
  lynk10: {
    url: "https://www.lynkco.com.cn/cars/10",
    msrp: "8 月限时专享价 16.58 万元起（10 EM-P）",
    highlights: ["智能电混四驱轿车", "官网配置表：系统 390 kW / 755 N·m · 18.4 / 38.2 kWh"],
  },
  lynk10ev: {
    url: "https://www.lynkco.com.cn/cars/10ev",
    msrp: "8 月限时专享价 16.99 万元起",
    highlights: ["大型运动纯电轿车", "官网配置表：77.17 / 95 kWh · CLTC 701 / 816 km"],
  },
  lynk900: {
    url: "https://www.lynkco.com.cn/cars/900",
    msrp: "8 月限时置换价 26.99 万元起",
    highlights: ["旗舰大六座 SUV", "官网配置表：三元锂 44.85 / 52.38 kWh · 系统至高 650 kW"],
  },
  lynk20: {
    url: "https://www.lynkco.com.cn/cars/20",
    highlights: ["精致驾趣纯电 SUV", "官网：800V + 6C · 最大充电 460 kW", "中国 800V 领克 20 ≠ Z20"],
  },
  lynkz20: {
    highlights: ["都市纯电 SUV", "海外当地名 Lynk & Co 02 · 勿与中国 800V 领克 20 混挂", "官网 /cars/z20 现 404"],
  },
  lynk06: {
    url: "https://www.lynkco.com.cn/cars/06remix",
    highlights: ["06 Relive / Remix"],
  },
  lynk03: {
    url: "https://www.lynkco.com.cn/cars/new03",
    highlights: ["全新 03"],
  },
  lynk03plus: {
    url: "https://www.lynkco.com.cn/cars/new03jia",
    highlights: ["03+"],
  },
  lynk02: {
    url: "https://www.lynkco.com.cn/cars/02hatchback",
    highlights: ["02 Hatchback 高能家族", "国内 Hatchback ≠ 海外纯电 02（那是 Z20）"],
  },
  lynk05: {
    url: "https://www.lynkco.com.cn/cars/05jia",
    highlights: ["05+（官网 /cars/05jia）", "NOA 高阶领航辅助目前需单独付费订阅", "05-configurator 现 404"],
  },
  xc90: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc90/",
    highlights: [
      "北欧豪华旗舰 SUV",
      "产品手册 T8：P1+P4 · 系统 335 kW / 709 N·m · 0–100 5.4 s · CLTC 综合超 1000 km",
      "轻混 B5 / B6 + 48V",
    ],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc90/", kind: "owner" },
      { title: "技术参数及配置表", url: "https://www.volvocars.com.cn/zh-cn/l/specifications/xc90/", kind: "config" },
    ],
  },
  xc70: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc70-hybrid/",
    msrp: "¥229,900 – ¥411,900 起（官网 2027 年款配置级）",
    highlights: ["北欧豪华长续航混动 SUV", "官网配置表：21.2 / 39.6 kWh · CLTC 纯电 116 / 212 km"],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc70-hybrid/", kind: "owner" },
      { title: "技术参数及配置表", url: "https://www.volvocars.com.cn/zh-cn/l/specifications/xc70-hybrid/", kind: "config" },
    ],
  },
  xc40: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/xc40/",
    highlights: ["紧凑型轻度混合动力 SUV", "产品手册：离地间隙 211 mm · 48V 轻混"],
    manuals: [{ title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/xc40/", kind: "owner" }],
  },
  ex30: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/ex30-electric/",
    msrp: "EX30 焕新款限时参考尊享价 15.98 万元起",
    highlights: ["北欧高智感纯电 SUV", "官网配置表：49 / 66 kWh · CLTC 410 / 590 / 540 km"],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/ex30-electric/", kind: "owner" },
      { title: "技术参数及配置表", url: "https://www.volvocars.com.cn/zh-cn/l/specifications/ex30-electric/", kind: "config" },
    ],
  },
  em90: {
    url: "https://www.volvocars.com.cn/zh-cn/cars/em90-electric/",
    highlights: ["北欧豪华纯电旗舰 MPV", "官网：CLTC 738 km", "产品手册：一体压铸后车身 · 双腔空气悬架"],
    manuals: [
      { title: "获取车型手册", url: "https://www.volvocars.com.cn/zh-cn/cars/em90-electric/", kind: "owner" },
      { title: "技术参数及配置表", url: "https://www.volvocars.com.cn/zh-cn/l/specifications/em90-electric/", kind: "config" },
    ],
  },
  "galaxy-m9": {
    url: "https://www.galaxy-geely.com/M9",
    msrp: "限时先享指导价 17.38–25.98 万元",
    highlights: [
      "AI 科技大六座旗舰 SUV",
      "官网配置表：神盾磷酸铁锂 18.4 / 41.46 kWh · CLTC 纯电 100 / 230 / 210 km",
      "官网配置表：两驱系统 300 kW / 605 N·m · 三电机四驱 640 kW / 1165 N·m",
    ],
  },
  "galaxy-e5": {
    url: "https://www.galaxy-geely.com/E5",
    msrp: "2026 款限时指导价 10.98–14.58 万元",
    highlights: [
      "全球智享纯电 SUV",
      "官网配置表：神盾短刀 60.22 / 68.39 kWh · 电机 160 kW / 320 N·m",
      "官网配置表：CLTC 530 / 610 km · 0–100 6.9 s · CTB",
    ],
  },
  "galaxy-xingyuan": {
    url: "https://www.galaxy-geely.com/xingyuan",
    msrp: "上市指导价 6.48–9.48 万元",
    highlights: [
      "新质感灵动纯电轿车",
      "官网配置表：30.12 / 40.16 / 47.14 kWh · CLTC 310 / 410 / 480 km",
      "官网配置表：后驱 58 / 85 kW · 70 L 前备箱",
    ],
  },
  e8: {
    url: "https://www.galaxy-geely.com/E8",
    msrp: "上市指导价 14.98–19.88 万元",
    highlights: [
      "中国新一代纯电旗舰",
      "官网配置表：62 / 67.8 / 76 / 75 kWh · CLTC 575 / 610 / 700 / 620 km",
      "官网配置表：后驱 250 kW · 四驱系统 475 kW · 直流峰值至 450 kW",
    ],
  },
  "galaxy-l6": {
    url: "https://www.galaxy-geely.com/L6",
    msrp: "限时先享指导价 7.98–10.68 万元",
    highlights: [
      "L6 EM-i",
      "官网配置表：电机 160 kW / 262 N·m · 发动机 82 kW · CLTC 纯电 60 / 140 km",
    ],
  },
  "galaxy-l7": {
    url: "https://www.galaxy-geely.com/",
    highlights: [
      "银河 L7（CMA 2.0）",
      "官网 /L7 现 404。不把星舰 7（/p145 · 18.4/19.09 kWh · 130/135 km）或 M7（/M7 · GEA Evo · 4770 mm · 225/1730 km）挂到 L7",
    ],
  },
  "galaxy-zhanjian700": {
    url: "https://www.galaxy-geely.com/ZJ700",
    highlights: ["银河战舰 700（官网专页在线）", "专页未印 kWh / kW，不编造", "不是星舰 7"],
  },
  "xingyue-l": {
    url: "https://xingyue.geely.com/",
    msrp: "官网配置表 13.97–17.97 万元",
    highlights: ["1.5TD + DHT / 2.0TD + 7DCT / 2.0TD 高功 + 8AT"],
    manuals: [{ title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" }],
  },
  "xingyue-l-hev": {
    url: "https://xingyue.geely.com/",
    highlights: ["星越 L HiF / i-HEV 混动"],
    manuals: [{ title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" }],
  },
  xingrui: {
    url: "https://preface.geely.com/",
    msrp: "星瑞 i-HEV 智擎混动凌云版市场指导价 104,700 元",
    highlights: ["可开启式全景天窗", "14.6 英寸高清中控屏"],
    manuals: [{ title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" }],
  },
  "xingrui-s": {
    url: "https://preface.geely.com/",
    highlights: ["星瑞家族（配置表与星瑞同页）"],
    manuals: [{ title: "吉利用户手册", url: "https://gtis.geely.com/gum/manual/html/", kind: "owner" }],
  },
  "boyue-l": {
    url: "https://boyue.geely.com/disidaiboyuel",
    msrp: "市场指导价 9.99–12.99 万元",
    highlights: ["第四代博越 L", "官网配置表：1.5TD 133 kW / 2.0TD 160 kW"],
  },
  "byd-seagull": {
    url: "https://www.byd.com/cn/ocean-home/models/haiou/26-haiou",
    msrp: "建议零售价 6.99–9.79 万元",
    highlights: [
      "2026 款海鸥（海洋网 A0）",
      "官网商品卡：DiPilot 300 · DiLink 150 · e平台 3.0",
      "官网配置表本次为空，不编造 kWh",
      "不是海豚",
    ],
    manuals: [
      { title: "2026款海鸥用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/ocean/2026%E6%AC%BE%E6%B5%B7%E9%B8%A5%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260317.pdf", kind: "owner" },
    ],
  },
  "byd-dolphin": {
    url: "https://www.byd.com/cn/ocean-home/models/haitun/2025haitun",
    msrp: "建议零售价 9.98–12.98 万元",
    highlights: ["2025 款海豚 · e平台3.0", "官网：白车身高强度钢 78.2% · 刀片电池", "官网配置表本次为空，不编造 pack kWh"],
  },
  "byd-yuan-up": {
    url: "https://www.byd.com/cn/dynasty-home/models/yuan/yuan-up",
    msrp: "建议零售价 7.48–11.98 万元",
    highlights: [
      "元 UP 智驾版",
      "官网配置表：4310×1830×1675 mm · 轴距 2620 mm",
      "官网配置表：32 / 45.12 kWh · 70 / 130 kW · CLTC 301 / 401 km",
      "不是第三代元 PLUS",
    ],
    manuals: [
      { title: "元UP智驾版用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/dynasty/%E5%85%83UP%E6%99%BA%E9%A9%BE%E7%89%88%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C20260107.pdf", kind: "owner" },
    ],
  },
  "byd-yuan-plus": {
    url: "https://www.byd.com/cn/dynasty-home/models/yuan/3-yuan-plus",
    msrp: "建议零售价 11.99–14.99 万元",
    highlights: [
      "第三代元 PLUS · 元力智趣闪充 SUV",
      "官网配置表：57.545 / 68.547 kWh · 后驱 200 / 240 kW · CLTC 540 / 630 km",
      "官网闪充：10–70% 5 min · 10–97% 9 min",
    ],
    manuals: [
      { title: "第三代元PLUS用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/dynasty/%E7%AC%AC%E4%B8%89%E4%BB%A3%E5%85%83PLUS%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260611.pdf", kind: "owner" },
    ],
  },
  "byd-qin-l": {
    url: "https://www.byd.com/cn/dynasty-home/models/qin/26-qin-l-dm-i",
    msrp: "建议零售价 9.68–12.68 万元",
    highlights: [
      "2026 款秦 L DM-i",
      "官网配置表：15.87 / 25.28 kWh · 电机 120 / 160 / 175 kW · CLTC 128 / 200/210 km",
      "官网：NEDC 亏电 2.79 L/100km",
      "勿与秦 PLUS / 秦 MAX 混挂",
    ],
    manuals: [
      { title: "2026款秦L DM-i用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/dynasty/2026%E6%AC%BE%E7%A7%A6L%20DM-i%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C20260417.pdf", kind: "owner" },
    ],
  },
  "byd-qin-plus": {
    url: "https://www.byd.com/cn/dynasty-home/models/qin/26-qin-plus-dm-i",
    msrp: "建议零售价 7.98–9.98 万元（配置表三款）",
    highlights: [
      "2026 款秦 PLUS DM-i",
      "官网配置表：15.87 / 25.28 kWh · 电机 120 kW / 210 N·m · CLTC 128 / 200/210 km",
      "官网：NEDC 亏电 2.79 L/100km",
      "秦 PLUS ≠ 秦 L ≠ 秦 MAX",
    ],
    manuals: [
      { title: "2026款秦PLUS DM-i用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/dynasty/2026%E6%AC%BE%E7%A7%A6PLUS%20DM-i%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260430-new.pdf", kind: "owner" },
    ],
  },
  "byd-seal-06": {
    url: "https://www.byd.com/cn/ocean-home/models/haibao/27-haibao-06-ev",
    msrp: "建议零售价 10.99–15.59 万元",
    highlights: ["2027 款海豹 06 EV", "官网配置表本次为空，不编造 kWh", "不是国际 Seal，也不是 06 GT"],
    manuals: [
      { title: "2027款海豹06EV用户手册", url: "https://www.byd.com/material/__CN/domestic-official/user-manual/ocean/2027%E6%AC%BE%E6%B5%B7%E8%B1%B906EV%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260826.pdf", kind: "owner" },
    ],
  },
  "byd-seal-06gt": {
    url: "https://www.byd.com/cn/ocean-home/models/haibao/26-haibao-06-GT",
    msrp: "建议零售价 12.89–16.99 万元",
    highlights: [
      "2026 款海豹 06 GT · 纯电猎装",
      "官网配置表：57.54 / 69.07 kWh · 200 / 240 kW · CLTC 520 / 620 km · 0–100 6.9 / 6.5 s",
      "官网闪充：10–97% 9 min · 第二代刀片",
    ],
    manuals: [
      { title: "2026款海豹06GT用户手册", url: "https://www.byd.com/material/__CN/domestic-official/user-manual/ocean/2026%E6%AC%BE%E6%B5%B7%E8%B1%B906GT260804.pdf", kind: "owner" },
    ],
  },
  "byd-song-l-dm": {
    url: "https://www.byd.com/cn/dynasty-home/models/song/26-song-l-dm-i",
    msrp: "建议零售价 13.98–15.68 万元",
    highlights: [
      "2026 款宋 L DM-i",
      "官网配置表：18.3 / 26.6 kWh · 电机 160 kW / 260 N·m · CLTC 130 / 185/200 km",
      "官网：NEDC 亏电 3.4 L/100km",
      "宋 Ultra ≠ 宋 L ≠ 宋 PLUS，Ultra 数字不混挂",
    ],
    manuals: [
      { title: "宋L DM-i用户手册", url: "https://www.byd.com/material/__CN/domestic-official/user-manual/dynasty/%E5%AE%8BL%20DM-i%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260803-new.pdf", kind: "owner" },
    ],
  },
  "byd-song-l-ev": {
    url: "https://www.byd.com/cn/dynasty-home/models/song/2025song-l-ev",
    msrp: "建议零售价 18.98–24.98 万元",
    highlights: [
      "2025 款宋 L EV",
      "官网配置表：71.8 / 87.04 kWh · 系统 150 / 230 / 380 kW · CLTC 550 / 662 / 602 km",
      "宋 Ultra ≠ 宋 L ≠ 宋 PLUS",
    ],
  },
  "byd-han": {
    url: "https://www.byd.com/cn/dynasty-home/models/han/han-ev-shan",
    msrp: "建议零售价 17.98–18.78 万元",
    highlights: [
      "汉 EV 闪充版",
      "官网配置表：4995×1910×1495 mm · 前驱 240 kW / 305 N·m · CLTC 705 km · 0–100 6.5 s",
      "官网闪充：10–70% 5 min · 10–97% 9 min · 第二代刀片（配置表未印 kWh）",
      "勿与汉 L / 大汉 EV 混挂",
    ],
    manuals: [
      { title: "汉EV闪充版用户手册", url: "https://www.byd.com/material/__CN/domestic-official/user-manual/dynasty/%E6%B1%89EV%E9%97%AA%E5%85%85%E7%89%88%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260827.pdf", kind: "owner" },
    ],
  },
  "byd-han-l": {
    url: "https://www.byd.com/cn/dynasty-home/models/han/han-l-ev",
    msrp: "建议零售价 21.98–27.98 万元",
    highlights: [
      "汉 L EV · 全域 1000V 超级 e 平台",
      "官网配置表：83.2 kWh · 1000V 10C 1000 kW · CLTC 701 / 601 km · 0–100 5.5 / 2.7 s",
      "官网：系统 500 / 810 kW · 天神之眼 B DiPilot 300",
      "大汉 EV 是另一商品（24.99–29.99 万 · 配置表未印 kWh），不是汉 L",
    ],
    manuals: [
      { title: "汉L EV用户手册", url: "https://www.byd.com/material/domestic-official/user-manual/dynasty/%E6%B1%89L%20EV%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C260605.pdf", kind: "owner" },
    ],
  },
  "byd-tang": {
    url: "https://www.byd.com/cn/dynasty-home/models/tang/tang-dm-i-zhijia",
    msrp: "建议零售价 17.98–19.98 万元",
    highlights: [
      "唐 DM-i 智驾版 · 第五代 DM 七座 SUV",
      "官网配置表：1.5T 115 kW + 电机 200 kW · CLTC 160/175 / 115 km · NEDC 4.7 / 4.95 L",
      "勿与唐 L / 大唐 EV 混挂",
    ],
  },
  "byd-tang-l": {
    url: "https://www.byd.com/cn/dynasty-home/models/tang/tang-l-ev",
    msrp: "建议零售价 23.98–28.98 万元",
    highlights: [
      "唐 L EV · 全域 1000V 超级 e 平台",
      "官网配置表：100.5 kWh · 1000V 8.4C · CLTC 670 / 600 km · 0–100 6.9 / 3.9 s",
      "官网：5040×1996×1760 mm · 轴距 2950 mm · 系统 500 / 810 kW",
      "大唐 EV 是另一商品（5263 mm · 105.7 / 130.1 kWh），不是唐 L",
    ],
  },
  "byd-xia": {
    url: "https://www.byd.com/cn/dynasty-home/models/xia/26-xia",
    msrp: "建议零售价 20.68–26.98 万元",
    highlights: [
      "2026 款夏 · 第五代 DM 中大型 MPV",
      "官网配置表：20.39 / 36.6 kWh · 电机 200 kW · CLTC 100 / 203/218 km",
    ],
  },
  "byd-sealion-06": {
    url: "https://www.byd.com/cn/ocean-home/models/haishi/26-haishi-06-ev",
    msrp: "建议零售价 15.99–19.19 万元",
    highlights: [
      "2026 款海狮 06 EV",
      "官网配置表：69.07 / 82.73 kWh · 240 / 270 kW · CLTC 605 / 710 km · 800V",
      "官网：4810×1920×1675 mm · 轴距 2820 mm · e平台 3.0 Evo · CTB",
    ],
    manuals: [
      { title: "2026款海狮06EV用户手册", url: "https://www.byd.com/material/__CN/domestic-official/user-manual/ocean/2026%E6%AC%BE%E6%B5%B7%E7%8B%AE06%20EV260811.pdf", kind: "owner" },
    ],
  },
  "bao-ti3": {
    url: "https://www.fangchengbao.com/disposition-tai3.html",
    msrp: "全国建议零售价 13.38–17.78 万元",
    highlights: [
      "钛 3 · 智能 EVO+ 纯电",
      "官网配置表：4605×1900×1720 mm · 轴距 2745 mm",
      "官网配置表：刀片 65.28 / 72.96 kWh（选装 78.72）· 160 / 310 kW",
      "官网配置表：0–100 7.9 / 5.3 / 4.9 s · 400V / 800V 分档 · V2L 6 kW",
      "官网：天神之眼 C DiPilot 100 · CTB",
    ],
  },
  bao5: {
    url: "https://www.fangchengbao.com/disposition-bao5.html",
    msrp: "智驾版建议零售价 23.98–32.98 万元",
    highlights: [
      "豹 5 智驾版 · DMO",
      "官网配置表：4890×1970×1920 mm · 轴距 2800 mm",
      "官网配置表：系统 505 kW / 760 N·m · 电池 31.8 kWh（本表）· 0–100 4.8 s",
    ],
  },
  bao8: {
    url: "https://www.fangchengbao.com/disposition-bao8.html",
    msrp: "全国建议零售价 37.98–40.78 万元",
    highlights: [
      "豹 8 · DMO 大型混动越野",
      "官网配置表：5195×1994×1905 mm · 轴距 2920 mm",
      "官网配置表：系统 550 kW / 760 N·m · 电池 36.8 kWh · 综合 1200 km",
      "官网：直流 120 kW · 30–80% 16 min",
    ],
  },
  "yangwang-u8": {
    url: "https://www.yangwangauto.com/",
    highlights: [
      "U8 · 易四方豪华越野",
      "官网头图：四电机 · 1200 匹 · 0–100 3.5 s · CLTC 综合 1205 km",
      "U8L 鼎藏版是另一车型（145.8 万起 · 5400×2049×1921 mm），不混挂",
    ],
  },
  "yangwang-u9": {
    url: "https://www.yangwangauto.com/u9-detail-page.html",
    msrp: "180 万元起",
    highlights: [
      "U9 · 易四方超跑",
      "官网：1300 匹 · 1680 N·m · 四电机 21000 rpm",
      "官网：纽北首测 6:59.157 · 实测最高 391.94 km/h · 180 万起",
    ],
  },
  "denza-d9": {
    url: "https://www.tengshiauto.com/product-detail/D9-2.html",
    msrp: "官方指导价 32.98–46.98 万元（第二代）",
    highlights: [
      "第二代 D9 · e平台3.0 腾势 MPV",
      "官网：纯电 CLTC 800 km · 插混纯电 401 / 综合 1521 km",
      "官网：第二代刀片及闪充 · 双阀云辇-C · 天神之眼 5.0",
      "不是易三方。尊航版 103 kWh / 800V 是另一 SKU",
    ],
  },
  "denza-n7": {
    url: "https://www.tengshiauto.com/",
    highlights: ["N7 · e平台3.0 腾势升级版 800V", "中国站导航本次未单列 N7 产品页，不把 N9 数字挂过来", "不是易三方"],
  },
  "denza-n9": {
    url: "https://www.tengshiauto.com/product-detail/N9-2026.html",
    msrp: "官方指导价 40.98–46.98 万元",
    highlights: [
      "N9 闪充版 · 易三方 SUV",
      "官网：综合 1520 km · CLTC 纯电 420 km · NEDC 5.9 L",
      "官网：云辇-A 闭式双腔空悬 · 天神之眼 B",
    ],
  },
  "denza-z9gt": {
    url: "https://www.tengshiauto.com/product-detail/26-z9gt.html",
    msrp: "官方指导价 26.98–36.98 万元",
    highlights: [
      "2026 款 Z9GT · e³ 易三方首搭",
      "官网纯电 CLTC 1036 km · 插混综合 1301 / 纯电 401 km · 转向 4.62 m",
      "产品页「9分钟充饱」· 云辇-A · 易三方 ≠ e平台3.0",
    ],
  },
  tiggo9: {
    url: "https://www.chery.cn/vehicles/tiggo9/",
    msrp: "官方指导价 15.99–17.99 万元",
    highlights: ["瑞虎 9 · 火星架构旗舰 SUV", "官网：鲲鹏 2.0T · 全系 CDC"],
  },
  "tiggo8-plus": {
    url: "https://www.chery.cn/vehicles/tiggo8plusnew/",
    msrp: "官方指导价 12.19–14.49 万元",
    highlights: ["全新瑞虎 8 PLUS", "官网 310T：鲲鹏 1.6T 147 kW / 310 N·m"],
  },
  "fulwin-t9": {
    url: "http://fulwin.chery.cn/vehicles/t9/",
    msrp: "官方指导价 13.29–16.99 万元（120 km 长续航四款）",
    highlights: [
      "风云 T9 · 火星超级混动 SUV",
      "官网配置表：4795/4816×1930×1738/1741 mm · 轴距 2770 mm",
      "官网配置表：系统 265 kW / 530 N·m · CLTC 纯电 120 km · 直流 41 kW",
      "T9L 是另一页，不混挂",
    ],
  },
  "fulwin-a8": {
    url: "http://fulwin.chery.cn/vehicles/a8l/",
    msrp: "官方指导价 12.99–14.99 万元（A8L）",
    highlights: [
      "风云 A8L（官网现行为 A8L）",
      "官网配置表：4790×1843×1487 mm · 轴距 2790 mm",
      "官网配置表：145 km 档系统 265 kW · 132 km 档系统 225 kW",
    ],
  },
  "luxeed-s7": {
    url: "https://hima.auto/zhijie/s7/configuration/",
    msrp: "建议零售价 22.98 / 24.98 / 28.98 万元",
    highlights: [
      "智界 新 S7 · 鸿蒙智行配置表",
      "官网：82 / 100 / 100 kWh · CLTC 705 / 855 / 785 km · 0–100 5.4 / 3.3 s",
      "官网：华为巨鲸 800V · 30–80% 15 min · 轴距 2950 mm",
    ],
  },
  "luxeed-r7": {
    url: "https://hima.auto/zhijie/r7/configuration/",
    msrp: "纯电 / 增程各 24.98 / 26.98 / 30.98 万元",
    highlights: [
      "智界 R7 · 鸿蒙智行配置表",
      "纯电 800V：82 / 100 / 100 kWh · CLTC 667 / 802 / 736 km",
      "增程 400V：37 / 53.4 / 53.4 kWh · 综合 1570 / 1673 / 1551 · 纯电 251 / 360 / 331 km",
      "纯电 800V ≠ 增程 400V。不是 S7",
    ],
  },
  "stera-et": {
    url: "https://www.exeed.com.cn/",
    highlights: ["星纪元 ET · E0X"],
  },
  "exeed-yaoguang": {
    url: "https://www.exeed.com.cn/",
    highlights: ["瑶光 · 燃油/C-DM", "不要写成 E0X"],
  },
  "jetour-traveler": {
    url: "https://www.jetour.com.cn/vehicles/2026traveler/",
    msrp: "官方指导价 13.99 万元起",
    highlights: [
      "2026 款捷途旅行者（燃油）",
      "官网：4795×2006×1880 mm · 轴距 2800 mm",
      "C-DM 旅行者是另一页（43.24 kWh · CLTC 212 km），不混挂",
    ],
  },
  "jetour-l7": {
    url: "https://www.jetour.com.cn/vehicles/shanhail7beyond/",
    highlights: [
      "山海 L7 超越版（不是全部 L7 SKU）",
      "官网：4600×1900×1720 mm · 轴距 2745 mm",
      "官网：CLTC 纯电 130 km · 综合 1300 km · 馈电 5.18 L · V2L 6.6 kW",
    ],
  },
  "icar-v27": {
    url: "https://www.icar.com/",
    highlights: ["iCAR V27 · 纯电方盒子"],
  },
  z20: {
    url: "https://www.smart.cn/zh-cn/cars/1",
    highlights: [
      "精灵 #1（smart.cn）",
      "官网：800V 碳化硅 · CLTC 535 km · 10–80% 12 min",
      "本墙 z20 = smart #1，不是领克 Z20，也不是精灵#3 / #5",
      "产品页未印 pack kWh",
    ],
  },
  "xp-m03": { url: "https://www.xiaopeng.com/m03.html", highlights: ["MONA 智能掀背轿跑", "不是扶摇 800V 首发族"] },
  "xp-l03": { url: "https://www.xiaopeng.com/l03.html", highlights: ["MONA 智能时尚 SUV"] },
  "xp-g6": { url: "https://www.xiaopeng.com/g6_2026.html", highlights: ["扶摇 SEPA 2.0 首款战略车", "官网：800V + 5C"] },
  "xp-g7": { url: "https://www.xiaopeng.com/g7_2026.html", highlights: ["AI 智能家庭 SUV", "官网：800V + 5C"] },
  "xp-g9": { url: "https://www.xiaopeng.com/g9_2026.html", highlights: ["AI 智能豪华 SUV", "G9L 是另一系列"] },
  "xp-g9l": { url: "https://www.xiaopeng.com/g9l.html", highlights: ["黄金大五座科技旗舰"] },
  "xp-p7": { url: "https://www.xiaopeng.com/p7n.html", highlights: ["未来 AI 豪华轿跑"] },
  "xp-p7p": { url: "https://www.xiaopeng.com/p7+_2026.html", highlights: ["超大空间 AI 智能轿车"] },
  "xp-x9": { url: "https://www.xiaopeng.com/x9_2026.html", highlights: ["全球续航最长大七座（官网）"] },
  "xp-gx": { url: "https://www.xiaopeng.com/gx.html", highlights: ["新科技旗舰", "不是 X9 换标"] },
};

export function officialFor(v: { id: string; brand: string }): {
  brand: OfficialBrand | null;
  car: OfficialVehicle | null;
} {
  const brand = officialBrands[v.brand] || null;
  const raw = officialVehicles[v.id] || null;
  const extra = brochureManuals(v.id);
  const fallback = raw?.url ? [{ title: "产品页", url: raw.url, kind: "brochure" as const }] : [];
  const merged = [...extra, ...(raw?.manuals || []), ...fallback].filter(
    (m, i, a) => a.findIndex((x) => x.url === m.url) === i,
  );
  const car =
    raw || extra.length
      ? {
          ...(raw || {}),
          manuals: merged.length ? merged : undefined,
        }
      : null;
  return { brand, car };
}

export function officialPriceTag(msrp?: string | null): string | null {
  if (!msrp) return null;
  const range = msrp.match(/([\d.]+)\s*[-–~至]\s*[\d.]+\s*万/);
  if (range) return `${range[1]}万起`;
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
  config: "官网配置表",
  overseas: "海外产品手册",
};

export function serviceGroup(k: string): string {
  if (/救援/.test(k)) return "救援";
  if (/质保|包修|零件|保修/.test(k)) return "质保";
  if (/手册|保养/.test(k)) return "手册 / 保养";
  if (/电池/.test(k)) return "电池";
  if (/客服|App|热线|沃世界/.test(k)) return "客服";
  return "服务体系";
}
