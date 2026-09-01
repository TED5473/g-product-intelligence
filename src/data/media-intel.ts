/* Media intel: Geely captured 2026-08-31; BYD/Chery recaptured 2026-09-01 from 汽车之家 __NEXT_DATA__ and 懂车帝 car_list.
 * Public口径. Autohome 厂商指导价 ≠ 官网限时价. Never invent missing series.
 */
export const MEDIA_CAPTURED = "2026-09-01";

export type MediaTrim = {
  name: string;
  msrp?: string;
  owner?: string;
  year?: string | number;
  tags?: string[];
};

export type MediaKoubei = { k: string; v: number };

export type MediaAH = {
  seriesId: string;
  name: string;
  msrp?: string;
  score?: string;
  rangeKm?: string;
  level?: string;
  hotSpec?: string;
  koubei?: MediaKoubei[];
  tags?: string[];
};

export type MediaSibling = {
  name: string;
  seriesId: string;
  msrp?: string;
  trims?: MediaTrim[];
};

export type MediaDCD = {
  seriesId: string;
  name?: string;
  msrp?: string;
  trims?: MediaTrim[];
  siblings?: MediaSibling[];
};

export type MediaVehicle = {
  ah?: MediaAH;
  dcd?: MediaDCD;
};

export const mediaVehicles: Record<string, MediaVehicle> = {
  "001": {
    ah: { seriesId: "6091", name: "极氪001", msrp: "26.98-36.50万", score: "4.57", rangeKm: "810" },
  },
  x: {
    ah: { seriesId: "7028", name: "极氪X", msrp: "15.58-17.58万", score: "4.43", rangeKm: "530" },
  },
  "007": {
    ah: { seriesId: "7491", name: "极氪007", msrp: "20.39-24.39万", score: "4.53", rangeKm: "905" },
  },
  "007gt": {
    ah: { seriesId: "8010", name: "极氪007GT", msrp: "20.39-24.39万", score: "4.58", rangeKm: "880" },
  },
  "7x": {
    ah: { seriesId: "7777", name: "极氪7X", msrp: "22.98-26.98万", score: "4.53", rangeKm: "802" },
    dcd: {
      seriesId: "9778",
      trims: [
        { name: "75kWh后驱 Max版", msrp: "22.98万", owner: "21.33万", year: 2026 },
        { name: "103kWh后驱 Max版", msrp: "24.98万", owner: "23.72万", year: 2026 },
      ],
    },
  },
  "009": {
    ah: { seriesId: "6846", name: "极氪009", msrp: "43.90-89.90万", score: "4.56", rangeKm: "900" },
  },
  "08": {
    ah: { seriesId: "7243", name: "领克08 EM-P", msrp: "17.58-22.88万", score: "4.38", rangeKm: "230" },
  },
  "07": {
    ah: { seriesId: "5576", name: "领克07 EM-P", msrp: "15.58-18.58万", score: "4.43", rangeKm: "200" },
  },
  "09": {
    ah: { seriesId: "6144", name: "领克09", msrp: "23.88-26.58万", score: "4.57" },
  },
  lynk01: {
    ah: { seriesId: "4221", name: "领克01", msrp: "14.98-18.18万", score: "4.41" },
  },
  lynk10: {
    ah: { seriesId: "8176", name: "领克10", msrp: "17.58-24.99万", score: "4.52", rangeKm: "816" },
  },
  lynk10ev: {
    ah: { seriesId: "8176", name: "领克10", msrp: "17.58-24.99万", score: "4.52", rangeKm: "816" },
  },
  lynk900: {
    ah: { seriesId: "8002", name: "领克900", msrp: "29.98-41.69万", score: "4.58", rangeKm: "280" },
  },
  lynkz20: {
    ah: { seriesId: "7812", name: "领克Z20", msrp: "10.99-15.09万", score: "4.5", rangeKm: "530" },
  },
  lynk03: {
    ah: { seriesId: "4402", name: "领克03", msrp: undefined, score: undefined },
  },
  "xingyue-l": {
    ah: { seriesId: "6004", name: "星越L", msrp: "13.97-17.97万", score: "4.52" },
  },
  "xingyue-l-hev": {
    ah: { seriesId: "6004", name: "星越L", msrp: "13.97-17.97万", score: "4.52" },
  },
  xingrui: {
    ah: { seriesId: "5273", name: "星瑞", msrp: "9.87-14.67万", score: "4.59" },
  },
  "xingrui-s": {
    ah: { seriesId: "5273", name: "星瑞", msrp: "9.87-14.67万", score: "4.59" },
  },
  "boyue-l": {
    ah: { seriesId: "6814", name: "博越L", msrp: "9.99-12.99万", score: "4.46" },
  },
  ex30: {
    ah: { seriesId: "7275", name: "沃尔沃EX30", msrp: "20.08-26.38万", score: "4.57", rangeKm: "590" },
  },
  xc70: {
    ah: { seriesId: "8138", name: "沃尔沃XC70插电式混动", msrp: "41.19-49.69万", score: "4.57", rangeKm: "212" },
  },
  em90: {
    ah: { seriesId: "7365", name: "沃尔沃EM90", msrp: "81.80万", score: "4.59", rangeKm: "738" },
  },
  xc40: {
    ah: { seriesId: "5198", name: "沃尔沃XC40", msrp: "26.98-35.48万", score: "4.56" },
  },
  "byd-seagull": {
    ah: { seriesId: "6762", name: "海鸥", msrp: "6.98-8.59万", score: "4.57", rangeKm: "405", level: "小型车", hotSpec: "2026款 305km 活力版", koubei: [{ k: "空间", v: 4.62 }, { k: "驾驶感受", v: 4.0 }, { k: "续航", v: 4.69 }, { k: "外观", v: 5.0 }, { k: "内饰", v: 4.0 }, { k: "性价比", v: 4.69 }, { k: "智能化", v: 5.0 }], tags: ["转向轻重合理", "车身小巧", "悬架减震不舒适"] },
    dcd: { seriesId: "5952", name: "海鸥", msrp: "6.98-8.59万", trims: [
        { name: "活力版", msrp: "6.99万", owner: "6.51万", year: 2026, tags: ["305KM", "前驱"] },
        { name: "自由版", msrp: "7.89万", owner: "7.15万", year: 2026, tags: ["305KM", "前驱"] },
        { name: "自在版", msrp: "7.89万", owner: "6.00万", year: 2026, tags: ["405KM", "前驱"] },
        { name: "飞翔版", msrp: "8.59万", owner: "7.73万", year: 2026, tags: ["405KM", "前驱"] },
        { name: "智驾版 305KM 活力版", msrp: "6.98万", owner: "6.50万", year: 2025, tags: ["305KM", "前驱"] },
        { name: "智驾版 305KM 自由版", msrp: "7.88万", owner: "6.83万", year: 2025, tags: ["305KM", "前驱"] },
        { name: "智驾版 405KM 自在版", msrp: "7.88万", owner: "7.09万", year: 2025, tags: ["405KM", "前驱"] },
        { name: "智驾版 405KM 飞翔版", msrp: "8.58万", owner: "7.75万", year: 2025, tags: ["405KM", "前驱"] },
      ] },
  },
  "byd-dolphin": {
    ah: { seriesId: "6139", name: "海豚", msrp: "9.98-12.98万", score: "4.49", rangeKm: "520", level: "小型车", hotSpec: "2025款 智驾版 520km 骑士版", koubei: [{ k: "空间", v: 4.51 }, { k: "驾驶感受", v: 4.54 }, { k: "续航", v: 4.39 }, { k: "外观", v: 4.6 }, { k: "内饰", v: 4.45 }, { k: "性价比", v: 4.56 }, { k: "智能化", v: 4.4 }], tags: ["续航里程长", "方向盘轻重合理", "悬架减震舒适"] },
    dcd: { seriesId: "5008", name: "海豚", msrp: "9.98-12.58万", trims: [
        { name: "智驾版 420KM自由版", msrp: "9.98万", owner: "8.50万", year: 2025, tags: ["420KM", "前驱"] },
        { name: "智驾版 410KM时尚版", msrp: "10.98万", owner: "9.62万", year: 2025, tags: ["410KM", "前驱"] },
        { name: "智驾版 520KM骑士版", msrp: "12.58万", owner: "11.84万", year: 2025, tags: ["520KM", "前驱"] },
      ] },
  },
  "byd-yuan-plus": {
    ah: { seriesId: "6298", name: "元PLUS", msrp: "11.58-14.99万", score: "4.45", rangeKm: "630", level: "紧凑型SUV", hotSpec: "2026款 630KM 超越型", koubei: [{ k: "空间", v: 4.7 }, { k: "驾驶感受", v: 4.54 }, { k: "续航", v: 4.18 }, { k: "外观", v: 4.58 }, { k: "内饰", v: 4.32 }, { k: "性价比", v: 4.39 }, { k: "智能化", v: 4.48 }], tags: ["续航里程大", "储物空间设计合理", "加速强劲"] },
    dcd: { seriesId: "5248", name: "元PLUS", msrp: "11.58-14.99万", trims: [
        { name: "540KM 领先型", msrp: "11.99万", owner: "11.40万", year: 2026 },
        { name: "540KM 超越型", msrp: "12.99万", owner: "12.78万", year: 2026 },
        { name: "630KM 超越型", msrp: "14.29万", owner: "14.02万", year: 2026 },
        { name: "630KM 卓越型", msrp: "14.99万", owner: "14.75万", year: 2026 },
        { name: "智驾版 430KM 领先型", msrp: "11.58万", owner: "10.54万", year: 2025, tags: ["430KM", "前驱"] },
        { name: "智驾版 430KM 超越型", msrp: "12.28万", owner: "11.19万", year: 2025, tags: ["430KM", "前驱"] },
        { name: "智驾版 510KM 领先型", msrp: "12.58万", owner: "11.65万", year: 2025, tags: ["510KM", "前驱"] },
        { name: "智驾版 510KM 超越型", msrp: "13.58万", owner: "12.64万", year: 2025, tags: ["510KM", "前驱"] },
      ] },
  },
  "byd-yuan-up": {
    ah: { seriesId: "7538", name: "元UP", msrp: "7.48-11.98万", score: "4.49", rangeKm: "401", level: "小型SUV", hotSpec: "2025款 智驾版 401KM 活力版", koubei: [{ k: "空间", v: 4.53 }, { k: "驾驶感受", v: 4.53 }, { k: "续航", v: 4.3 }, { k: "外观", v: 4.6 }, { k: "内饰", v: 4.36 }, { k: "性价比", v: 4.59 }, { k: "智能化", v: 4.51 }], tags: ["续航里程大", "转向轻重合适", "储物空间设计合理"] },
    dcd: { seriesId: "9689", name: "元UP", msrp: "7.48-11.98万", trims: [
        { name: "301KM领航型", msrp: "7.48万", owner: "6.70万", year: 2025, tags: ["301KM", "前驱"] },
        { name: "智驾版 401KM活力版", msrp: "9.98万", owner: "8.36万", year: 2025, tags: ["401KM", "前驱"] },
        { name: "智驾版 401KM领先型", msrp: "10.98万", owner: "9.27万", year: 2025, tags: ["401KM", "前驱"] },
        { name: "智驾版 401KM超越型", msrp: "11.98万", owner: "10.08万", year: 2025, tags: ["401KM", "前驱"] },
      ] },
  },
  "byd-qin-l": {
    ah: { seriesId: "7578", name: "秦L", msrp: "9.68-15.38万", score: "4.51", rangeKm: "545", level: "中型车", hotSpec: "2026款 DM-i 210KM超越型", koubei: [{ k: "空间", v: 4.54 }, { k: "驾驶感受", v: 4.41 }, { k: "续航", v: 4.63 }, { k: "外观", v: 4.59 }, { k: "内饰", v: 4.42 }, { k: "性价比", v: 4.54 }, { k: "智能化", v: 4.47 }], tags: ["续航里程长", "舒适性满意", "前排头部空间够用"] },
    dcd: { seriesId: "9796", name: "秦L DM", msrp: "9.68-12.68万", trims: [
        { name: "DM-i 128KM进取型", msrp: "9.68万", owner: "8.59万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 128KM领先型", msrp: "10.68万", owner: "9.89万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 210KM超越型", msrp: "11.68万", owner: "10.54万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 210KM云辇型", msrp: "12.68万", owner: "11.63万", year: 2026, tags: ["1.5L", "前驱"] },
      ], siblings: [
        { name: "秦L EV", seriesId: "25076", msrp: "11.98-13.98万", trims: [
          { name: "470KM 领先型", msrp: "11.98万", owner: "10.39万", year: 2025, tags: ["470KM", "后驱"] },
          { name: "545KM 超越型", msrp: "12.98万", owner: "11.29万", year: 2025, tags: ["545KM", "后驱"] },
          { name: "545KM 云辇型", msrp: "13.98万", owner: "12.15万", year: 2025, tags: ["545KM", "后驱"] },
        ] },
      ] },
  },
  "byd-qin-plus": {
    ah: { seriesId: "5964", name: "秦PLUS", msrp: "7.98-17.98万", score: "4.48", rangeKm: "510", level: "紧凑型车", hotSpec: "2026款 DM-i 128KM进取型", koubei: [{ k: "空间", v: 4.59 }, { k: "驾驶感受", v: 4.54 }, { k: "续航", v: 4.34 }, { k: "外观", v: 4.72 }, { k: "内饰", v: 4.23 }, { k: "性价比", v: 4.59 }, { k: "智能化", v: 4.39 }], tags: ["油耗低", "换挡平顺", "前排头部空间宽敞"] },
    dcd: { seriesId: "4802", name: "秦PLUS DM", msrp: "7.98-10.38万", trims: [
        { name: "DM-i 128KM 进取型", msrp: "7.98万", owner: "7.11万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i  210KM 进取型", msrp: "8.98万", owner: "7.96万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i  210KM 超越型", msrp: "9.98万", owner: "9.15万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "智驾版 DM-i 55KM 领先型", msrp: "7.98万", owner: "6.88万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "智驾版 DM-i 128KM 进取型", msrp: "7.98万", owner: "7.82万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "智驾版 DM-i 55KM 超越型", msrp: "9.38万", owner: "7.56万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "智驾版 DM-i  120KM 超越型", msrp: "10.38万", owner: "9.19万", year: 2025, tags: ["1.5L", "前驱"] },
      ], siblings: [
        { name: "秦PLUS EV", seriesId: "4899", msrp: "8.98-17.38万", trims: [
          { name: "智驾版 420KM 进取型", msrp: "8.98万", owner: "7.99万", year: 2025, tags: ["420KM", "前驱"] },
          { name: "智驾版 510KM 进取型", msrp: "9.98万", owner: "9.23万", year: 2025, tags: ["510KM", "前驱"] },
          { name: "智驾版 420KM 领先型", msrp: "10.98万", owner: "9.72万", year: 2025, tags: ["420KM", "前驱"] },
          { name: "智驾版 510KM 领先型", msrp: "11.98万", owner: "9.98万", year: 2025, tags: ["510KM", "前驱"] },
          { name: "智驾版 510KM 超越型", msrp: "12.98万", owner: "11.84万", year: 2025, tags: ["510KM", "前驱"] },
          { name: "智驾版 510KM 领航版", msrp: "15.28万", owner: "12.05万", year: 2025, tags: ["510KM", "前驱"] },
          { name: "510KM 标准版", msrp: "17.38万", owner: "12.29万", year: 2025, tags: ["510KM", "前驱"] },
        ] },
      ] },
  },
  "byd-seal-06": {
    ah: { seriesId: "7588", name: "海豹06", msrp: "9.68-15.59万", score: "4.51", rangeKm: "630", level: "中型车", hotSpec: "2027款 EV 530KM尊享型", koubei: [{ k: "空间", v: 4.5 }, { k: "驾驶感受", v: 4.55 }, { k: "续航", v: 4.45 }, { k: "外观", v: 4.65 }, { k: "内饰", v: 4.38 }, { k: "性价比", v: 4.49 }, { k: "智能化", v: 4.56 }], tags: ["加速强劲", "悬架减震舒适", "油耗低"] },
    dcd: { seriesId: "9824", name: "海豹06DM", msrp: "9.68-14.19万", trims: [
        { name: "230舒享型", msrp: "9.99万", year: 2027 },
        { name: "230智享型", msrp: "10.99万", year: 2027, tags: ["0.0T", "中型车"] },
        { name: "320智享型", msrp: "11.89万", year: 2027, tags: ["0.0T", "中型车"] },
        { name: "230尊享型", msrp: "11.99万", year: 2027, tags: ["0.0T", "中型车"] },
        { name: "320尊享型", msrp: "12.89万", year: 2027, tags: ["0.0T", "中型车"] },
        { name: "320旗舰型", msrp: "14.19万", year: 2027, tags: ["0.0T", "中型车"] },
        { name: "超享版 DM-i 128KM豪华型", msrp: "9.68万", owner: "8.80万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "超享版 DM-i 128KM智享型", msrp: "10.68万", owner: "9.96万", year: 2026, tags: ["1.5L", "前驱"] },
      ], siblings: [
        { name: "海豹06EV", seriesId: "25238", msrp: "10.98-15.59万", trims: [
          { name: "530舒享型", msrp: "10.99万", year: 2027 },
          { name: "530智享型", msrp: "11.99万", year: 2027 },
          { name: "530尊享型", msrp: "12.99万", owner: "12.99万", year: 2027, tags: ["0KM", "后驱"] },
          { name: "630智享型", msrp: "13.29万", owner: "13.29万", year: 2027, tags: ["0KM", "后驱"] },
          { name: "630尊享型", msrp: "14.29万", year: 2027, tags: ["0KM", "后驱"] },
          { name: "630旗舰型", msrp: "15.59万", year: 2027, tags: ["545KM", "后驱"] },
          { name: "470KM 尊荣型", msrp: "10.98万", owner: "10.39万", year: 2025, tags: ["470KM", "后驱"] },
          { name: "545KM 尊享型", msrp: "11.98万", owner: "11.28万", year: 2025, tags: ["545KM", "后驱"] },
        ] },
      ] },
  },
  "byd-seal-06gt": {
    ah: { seriesId: "7694", name: "海豹06GT", msrp: "12.89-16.99万", score: "4.50", rangeKm: "620", level: "中型车", hotSpec: "2026款 620热浪Plus版", koubei: [{ k: "空间", v: 4.61 }, { k: "驾驶感受", v: 4.46 }, { k: "续航", v: 4.52 }, { k: "外观", v: 4.71 }, { k: "内饰", v: 4.33 }, { k: "性价比", v: 4.46 }, { k: "智能化", v: 4.42 }], tags: ["方向盘没有虚位", "加速强劲", "悬架减震舒适"] },
    dcd: { seriesId: "10205", name: "海豹06GT", msrp: "12.89-18.68万", trims: [
        { name: "520海浪版", msrp: "12.89万", year: 2026, tags: ["520KM", "后驱"] },
        { name: "520海浪Plus版", msrp: "13.99万", owner: "13.88万", year: 2026, tags: ["520KM", "后驱"] },
        { name: "620热浪Plus版", msrp: "15.39万", owner: "15.29万", year: 2026, tags: ["620KM", "后驱"] },
        { name: "620热浪Max版", msrp: "16.99万", owner: "16.99万", year: 2026, tags: ["620KM", "后驱"] },
        { name: "智驾版 505两驱海浪版", msrp: "13.68万", owner: "12.29万", year: 2025, tags: ["505KM", "后驱"] },
        { name: "智驾版 505两驱海浪Plus版", msrp: "14.68万", owner: "14.68万", year: 2025, tags: ["505KM", "后驱"] },
        { name: "智驾版 605两驱热浪版", msrp: "16.28万", owner: "15.85万", year: 2025, tags: ["605KM", "后驱"] },
        { name: "智驾版 550四驱热浪版", msrp: "18.68万", owner: "18.37万", year: 2025, tags: ["550KM", "四驱"] },
      ] },
  },
  "byd-song-l-dm": {
    ah: { seriesId: "7815", name: "宋L DM-i", msrp: "13.58-17.58万", score: "4.56", rangeKm: "200", level: "中型SUV", hotSpec: "2026款 200KM超越型", koubei: [{ k: "空间", v: 4.56 }, { k: "驾驶感受", v: 4.53 }, { k: "续航", v: 4.53 }, { k: "外观", v: 4.69 }, { k: "内饰", v: 4.37 }, { k: "性价比", v: 4.65 }, { k: "智能化", v: 4.57 }], tags: ["舒适性不错", "续航里程长", "后排空间大"] },
    dcd: { seriesId: "20012", name: "宋L DM", msrp: "13.98-15.68万", trims: [
        { name: "DM-i 130KM超越型", msrp: "13.98万", owner: "13.32万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 200KM超越型", msrp: "14.68万", owner: "13.87万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 200KM卓越型", msrp: "15.68万", owner: "14.69万", year: 2026, tags: ["1.5L", "前驱"] },
      ] },
  },
  "byd-song-l-ev": {
    ah: { seriesId: "7220", name: "宋L EV", msrp: "18.98-24.98万", score: "4.59", rangeKm: "662", level: "中型SUV", hotSpec: "2025款 智驾版 602km 激光雷达四驱型", koubei: [{ k: "空间", v: 4.7 }, { k: "驾驶感受", v: 4.51 }, { k: "续航", v: 4.67 }, { k: "外观", v: 4.71 }, { k: "内饰", v: 4.38 }, { k: "性价比", v: 4.5 }, { k: "智能化", v: 4.63 }], tags: ["加速强劲", "舒适性不错", "前排头部空间宽敞"] },
    dcd: { seriesId: "8979", name: "宋L EV", msrp: "18.98-24.98万", trims: [
        { name: "智驾版 550KM 卓越型", msrp: "18.98万", owner: "17.28万", year: 2025, tags: ["550KM", "后驱"] },
        { name: "智驾版 662KM 超越型", msrp: "19.98万", owner: "19.04万", year: 2025, tags: ["662KM", "后驱"] },
        { name: "智驾版 662KM 激光雷达卓越型", msrp: "22.58万", owner: "20.98万", year: 2025, tags: ["662KM", "后驱"] },
        { name: "智驾版 602KM 激光雷达四驱型", msrp: "24.98万", year: 2025, tags: ["602KM", "四驱"] },
      ] },
  },
  "byd-han": {
    ah: { seriesId: "5499", name: "汉", msrp: "16.88-22.58万", score: "4.49", rangeKm: "705", level: "中大型车", hotSpec: "2026款 EV 智驾版 705KM闪充尊贵型", koubei: [{ k: "空间", v: 4.49 }, { k: "驾驶感受", v: 4.39 }, { k: "续航", v: 4.49 }, { k: "外观", v: 4.57 }, { k: "内饰", v: 4.45 }, { k: "性价比", v: 4.51 }, { k: "智能化", v: 4.52 }], tags: ["加速强劲", "舒适性不错", "内饰材质好"] },
    dcd: { seriesId: "4300", name: "汉EV", msrp: "17.98-23.58万", trims: [
        { name: "705KM闪充尊贵型", msrp: "17.98万", owner: "17.74万", year: 2026, tags: ["705KM", "前驱"] },
        { name: "705KM闪充尊荣型", msrp: "18.78万", owner: "17.63万", year: 2026, tags: ["705KM", "前驱"] },
        { name: "长续航智驾版 635KM旗舰型", msrp: "18.38万", owner: "17.13万", year: 2025, tags: ["635KM", "前驱"] },
        { name: "长续航智驾版 635KM激光雷达旗舰型", msrp: "19.58万", owner: "17.56万", year: 2025, tags: ["635KM", "前驱"] },
        { name: "长续航智驾版 705KM激光雷达旗舰型", msrp: "21.58万", owner: "17.48万", year: 2025, tags: ["705KM", "前驱"] },
        { name: "智驾版 506KM尊贵型", msrp: "17.98万", owner: "14.78万", year: 2025, tags: ["506KM", "前驱"] },
        { name: "智驾版 605KM尊荣型", msrp: "18.98万", owner: "16.53万", year: 2025, tags: ["605KM", "前驱"] },
        { name: "智驾版 701KM尊荣型", msrp: "19.98万", owner: "17.03万", year: 2025, tags: ["701KM", "前驱"] },
      ], siblings: [
        { name: "汉DM", seriesId: "4228", msrp: "16.88-22.58万", trims: [
          { name: "长续航智驾版 DM-i 245KM舒适型", msrp: "16.98万", owner: "16.13万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "长续航智驾版 DM-i 245KM尊贵型", msrp: "17.98万", owner: "16.38万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "长续航智驾版 DM-i 245KM尊荣型", msrp: "18.98万", owner: "17.46万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "长续航智驾版 DM-i 245KM激光雷达旗舰型", msrp: "19.98万", owner: "17.68万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "智驾版 DM-i 125KM舒适型", msrp: "16.88万", owner: "15.12万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "智驾版 DM-i 125KM精英型", msrp: "17.58万", owner: "15.32万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "智驾版 DM-i 125KM尊贵型", msrp: "18.58万", owner: "15.81万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "智驾版 DM-i 125KM尊荣型", msrp: "19.58万", owner: "15.01万", year: 2025, tags: ["1.5T", "前驱"] },
        ] },
      ] },
  },
  "byd-han-l": {
    ah: { seriesId: "7859", name: "汉L", msrp: "20.98-27.98万", score: "4.50", rangeKm: "701", level: "中大型车", hotSpec: "2025款 EV 701KM激光雷达尊享型", koubei: [{ k: "空间", v: 4.47 }, { k: "驾驶感受", v: 4.5 }, { k: "续航", v: 4.48 }, { k: "外观", v: 4.55 }, { k: "内饰", v: 4.44 }, { k: "性价比", v: 4.51 }, { k: "智能化", v: 4.52 }], tags: ["加速强劲", "舒适性好", "内饰材质不错"] },
    dcd: { seriesId: "25187", name: "汉L EV", msrp: "21.98-27.98万", trims: [
        { name: "701KM 后驱激光雷达尊享型", msrp: "21.98万", owner: "20.25万", year: 2025, tags: ["701KM", "后驱"] },
        { name: "701KM 后驱激光雷达旗舰型", msrp: "23.98万", owner: "23.98万", year: 2025, tags: ["701KM", "后驱"] },
        { name: "601KM 四驱激光雷达旗舰型", msrp: "27.98万", owner: "25.62万", year: 2025, tags: ["601KM", "四驱"] },
      ], siblings: [
        { name: "汉L DM", seriesId: "25147", msrp: "20.98-25.98万", trims: [
          { name: "DM-i 200KM 两驱激光雷达尊享型", msrp: "20.98万", owner: "19.11万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "DM-i 200KM 两驱激光雷达旗舰型", msrp: "22.98万", owner: "20.85万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "DM-p 180KM 四驱激光雷达旗舰型", msrp: "25.98万", owner: "25.06万", year: 2025, tags: ["1.5T", "四驱"] },
        ] },
      ] },
  },
  "byd-tang": {
    ah: { seriesId: "3430", name: "唐新能源", msrp: "17.98-19.98万", score: "4.52", rangeKm: "175", level: "中型SUV", hotSpec: "2026款 纯电版 5座", koubei: [{ k: "空间", v: 4.46 }, { k: "驾驶感受", v: 4.57 }, { k: "续航", v: 4.42 }, { k: "外观", v: 4.59 }, { k: "内饰", v: 4.52 }, { k: "性价比", v: 4.57 }, { k: "智能化", v: 4.5 }], tags: ["舒适性满意", "换挡平顺", "油耗低"] },
    dcd: { seriesId: "311", name: "唐DM", msrp: "17.98-19.98万", trims: [
        { name: "智驾版 DM-i 115KM 尊贵型", msrp: "17.98万", owner: "17.85万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "智驾版 DM-i 115KM 尊荣型", msrp: "18.98万", owner: "13.57万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "智驾版 DM-i 115KM 旗舰型", msrp: "19.98万", owner: "17.30万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "智驾版 DM-i 175KM 尊贵型", msrp: "17.98万", owner: "16.31万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "智驾版 DM-i 175KM 尊荣型", msrp: "18.98万", owner: "16.40万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "智驾版 DM-i 175KM 激光雷达旗舰型", msrp: "19.98万", owner: "16.87万", year: 2025, tags: ["1.5T", "前驱"] },
      ], siblings: [
        { name: "唐EV", seriesId: "3077" },
      ] },
  },
  "byd-tang-l": {
    ah: { seriesId: "8005", name: "唐L", msrp: "22.98-28.98万", score: "4.50", rangeKm: "670", level: "中大型SUV", hotSpec: "2025款 DM 200KM四驱激光雷达旗舰型", koubei: [{ k: "空间", v: 4.51 }, { k: "驾驶感受", v: 4.54 }, { k: "续航", v: 4.51 }, { k: "外观", v: 4.52 }, { k: "内饰", v: 4.5 }, { k: "性价比", v: 4.52 }, { k: "智能化", v: 4.44 }], tags: ["加速强劲", "舒适性满意", "内饰材质满意"] },
    dcd: { seriesId: "25185", name: "唐L EV", msrp: "23.98-28.98万", trims: [
        { name: "670KM 后驱激光雷达尊享型", msrp: "23.98万", owner: "22.74万", year: 2025, tags: ["670KM", "后驱"] },
        { name: "670KM 后驱激光雷达旗舰型", msrp: "25.98万", owner: "22.50万", year: 2025, tags: ["670KM", "后驱"] },
        { name: "600KM 四驱激光雷达旗舰型", msrp: "28.98万", owner: "24.69万", year: 2025, tags: ["600KM", "四驱"] },
      ], siblings: [
        { name: "唐L DM", seriesId: "25078", msrp: "22.98-28.58万", trims: [
          { name: "DM-i 215KM 两驱激光雷达旗舰型", msrp: "22.98万", owner: "21.48万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "DM-p 200KM 四驱激光雷达旗舰型", msrp: "24.98万", owner: "20.86万", year: 2025, tags: ["1.5T", "四驱"] },
          { name: "DM-p 175KM 四驱无人机玩家版", msrp: "28.58万", owner: "28.10万", year: 2025, tags: ["1.5T", "四驱"] },
        ] },
      ] },
  },
  "byd-xia": {
    ah: { seriesId: "7851", name: "夏", msrp: "20.68-27.78万", score: "4.60", rangeKm: "218", level: "中大型MPV", hotSpec: "2026款 DM-i 1.5T 218KM 超越型", koubei: [{ k: "空间", v: 4.61 }, { k: "驾驶感受", v: 4.66 }, { k: "续航", v: 4.63 }, { k: "外观", v: 4.58 }, { k: "内饰", v: 4.6 }, { k: "性价比", v: 4.65 }, { k: "智能化", v: 4.47 }], tags: ["油耗低", "座椅舒服", "储物空间设计合理"] },
    dcd: { seriesId: "24597", name: "夏", msrp: "20.68-26.98万", trims: [
        { name: "DM-i 100KM进取型", msrp: "20.68万", owner: "24.78万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "DM-i 100KM超越型", msrp: "21.98万", owner: "22.04万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "DM-i 218KM超越型", msrp: "24.68万", owner: "23.43万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "DM-i 218KM卓越型", msrp: "26.98万", owner: "25.51万", year: 2026, tags: ["1.5T", "7座"] },
      ] },
  },
  "byd-sealion-06": {
    ah: { seriesId: "8087", name: "海狮06", msrp: "12.99-19.98万", score: "4.50", rangeKm: "710", level: "中型SUV", hotSpec: "2026款 EV  605领航版", koubei: [{ k: "空间", v: 4.7 }, { k: "驾驶感受", v: 4.29 }, { k: "续航", v: 4.51 }, { k: "外观", v: 4.8 }, { k: "内饰", v: 4.37 }, { k: "性价比", v: 4.37 }, { k: "智能化", v: 4.49 }], tags: ["悬架减震舒适", "后排空间足够", "转向轻重合理"] },
    dcd: { seriesId: "25399", name: "海狮06DM", msrp: "12.99-15.99万", trims: [
        { name: "DM-i 205领航版", msrp: "12.99万", owner: "12.91万", year: 2026 },
        { name: "DM-i 205领航Pro版", msrp: "13.99万", owner: "13.28万", year: 2026 },
        { name: "DM-i 310远航版", msrp: "14.99万", owner: "14.31万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 310旗舰版", msrp: "15.99万", owner: "15.88万", year: 2026, tags: ["1.5L", "前驱"] },
        { name: "DM-i 132KM领航版", msrp: "13.98万", owner: "13.54万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "DM-i 205KM领航Pro版", msrp: "14.68万", owner: "14.00万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "DM-i 205KM领航Plus版", msrp: "15.68万", owner: "14.33万", year: 2025, tags: ["1.5L", "前驱"] },
      ], siblings: [
        { name: "海狮06EV", seriesId: "25400", msrp: "14.38-17.99万", trims: [
          { name: "605领航版", msrp: "15.99万", owner: "15.85万", year: 2026, tags: ["605KM", "后驱"] },
          { name: "710远航版", msrp: "16.89万", owner: "16.44万", year: 2026, tags: ["710KM", "后驱"] },
          { name: "605旗舰版", msrp: "16.89万", owner: "16.70万", year: 2026, tags: ["605KM", "后驱"] },
          { name: "710远航旗舰版", msrp: "17.99万", owner: "17.83万", year: 2026, tags: ["710KM", "后驱"] },
          { name: "520领航版", msrp: "14.38万", owner: "13.94万", year: 2025, tags: ["520KM", "后驱"] },
          { name: "605领航Pro版", msrp: "15.38万", owner: "14.63万", year: 2025, tags: ["605KM", "后驱"] },
          { name: "605领航Plus版", msrp: "16.38万", owner: "15.60万", year: 2025, tags: ["605KM", "后驱"] },
        ] },
      ] },
  },
  bao5: {
    ah: { seriesId: "7177", name: "豹5", msrp: "23.98-32.98万", score: "4.48", rangeKm: "210", level: "中型SUV", hotSpec: "2026款 云辇闪充版", koubei: [{ k: "空间", v: 4.38 }, { k: "驾驶感受", v: 4.68 }, { k: "续航", v: 4.6 }, { k: "外观", v: 4.41 }, { k: "内饰", v: 4.25 }, { k: "性价比", v: 4.37 }, { k: "智能化", v: 4.67 }], tags: ["悬架减震舒适", "前排头部空间足够", "内饰材质满意"] },
    dcd: { seriesId: "8884", name: "豹5", msrp: "23.98-32.98万", trims: [
        { name: "210KM 天神Max版", msrp: "25.98万", owner: "25.76万", year: 2026, tags: ["1.5T", "四驱"] },
        { name: "云辇闪充版", msrp: "30.58万", owner: "30.38万", year: 2026, tags: ["1.5T", "四驱"] },
        { name: "125KM 天神智驾Max版", msrp: "23.98万", owner: "23.98万", year: 2025, tags: ["1.5T", "四驱"] },
        { name: "125KM 天神智驾Ultra版", msrp: "25.98万", owner: "25.49万", year: 2025, tags: ["1.5T", "四驱"] },
        { name: "210KM 天神Ultra版", msrp: "26.98万", owner: "26.60万", year: 2025, tags: ["1.5T", "四驱"] },
        { name: "210KM 云辇天神Ultra版", msrp: "27.98万", owner: "26.01万", year: 2025, tags: ["1.5T", "四驱"] },
        { name: "210KM 乾崑Ultra版", msrp: "29.48万", owner: "29.28万", year: 2025, tags: ["1.5T", "四驱"] },
        { name: "210KM 云辇乾崑Ultra+版", msrp: "32.98万", year: 2025, tags: ["1.5T", "四驱"] },
      ] },
  },
  bao8: {
    ah: { seriesId: "7353", name: "豹8", msrp: "41.98-42.78万", score: "4.54", level: "中大型SUV", hotSpec: "2026款 闪充 五座版", koubei: [{ k: "空间", v: 4.6 }, { k: "驾驶感受", v: 4.49 }, { k: "续航", v: 4.36 }, { k: "外观", v: 4.74 }, { k: "内饰", v: 4.48 }, { k: "性价比", v: 4.39 }, { k: "智能化", v: 4.71 }], tags: ["悬架减震舒适", "行驶稳定性好", "内饰材质满意"] },
    dcd: { seriesId: "9246", name: "豹8", msrp: "41.98-42.78万", trims: [
        { name: "闪充五座版", msrp: "41.98万", owner: "41.73万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "闪充七座版", msrp: "41.98万", owner: "41.38万", year: 2026, tags: ["2.0T", "四驱", "7座"] },
        { name: "闪充六座版", msrp: "42.78万", owner: "42.60万", year: 2026, tags: ["2.0T", "四驱", "6座"] },
      ] },
  },
  "bao-ti3": {
    ah: { seriesId: "7356", name: "钛3", msrp: "14.38-16.98万", score: "4.42", rangeKm: "620", level: "紧凑型SUV", hotSpec: "2026款 620KM 后驱闪充版", koubei: [{ k: "空间", v: 4.34 }, { k: "驾驶感受", v: 4.32 }, { k: "续航", v: 4.38 }, { k: "外观", v: 4.63 }, { k: "内饰", v: 4.23 }, { k: "性价比", v: 4.57 }, { k: "智能化", v: 4.46 }], tags: ["储物空间设计合理", "方向盘轻重合理", "悬架减震舒适"] },
    dcd: { seriesId: "9249", name: "钛3", msrp: "14.38-16.98万", trims: [
        { name: "510KM 后驱闪充版", msrp: "14.38万", owner: "14.38万", year: 2026, tags: ["620KM", "后驱"] },
        { name: "620KM 后驱闪充版", msrp: "15.38万", owner: "15.38万", year: 2026, tags: ["620KM", "后驱"] },
        { name: "565KM 四驱闪充版", msrp: "16.98万", owner: "16.98万", year: 2026, tags: ["565KM", "四驱"] },
      ] },
  },
  "yangwang-u8": {
    ah: { seriesId: "7003", name: "仰望U8", msrp: "100.8万", score: "4.71", rangeKm: "230", level: "大型SUV", hotSpec: "2026款 豪华版", koubei: [{ k: "空间", v: 5.0 }, { k: "驾驶感受", v: 5.0 }, { k: "续航", v: 5.0 }, { k: "外观", v: 5.0 }, { k: "内饰", v: 5.0 }, { k: "性价比", v: 4.0 }, { k: "智能化", v: 4.0 }], tags: ["车身霸气", "悬架减震舒适", "内饰材质满意"] },
    dcd: { seriesId: "6235", name: "仰望U8", msrp: "100.80万", trims: [
        { name: "标准版", msrp: "100.80万", owner: "100.80万", year: 2026, tags: ["0KM", "四驱"] },
      ] },
  },
  "yangwang-u9": {
    ah: { seriesId: "7116", name: "仰望U9", msrp: "180万", rangeKm: "450", level: "跑车", hotSpec: "2024款 标准版", tags: ["空间小", "加速强劲", "续航里程长"] },
    dcd: { seriesId: "6346", name: "仰望U9", msrp: "180.00万", trims: [
        { name: "标准版", msrp: "180.00万", owner: "165.00万", year: 2024, tags: ["450KM", "小型车"] },
      ] },
  },
  "denza-d9": {
    ah: { seriesId: "6669", name: "腾势D9", msrp: "30.98-60.06万", score: "4.59", rangeKm: "800", level: "中大型MPV", hotSpec: "2026款 第二代 DM-i 四驱闪充尊贵型", koubei: [{ k: "空间", v: 4.74 }, { k: "驾驶感受", v: 4.36 }, { k: "续航", v: 4.74 }, { k: "外观", v: 4.62 }, { k: "内饰", v: 4.52 }, { k: "性价比", v: 4.56 }, { k: "智能化", v: 4.57 }], tags: ["舒适性不错", "内饰材质满意", "储物空间设计合理"] },
    dcd: { seriesId: "5843", name: "腾势D9 DM", msrp: "30.98-60.06万", trims: [
        { name: "闪充豪华型", msrp: "32.98万", year: 2026 },
        { name: "闪充尊贵型", msrp: "35.98万", owner: "33.85万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "闪充尊荣型", msrp: "39.98万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "闪充旗舰型", msrp: "45.98万", year: 2026, tags: ["1.5T", "7座"] },
        { name: "两驱尊航型", msrp: "30.98万", owner: "29.00万", year: 2025, tags: ["1.5T", "7座"] },
        { name: "四驱尊航型", msrp: "32.98万", owner: "30.63万", year: 2025, tags: ["1.5T", "7座"] },
        { name: "四驱至尊型", msrp: "45.98万", owner: "37.98万", year: 2025, tags: ["1.5T", "7座"] },
        { name: "PIONEER 四座创领版", msrp: "60.06万", owner: "60.06万", year: 2024, tags: ["1.5T", "4座"] },
      ], siblings: [
        { name: "腾势D9 EV", seriesId: "5842", msrp: "31.98-46.98万", trims: [
          { name: "闪充尊贵型", msrp: "36.98万", year: 2026, tags: ["800KM", "7座"] },
          { name: "闪充尊荣型", msrp: "40.98万", year: 2026, tags: ["750KM", "7座"] },
          { name: "闪充旗舰型", msrp: "46.98万", year: 2026, tags: ["750KM", "7座"] },
          { name: "两驱尊航型", msrp: "31.98万", owner: "31.98万", year: 2025, tags: ["620KM", "7座"] },
          { name: "智驾版 620 两驱豪华型", msrp: "34.98万", owner: "32.38万", year: 2025, tags: ["620KM", "7座"] },
          { name: "智驾版 600 四驱尊贵型", msrp: "40.98万", year: 2025, tags: ["600KM", "7座"] },
          { name: "智驾版 600 四驱旗舰型", msrp: "46.98万", owner: "46.00万", year: 2025, tags: ["600KM", "7座"] },
        ] },
      ] },
  },
  "denza-n7": {
    ah: { seriesId: "6898", name: "腾势N7", msrp: "25.98-28.98万", score: "4.49", rangeKm: "702", level: "中型SUV", hotSpec: "2025款 702 智驾双激光尊荣版", koubei: [{ k: "空间", v: 4.6 }, { k: "驾驶感受", v: 4.62 }, { k: "续航", v: 3.93 }, { k: "外观", v: 4.44 }, { k: "内饰", v: 4.74 }, { k: "性价比", v: 4.74 }, { k: "智能化", v: 4.36 }], tags: ["续航里程小", "舒适性满意", "加速强劲"] },
    dcd: { seriesId: "6360", name: "腾势N7", msrp: "25.98-28.98万", trims: [
        { name: "702 两驱智驾双激光尊荣版", msrp: "25.98万", owner: "19.90万", year: 2025, tags: ["702KM", "后驱"] },
        { name: "702 两驱智驾双激光猎影版", msrp: "25.98万", owner: "24.64万", year: 2025, tags: ["702KM", "后驱"] },
        { name: "630 四驱智驾双激光旗舰版", msrp: "28.98万", owner: "22.32万", year: 2025, tags: ["630KM", "四驱"] },
      ] },
  },
  "denza-n9": {
    ah: { seriesId: "7839", name: "腾势N9", msrp: "38.98-46.98万", score: "4.51", rangeKm: "420", level: "大型SUV", hotSpec: "2026款 闪充 旗舰型", koubei: [{ k: "空间", v: 4.53 }, { k: "驾驶感受", v: 4.57 }, { k: "续航", v: 4.57 }, { k: "外观", v: 4.46 }, { k: "内饰", v: 4.47 }, { k: "性价比", v: 4.51 }, { k: "智能化", v: 4.47 }], tags: ["行驶稳定性不错", "悬架减震舒适", "内饰材质好"] },
    dcd: { seriesId: "24726", name: "腾势N9 DM", msrp: "38.98-46.98万", trims: [
        { name: "闪充尊荣型", msrp: "40.98万", year: 2026, tags: ["2.0T", "四驱"] },
        { name: "闪充尊越型", msrp: "43.98万", owner: "42.98万", year: 2026, tags: ["2.0T", "四驱"] },
        { name: "闪充旗舰型", msrp: "46.98万", owner: "46.45万", year: 2026, tags: ["2.0T", "四驱"] },
        { name: "尊荣型", msrp: "38.98万", owner: "38.41万", year: 2026, tags: ["2.0T", "四驱"] },
        { name: "尊越型", msrp: "40.98万", owner: "40.98万", year: 2026, tags: ["2.0T", "四驱"] },
        { name: "旗舰型", msrp: "44.98万", owner: "43.24万", year: 2026, tags: ["2.0T", "四驱"] },
      ] },
  },
  tiggo9: {
    ah: { seriesId: "7072", name: "瑞虎9", msrp: "14.79-20.39万", score: "4.55", level: "中型SUV", hotSpec: "2027款 2.0T 自动四驱猎鹰500版", koubei: [{ k: "空间", v: 4.68 }, { k: "驾驶感受", v: 4.64 }, { k: "油耗", v: 4.02 }, { k: "外观", v: 4.58 }, { k: "内饰", v: 4.6 }, { k: "性价比", v: 4.61 }, { k: "配置", v: 4.73 }], tags: ["换挡平顺", "内饰材质不错", "悬架减震舒适"] },
    dcd: { seriesId: "6227", name: "瑞虎9", msrp: "14.79-20.39万", trims: [
        { name: "2.0T DCT两驱豪享版", msrp: "15.99万", owner: "13.93万", year: 2027, tags: ["2.0T", "前驱"] },
        { name: "2.0T DCT两驱奢享版", msrp: "16.89万", owner: "15.04万", year: 2027, tags: ["2.0T", "前驱"] },
        { name: "2.0T AT两驱臻享版", msrp: "17.19万", owner: "14.82万", year: 2027, tags: ["2.0T", "前驱"] },
        { name: "2.0T AT四驱猎鹰500版", msrp: "17.99万", owner: "16.20万", year: 2027, tags: ["2.0T", "四驱"] },
        { name: "9X 2.0T AT前驱豪华型", msrp: "14.79万", owner: "12.04万", year: 2026, tags: ["2.0T", "前驱"] },
        { name: "9X 2.0T AT前驱尊贵型", msrp: "15.79万", owner: "13.01万", year: 2026, tags: ["2.0T", "前驱"] },
        { name: "9X 2.0T AT前驱领航型", msrp: "16.99万", owner: "15.01万", year: 2026, tags: ["2.0T", "前驱"] },
        { name: "2.0T DCT两驱舒享版", msrp: "15.29万", owner: "13.22万", year: 2026, tags: ["2.0T", "前驱"] },
      ], siblings: [
        { name: "瑞虎9 C-DM", seriesId: "8973", msrp: "16.59-18.59万", trims: [
          { name: "106km 悦享版", msrp: "16.59万", owner: "15.49万", year: 2026, tags: ["1.5T", "前驱"] },
          { name: "106km 超享版", msrp: "17.59万", owner: "15.30万", year: 2026, tags: ["1.5T", "前驱"] },
          { name: "210km 超享版", msrp: "18.59万", owner: "16.20万", year: 2026, tags: ["1.5T", "前驱"] },
          { name: "106km 悦享版 三元锂", msrp: "16.59万", owner: "14.71万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "106km 悦享版 磷酸铁锂", msrp: "16.59万", owner: "14.13万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "106km 超享版 三元锂", msrp: "17.59万", owner: "15.47万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "106km 超享版 磷酸铁锂", msrp: "17.59万", owner: "15.32万", year: 2025, tags: ["1.5T", "前驱"] },
        ] },
      ] },
  },
  "tiggo8-plus": {
    ah: { seriesId: "5884", name: "瑞虎8 PLUS", msrp: "11.99-14.49万", score: "4.53", level: "中型SUV", hotSpec: "2027款 310TGDI DCT 非凡冠军猎鹰500版", koubei: [{ k: "空间", v: 4.55 }, { k: "驾驶感受", v: 4.59 }, { k: "油耗", v: 4.33 }, { k: "外观", v: 4.59 }, { k: "内饰", v: 4.52 }, { k: "性价比", v: 4.54 }, { k: "配置", v: 4.57 }], tags: ["油耗低", "加速强劲", "后备厢空间大"] },
    dcd: { seriesId: "4711", name: "瑞虎8 PLUS", msrp: "11.99-14.49万", trims: [
        { name: "鲲鹏310TGDI DCT非凡冠军豪华版", msrp: "12.99万", owner: "10.30万", year: 2027 },
        { name: "鲲鹏310TGDI DCT非凡冠军猎鹰500版", msrp: "14.49万", owner: "12.04万", year: 2027 },
        { name: "鲲鹏290TGDI DCT经典版", msrp: "11.99万", owner: "8.90万", year: 2025, tags: ["1.6T", "前驱", "5/7座"] },
        { name: "鲲鹏290TGDI DCT乘风版", msrp: "12.19万", owner: "9.59万", year: 2025, tags: ["1.6T", "前驱", "5/7座"] },
        { name: "鲲鹏290TGDI DCT 乘势版", msrp: "12.99万", owner: "10.07万", year: 2025, tags: ["1.6T", "前驱", "5/7座"] },
        { name: "冠军版 鲲鹏290TGDI DCT豪悦版 5座", msrp: "12.69万", owner: "9.98万", year: 2024, tags: ["1.6T", "前驱", "5座"] },
        { name: "冠军版 鲲鹏290TGDI DCT豪悦版 7座", msrp: "12.99万", owner: "9.90万", year: 2024, tags: ["1.6T", "前驱", "7座"] },
        { name: "冠军版 鲲鹏290TGDI DCT豪悦版 7座" },
      ], siblings: [
        { name: "瑞虎8 PLUS C-DM", seriesId: "24756", msrp: "12.99-15.59万", trims: [
          { name: "1.5T 舒适型", msrp: "12.99万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "1.5T 豪华型", msrp: "14.29万", owner: "12.59万", year: 2025, tags: ["1.5T", "前驱"] },
          { name: "1.5T 尊贵型", msrp: "15.59万", owner: "11.75万", year: 2025, tags: ["1.5T", "前驱"] },
        ] },
      ] },
  },
  "fulwin-t9": {
    ah: { seriesId: "7442", name: "风云T9", msrp: "11.99-15.99万", score: "4.51", rangeKm: "220", level: "中型SUV", hotSpec: "2026款 220 长续航尊荣型", koubei: [{ k: "空间", v: 4.67 }, { k: "驾驶感受", v: 4.67 }, { k: "续航", v: 4.56 }, { k: "外观", v: 4.31 }, { k: "内饰", v: 4.57 }, { k: "性价比", v: 4.56 }, { k: "智能化", v: 4.21 }], tags: ["油耗低", "后排空间够用", "悬架减震舒适"] },
    dcd: { seriesId: "9500", name: "风云T9", msrp: "11.99-15.59万", trims: [
        { name: "220长续航 尊贵型", msrp: "11.99万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "220长续航 尊荣型", msrp: "12.99万", owner: "11.09万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "220长续航 旗舰型", msrp: "13.99万", owner: "13.18万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "120KM 长续航尊贵型 磷酸铁锂", msrp: "13.29万", owner: "11.37万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "120KM 长续航尊荣型 磷酸铁锂", msrp: "14.29万", owner: "11.98万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "120KM 长续航旗舰型 磷酸铁锂", msrp: "15.59万", owner: "13.11万", year: 2025, tags: ["1.5T", "前驱"] },
      ] },
  },
  "fulwin-a8": {
    ah: { seriesId: "7154", name: "风云A8", msrp: "7.99-10.99万", score: "4.55", rangeKm: "145", level: "紧凑型车", hotSpec: "2025款 70km 基本型", koubei: [{ k: "空间", v: 4.64 }, { k: "驾驶感受", v: 4.69 }, { k: "续航", v: 4.27 }, { k: "外观", v: 4.95 }, { k: "内饰", v: 4.64 }, { k: "性价比", v: 4.53 }, { k: "智能化", v: 4.12 }], tags: ["续航里程长", "后排空间够用", "方向盘轻重合理"] },
    dcd: { seriesId: "8808", name: "风云A8", msrp: "7.99-10.99万", trims: [
        { name: "70km 基本型", msrp: "7.99万", owner: "7.56万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "70km 标准型", msrp: "8.79万", owner: "8.49万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "70km 舒适型", msrp: "9.39万", year: 2025, tags: ["1.5L", "前驱"] },
        { name: "145km 舒适型", msrp: "9.99万", owner: "8.59万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "145km 豪华型", msrp: "10.99万", owner: "9.83万", year: 2025, tags: ["1.5T", "前驱"] },
      ] },
  },
  "luxeed-s7": {
    ah: { seriesId: "7355", name: "智界S7", msrp: "22.98-29.98万", score: "4.56", rangeKm: "855", level: "中大型车", hotSpec: "2026款 Max (192线激光雷达）", koubei: [{ k: "空间", v: 4.44 }, { k: "驾驶感受", v: 4.53 }, { k: "续航", v: 4.58 }, { k: "外观", v: 4.59 }, { k: "内饰", v: 4.48 }, { k: "性价比", v: 4.61 }, { k: "智能化", v: 4.69 }], tags: ["空间够用", "后排空间够用", "外型设计耐看"] },
    dcd: { seriesId: "9225", name: "智界S7", msrp: "22.98-29.98万", trims: [
        { name: "Max 三元锂(896线激光雷达)", msrp: "23.98万", owner: "23.98万", year: 2026, tags: ["705KM", "后驱"] },
        { name: "Max 三元锂+磷酸铁锂(896线激光雷达)", msrp: "23.98万", year: 2026, tags: ["705KM", "后驱"] },
        { name: "Max+(896线激光雷达)", msrp: "25.98万", year: 2026, tags: ["855KM", "后驱"] },
        { name: "Ultra(896线激光雷达)", msrp: "29.98万", year: 2026, tags: ["785KM", "四驱"] },
        { name: "Max 三元锂(192线激光雷达)", msrp: "22.98万", owner: "22.98万", year: 2026, tags: ["705KM", "后驱"] },
        { name: "Max 三元锂+磷酸铁锂(192线激光雷达)", msrp: "22.98万", owner: "21.00万", year: 2026, tags: ["705KM", "后驱"] },
        { name: "Max+(192线激光雷达)", msrp: "24.98万", owner: "24.98万", year: 2026, tags: ["855KM", "后驱"] },
        { name: "Ultra(192线激光雷达)", msrp: "28.98万", owner: "28.39万", year: 2026, tags: ["785KM", "四驱"] },
      ] },
  },
  "luxeed-r7": {
    ah: { seriesId: "7730", name: "智界R7", msrp: "24.98-31.98万", score: "4.53", rangeKm: "802", level: "中大型SUV", hotSpec: "2026款 纯电 Max+(896线激光雷达）", koubei: [{ k: "空间", v: 4.72 }, { k: "驾驶感受", v: 4.76 }, { k: "续航", v: 4.08 }, { k: "外观", v: 4.82 }, { k: "内饰", v: 4.48 }, { k: "性价比", v: 4.14 }, { k: "智能化", v: 4.7 }], tags: ["座椅舒适", "续航里程长", "前排头部空间大"] },
    dcd: { seriesId: "10180", name: "智界R7", msrp: "24.98-31.98万", trims: [
        { name: "增程 Max(896线激光雷达)", msrp: "25.98万", year: 2026, tags: ["201KM", "后驱"] },
        { name: "增程 Max+(896线激光雷达)", msrp: "27.98万", owner: "23.98万", year: 2026, tags: ["284KM", "后驱"] },
        { name: "增程 UItra(896线激光雷达)", msrp: "31.98万", year: 2026, tags: ["258KM", "四驱"] },
        { name: "纯电 Max(896线激光雷达)", msrp: "25.98万", owner: "26.08万", year: 2026, tags: ["667KM", "后驱"] },
        { name: "纯电 Max+(896线激光雷达)", msrp: "27.98万", owner: "27.20万", year: 2026, tags: ["802KM", "后驱"] },
        { name: "纯电 UItra(896线激光雷达)", msrp: "31.98万", year: 2026, tags: ["736KM", "四驱"] },
        { name: "增程 Max(192线激光雷达)", msrp: "24.98万", owner: "25.02万", year: 2026, tags: ["201KM", "后驱"] },
        { name: "增程 Max+(192线激光雷达)", msrp: "26.98万", owner: "26.98万", year: 2026, tags: ["284KM", "后驱"] },
      ] },
  },
  "stera-et": {
    ah: { seriesId: "7174", name: "星纪元 ET", msrp: "18.98-31.98万", score: "4.55", rangeKm: "760", level: "中大型SUV", hotSpec: "2025款 增程 265 Pro两驱高速辅助驾驶", koubei: [{ k: "空间", v: 4.9 }, { k: "驾驶感受", v: 4.81 }, { k: "续航", v: 4.34 }, { k: "外观", v: 4.77 }, { k: "内饰", v: 4.41 }, { k: "性价比", v: 4.66 }, { k: "智能化", v: 3.96 }], tags: ["舒适性满意", "加速强劲", "续航里程长"] },
    dcd: { seriesId: "8966", name: "星纪元ET", msrp: "18.98-30.18万", trims: [
        { name: "增程版 Pro高速辅助驾驶", msrp: "18.98万", owner: "17.49万", year: 2025, tags: ["215KM", "后驱"] },
        { name: "增程版 Max城区辅助驾驶", msrp: "20.98万", owner: "19.98万", year: 2025, tags: ["215KM", "后驱"] },
        { name: "增程版 Pro四驱高速辅助驾驶", msrp: "20.98万", owner: "19.36万", year: 2025, tags: ["200KM", "四驱"] },
        { name: "增程版 Max四驱城区辅助驾驶", msrp: "23.98万", owner: "23.71万", year: 2025, tags: ["200KM", "四驱"] },
        { name: "增程版 四驱总裁版", msrp: "28.98万", year: 2025, tags: ["200KM", "四驱"] },
        { name: "增程版 四驱至臻尊享", msrp: "30.18万", year: 2025, tags: ["200KM", "四驱"] },
        { name: "纯电版 Max城区辅助驾驶", msrp: "23.98万", owner: "24.55万", year: 2025, tags: ["760KM", "后驱"] },
        { name: "纯电版 Ultra四驱城区辅助驾驶", msrp: "27.98万", year: 2025, tags: ["655KM", "四驱"] },
      ] },
  },
  "exeed-yaoguang": {
    ah: { seriesId: "6170", name: "星途瑶光", msrp: "13.79-23.38万", score: "4.86", level: "中型SUV", hotSpec: "2027款 400T 曜夜版", koubei: [{ k: "空间", v: 4.0 }, { k: "驾驶感受", v: 5.0 }, { k: "油耗", v: 5.0 }, { k: "外观", v: 5.0 }, { k: "内饰", v: 5.0 }, { k: "性价比", v: 5.0 }, { k: "配置", v: 5.0 }], tags: ["后排空间大", "舒适性满意", "加速强劲"] },
    dcd: { seriesId: "5953", name: "星途瑶光", msrp: "13.79-15.29万", trims: [
        { name: "400T 两驱寰球版", msrp: "13.79万", year: 2027, tags: ["2.0T", "前驱"] },
        { name: "400T 两驱曜夜版", msrp: "15.29万", year: 2027, tags: ["2.0T", "前驱"] },
        { name: "400T 两驱寰球版", msrp: "13.99万", owner: "12.17万", year: 2026, tags: ["2.0T", "前驱"] },
      ], siblings: [
        { name: "星途瑶光C-DM", seriesId: "8967", msrp: "13.79-21.88万", trims: [
          { name: "寰球版 120长续航两驱", msrp: "13.79万", year: 2027 },
          { name: "寰球版 120长续航两驱", msrp: "13.99万", owner: "10.07万", year: 2026, tags: ["1.5T", "前驱"] },
          { name: "寰球版 210超长续航两驱", msrp: "16.99万", owner: "16.90万", year: 2026, tags: ["1.5T", "前驱"] },
          { name: "寰球版 200超长续航四驱", msrp: "18.99万", owner: "17.50万", year: 2026, tags: ["1.5T", "四驱"] },
          { name: "星界版", msrp: "21.88万", year: 2025, tags: ["1.5T", "前驱"] },
        ] },
      ] },
  },
  "jetour-traveler": {
    ah: { seriesId: "6606", name: "捷途旅行者", msrp: "13.99-23.99万", score: "4.60", level: "紧凑型SUV", hotSpec: "2026款 2.0TD XWD 发现", koubei: [{ k: "空间", v: 4.62 }, { k: "驾驶感受", v: 4.61 }, { k: "油耗", v: 3.99 }, { k: "外观", v: 4.81 }, { k: "内饰", v: 4.74 }, { k: "性价比", v: 4.74 }, { k: "配置", v: 4.66 }], tags: ["油耗低", "储物空间设计合理", "加速强劲"] },
    dcd: { seriesId: "5563", name: "捷途旅行者", msrp: "13.99-23.99万", trims: [
        { name: "1.5TD 探索", msrp: "13.99万", owner: "11.79万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
        { name: "1.5TD 探索+", msrp: "14.99万", owner: "12.45万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
        { name: "2.0TD XWD发现", msrp: "15.99万", owner: "14.21万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "骏马版 2.0TD XWD发现", msrp: "16.29万", owner: "13.29万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "2.0TD XWD穿越", msrp: "16.99万", owner: "14.84万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "骏马版 2.0TD XWD穿越", msrp: "17.29万", owner: "15.12万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "2.0TD XWD征服", msrp: "17.99万", owner: "15.25万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
        { name: "PLUS 2.0TD XWD征服 5座", msrp: "17.79万", owner: "15.27万", year: 2026, tags: ["2.0T", "四驱", "5座"] },
      ], siblings: [
        { name: "捷途旅行者C-DM", seriesId: "8943", msrp: "15.99-23.99万", trims: [
          { name: "1.5TD DHT 129km 探索", msrp: "15.99万", owner: "15.64万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
          { name: "1.5TD DHT 129km 发现", msrp: "16.99万", owner: "16.15万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
          { name: "1.5TD DHT 212km 穿越", msrp: "18.49万", owner: "17.84万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
          { name: "1.5TD DHT 211km XWD 征服", msrp: "19.49万", owner: "18.12万", year: 2026, tags: ["1.5T", "四驱", "5座"] },
          { name: "1.5TD DHT 212km 华为乾崑智驾", msrp: "20.99万", owner: "20.00万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
          { name: "1.5TD DHT 211km XWD 华为乾崑智驾", msrp: "21.99万", owner: "20.88万", year: 2026, tags: ["1.5T", "四驱", "5座"] },
          { name: "PLUS 1.5TD DHT 129km 穿越 5座", msrp: "17.79万", owner: "17.00万", year: 2026, tags: ["1.5T", "前驱", "5座"] },
          { name: "PLUS 1.5TD DHT 129km 穿越 7座", msrp: "17.99万", year: 2026, tags: ["1.5T", "前驱", "7座"] },
        ] },
      ] },
  },
  "jetour-l7": {
    ah: { seriesId: "7711", name: "捷途山海L7", msrp: "11.49-22.78万", score: "4.12", rangeKm: "130", level: "中型SUV", hotSpec: "2026款 1.5T 130km 豪华版 5座", koubei: [{ k: "空间", v: 4.16 }, { k: "驾驶感受", v: 4.31 }, { k: "续航", v: 3.8 }, { k: "外观", v: 4.57 }, { k: "内饰", v: 4.27 }, { k: "性价比", v: 3.99 }, { k: "智能化", v: 3.78 }], tags: ["悬架减震不舒适", "舒适性不错", "转向精准"] },
    dcd: { seriesId: "10147", name: "捷途山海L7", msrp: "11.49-22.38万", trims: [
        { name: "超越版 130km 舒适版", msrp: "11.49万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "超越版 130km 豪华版", msrp: "12.49万", owner: "11.20万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "超越版 130km 豪华版+", msrp: "12.79万", year: 2026, tags: ["1.5T", "前驱"] },
        { name: "1.5TD DHT 舒享版", msrp: "14.98万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "1.5TD DHT 乐享版", msrp: "21.58万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "1.5TD DHT 尚享版", msrp: "22.38万", year: 2025, tags: ["1.5T", "前驱"] },
        { name: "1.5TD DHT PRO", msrp: "12.98万", owner: "11.70万", year: 2024, tags: ["1.5T", "前驱"] },
        { name: "1.5TD DHT MAX", msrp: "14.28万", owner: "12.53万", year: 2024, tags: ["1.5T", "前驱"] },
      ] },
  },
  "icar-v27": {
    ah: { seriesId: "8232", name: "iCAR V27", msrp: "16.98-19.68万", score: "4.49", level: "中大型SUV", hotSpec: "2026款 200KM四驱猎鹰500", koubei: [{ k: "空间", v: 4.51 }, { k: "驾驶感受", v: 4.68 }, { k: "续航", v: 4.09 }, { k: "外观", v: 4.71 }, { k: "内饰", v: 4.43 }, { k: "性价比", v: 4.64 }, { k: "智能化", v: 4.34 }], tags: ["行驶稳定性满意", "悬架减震舒适", "储物空间设计合理"] },
    dcd: { seriesId: "25620", name: "iCAR V27", msrp: "16.98-19.68万", trims: [
        { name: "210km 两驱猎鹰500", msrp: "16.98万", owner: "15.92万", year: 2026, tags: ["150KM", "后驱"] },
        { name: "200km 四驱猎鹰500", msrp: "18.28万", owner: "17.89万", year: 2026, tags: ["145KM", "四驱"] },
        { name: "200km 四驱猎鹰700", msrp: "19.68万", owner: "18.11万", year: 2026, tags: ["145KM", "四驱"] },
      ] },
  },
};

export function ahUrl(id: string, kind: "home" | "spec" | "koubei" = "home") {
  if (kind === "spec") return `https://www.autohome.com.cn/config/series/${id}.html`;
  if (kind === "koubei") return `https://k.autohome.com.cn/${id}/`;
  return `https://www.autohome.com.cn/${id}/`;
}

export function dcdUrl(id: string) {
  return `https://www.dongchedi.com/auto/series/${id}`;
}

export function dcdSearch(name: string) {
  return `https://www.dongchedi.com/search?keyword=${encodeURIComponent(name)}`;
}
