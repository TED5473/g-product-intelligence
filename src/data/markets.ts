/* Local-market offers captured 2026-09-02.
 * CN: official 限时价 first, else Autohome 厂商指导价, else 懂车帝 / 参配.
 * MX / IL / MA: only models printed on local official or mainstream auto sites.
 * Never invent a price.
 *
 * Same-car local names (verified):
 *   领克 Z20 = 以色列/摩洛哥/欧洲 官网 Lynk & Co 02（纯电）
 *   海鸥 = MX Dolphin Mini / IL Dolphin Surf / MA Seagull
 *   元 PLUS = IL Atto 3 EVO / MA Atto 3 / MX Yuan Plus
 *   元 UP = IL Atto 2
 *   秦 PLUS = MX King
 * Never map:
 *   国内 02 Hatchback ≠ 出口纯电 02（那是 Z20）
 *   国内新款 800V 领克20 ≠ Z20 / 出口 02
 *   Song L ≠ Song Plus · Seal ≠ 海豹06 · Sealion 7 ≠ 海狮06
 */
import { CONFIG_TRIMS } from "@/data/config-trims";
import { ahUrl, dcdUrl, mediaFor } from "@/data/media-intel";
import { officialFor, officialPriceTag } from "@/data/official-intel";

export type MarketId = "CN" | "MX" | "IL" | "MA";

export type ListingStatus = "listed" | "unlisted" | "coming";
export type PriceKind = "official" | "guide" | "media" | "tba";

export type MarketLink = { title: string; url: string };

export type MarketMeta = {
  id: MarketId;
  name: string;
  nameEn: string;
  currency: string;
  captured: string;
};

export type MarketOffer = {
  status: ListingStatus;
  localName?: string;
  price?: string;
  priceTag?: string;
  kind?: PriceKind;
  note?: string;
  officialUrl?: string;
  mediaUrl?: string;
  mediaName?: string;
  captured?: string;
  trims?: { name: string; price: string }[];
};

export const MARKET_CAPTURED = "2026-09-02";

export const MARKETS: MarketMeta[] = [
  { id: "CN", name: "中国", nameEn: "China", currency: "CNY", captured: MARKET_CAPTURED },
  { id: "MX", name: "墨西哥", nameEn: "Mexico", currency: "MXN", captured: MARKET_CAPTURED },
  { id: "IL", name: "以色列", nameEn: "Israel", currency: "ILS", captured: MARKET_CAPTURED },
  { id: "MA", name: "摩洛哥", nameEn: "Morocco", currency: "MAD", captured: MARKET_CAPTURED },
];

export function isMarketId(v: unknown): v is MarketId {
  return v === "CN" || v === "MX" || v === "IL" || v === "MA";
}

export function parseMarket(v: unknown): MarketId {
  return isMarketId(v) ? v : "CN";
}

export function marketMeta(id: MarketId): MarketMeta {
  return MARKETS.find((m) => m.id === id) || MARKETS[0];
}

export type NameCard = {
  cn: string;
  local: Partial<Record<Exclude<MarketId, "CN">, string>>;
  aliases: string[];
  notThis?: string;
};

/** First-class CN ↔ export names. Do not alias 国内 02 Hatch / 新款 20 as 出口 02. */
export const NAME_CARDS: Record<string, NameCard> = {
  lynkz20: {
    cn: "Z20",
    local: { MX: "Lynk & Co 02", IL: "Lynk & Co 02", MA: "Lynk & Co 02" },
    aliases: ["z20", "领克z20", "领克 z20", "lynk 02", "lynk & co 02", "lynkco 02", "出口02", "出口 02", "出口纯电02"],
    notThis: "不是国内 02 Hatchback，不是国内新款 800V 领克20",
  },
  lynk02: {
    cn: "02 Hatchback",
    local: {},
    aliases: ["02 hatchback", "领克02两厢", "国内02"],
    notThis: "不是出口纯电 02（那是 Z20）",
  },
  lynk20: {
    cn: "20",
    local: {},
    aliases: ["领克20", "800v 20", "新款20"],
    notThis: "不是 Z20 / 出口纯电 02",
  },
  "byd-seagull": {
    cn: "海鸥",
    local: { MX: "Dolphin Mini", IL: "Dolphin Surf", MA: "Seagull" },
    aliases: ["dolphin mini", "dolphin surf", "seagull", "海鸥"],
    notThis: "不是海豚 / Dolphin",
  },
  "byd-yuan-plus": {
    cn: "元PLUS",
    local: { MX: "Yuan Plus", IL: "Atto 3 EVO", MA: "Atto 3" },
    aliases: ["atto 3", "atto 3 evo", "yuan plus", "元plus", "元 plus"],
  },
  "byd-yuan-up": {
    cn: "元UP",
    local: { IL: "Atto 2", MA: "Yuan Up" },
    aliases: ["atto 2", "yuan up", "元up"],
  },
  "byd-qin-plus": {
    cn: "秦PLUS",
    local: { MX: "King" },
    aliases: ["king", "qin plus", "秦plus"],
  },
  "byd-dolphin": {
    cn: "海豚",
    local: { MX: "Dolphin", IL: "Dolphin", MA: "Dolphin" },
    aliases: ["dolphin", "海豚"],
    notThis: "不是 Dolphin Mini / Dolphin Surf / 海鸥",
  },
  lynk01: {
    cn: "01",
    local: { MX: "Lynk & Co 01", IL: "Lynk & Co 01", MA: "Lynk & Co 01" },
    aliases: ["lynk 01", "lynk & co 01", "领克01"],
  },
  "08": {
    cn: "08",
    local: { MX: "Lynk & Co 08", IL: "Lynk & Co 08", MA: "Lynk & Co 08" },
    aliases: ["lynk 08", "lynk & co 08", "领克08"],
  },
  lynk06: {
    cn: "06",
    local: { MA: "Lynk & Co 06" },
    aliases: ["lynk 06", "lynk & co 06", "领克06"],
  },
  x: {
    cn: "X",
    local: { MX: "Zeekr X", IL: "Zeekr X", MA: "ZEEKR X" },
    aliases: ["zeekr x"],
  },
  "7x": {
    cn: "7X",
    local: { MX: "Zeekr 7X", IL: "Zeekr 7X", MA: "ZEEKR 7X" },
    aliases: ["zeekr 7x"],
  },
  "001": {
    cn: "001",
    local: { MX: "Zeekr 001", IL: "Zeekr 001", MA: "ZEEKR 001" },
    aliases: ["zeekr 001"],
  },
};

export function nameCard(id: string): NameCard | undefined {
  return NAME_CARDS[id];
}

export function localNameOf(id: string, market: MarketId): string | undefined {
  const c = NAME_CARDS[id];
  if (!c) return undefined;
  if (market === "CN") return c.cn;
  return c.local[market];
}

export function nameSearchBlob(id: string): string {
  const c = NAME_CARDS[id];
  if (!c) return "";
  return [c.cn, ...Object.values(c.local), ...c.aliases].filter(Boolean).join(" ");
}

export function shortLocalName(id: string, market: MarketId): string | undefined {
  const raw = localNameOf(id, market);
  if (!raw) return undefined;
  return raw
    .replace(/^Lynk & Co\s+/i, "")
    .replace(/^ZEEKR\s+/i, "")
    .replace(/^Zeekr\s+/i, "");
}

/** 在售有价 / 在售无价 / 当地目录未见 / 即将上市 */
export function offerStatusLabel(offer: MarketOffer, compact = false): string {
  if (offer.status === "coming") return "即将上市";
  if (offer.status === "unlisted") return compact ? "当地未见" : "当地目录未见";
  if (!offer.price && !offer.priceTag) return compact ? "未印价" : "在售 · 未印价";
  return "在售";
}

/** Brand hub per market. Missing hub = 当地官网未上架 that brand. */
export function marketBrandHub(brand: string, market: MarketId): MarketLink | null {
  if (market === "CN") {
    const site = officialFor({ id: "", brand }).brand?.site;
    const name = officialFor({ id: "", brand }).brand?.name;
    return site ? { title: `${name || brand}官网`, url: site } : null;
  }
  const map: Record<MarketId, Record<string, MarketLink>> = {
    CN: {},
    MX: {
      Zeekr: { title: "Zeekr México", url: "https://www.zeekrlife.com/es-mx/" },
      比亚迪: { title: "BYD México", url: "https://www.byd.com/mx" },
      Lynk: { title: "Lynk & Co México（Autocosmos 目录）", url: "https://www.autocosmos.com.mx/catalogo/vigente/lynk-and-co" },
    },
    IL: {
      Zeekr: { title: "Zeekr ישראל", url: "https://www.zeekrlife.com/he-il/" },
      Lynk: { title: "Lynk & Co Israel", url: "https://lynkco.co.il/" },
      比亚迪: { title: "BYD ישראל", url: "https://bydauto.co.il/" },
    },
    MA: {
      Zeekr: { title: "ZEEKR Morocco", url: "https://www.zeekrlife.com/en-ma/" },
      比亚迪: { title: "BYD Maroc", url: "https://www.byd.com/en-ma" },
      Lynk: { title: "Lynk & Co Maroc", url: "https://www.moteur.ma/fr/neuf/voiture/lynk-co/" },
    },
  };
  return map[market][brand] || null;
}

export function marketMediaHub(market: MarketId): MarketLink[] {
  if (market === "CN") {
    return [
      { title: "汽车之家", url: "https://www.autohome.com.cn/hangzhou/" },
      { title: "懂车帝", url: "https://www.dongchedi.com/" },
    ];
  }
  if (market === "MX") {
    return [
      { title: "Autocosmos", url: "https://www.autocosmos.com.mx/" },
      { title: "BYD Ventas", url: "https://bydventas.com/byd-precios/" },
      { title: "BYD México", url: "https://www.byd.com/mx" },
      { title: "Zeekr México", url: "https://www.zeekrlife.com/es-mx/" },
      { title: "Lynk & Co（Autocosmos）", url: "https://www.autocosmos.com.mx/catalogo/vigente/lynk-and-co" },
    ];
  }
  if (market === "IL") {
    return [
      { title: "auto.co.il", url: "https://www.auto.co.il/" },
      { title: "Lynk & Co Israel", url: "https://lynkco.co.il/" },
      { title: "Zeekr ישראל", url: "https://www.zeekrlife.com/he-il/" },
      { title: "BYD ישראל", url: "https://bydauto.co.il/" },
    ];
  }
  return [
    { title: "Wandaloo", url: "https://www.wandaloo.com/neuf/byd/" },
    { title: "O'Voiture", url: "https://ovoiture.ma/en/neuf/byd/" },
    { title: "BYD Maroc", url: "https://www.byd.com/en-ma" },
    { title: "ZEEKR Morocco", url: "https://www.zeekrlife.com/en-ma/" },
    { title: "Lynk & Co（Wandaloo）", url: "https://www.wandaloo.com/neuf/lynk-et-co/" },
  ];
}

function wanTag(msrp: string): string {
  const range = msrp.match(/([\d.]+)\s*[-–~至]\s*[\d.]+\s*万/);
  if (range) return `${range[1]}万起`;
  const m = msrp.match(/([\d.]+)\s*万/);
  return m ? `${m[1]}万起` : msrp;
}

function cnFromTrims(id: string): string | null {
  const trims = CONFIG_TRIMS[id] || [];
  const prices = trims.map((t) => t.msrp).filter((x): x is string => Boolean(x));
  if (!prices.length) return null;
  const nums = prices
    .map((p) => {
      const m = p.match(/([\d.]+)/);
      return m ? Number(m[1]) : NaN;
    })
    .filter((n) => Number.isFinite(n));
  if (nums.length >= 2) {
    const a = Math.min(...nums);
    const b = Math.max(...nums);
    return a === b ? `${a}万` : `${a}-${b}万`;
  }
  return prices[0];
}

function cnOffer(v: { id: string; brand: string }): MarketOffer {
  const { brand, car } = officialFor(v);
  const media = mediaFor(v);
  const captured = brand?.captured || MARKET_CAPTURED;
  if (car?.msrp) {
    return {
      status: "listed",
      price: car.msrp,
      priceTag: officialPriceTag(car.msrp) || wanTag(car.msrp),
      kind: "official",
      note: "官网限时价 / 指导价，活动会变。",
      officialUrl: car.url || brand?.site,
      captured,
    };
  }
  if (media?.ah?.msrp) {
    return {
      status: "listed",
      price: media.ah.msrp,
      priceTag: wanTag(media.ah.msrp),
      kind: "guide",
      note: "厂商指导价（汽车之家）。官网未印固定价，不编造。",
      officialUrl: car?.url || brand?.site,
      mediaUrl: ahUrl(media.ah.seriesId),
      mediaName: "汽车之家",
      captured: MARKET_CAPTURED,
    };
  }
  if (media?.dcd?.msrp) {
    return {
      status: "listed",
      price: media.dcd.msrp,
      priceTag: wanTag(media.dcd.msrp),
      kind: "guide",
      note: "懂车帝在售指导价。官网未印固定价，不编造。",
      officialUrl: car?.url || brand?.site,
      mediaUrl: dcdUrl(media.dcd.seriesId),
      mediaName: "懂车帝",
      captured: MARKET_CAPTURED,
    };
  }
  const span = cnFromTrims(v.id);
  if (span) {
    return {
      status: "listed",
      price: span,
      priceTag: wanTag(span),
      kind: "guide",
      note: "之家参配分配置价。",
      officialUrl: car?.url || brand?.site,
      captured: MARKET_CAPTURED,
    };
  }
  if (media?.ah) {
    const coming = media.ah.phase === "coming";
    return {
      status: coming ? "coming" : "listed",
      kind: "tba",
      note: coming
        ? "即将上市，之家暂无指导价，不编造。"
        : "之家有条目但未印指导价，不编造。",
      officialUrl: car?.url || brand?.site,
      mediaUrl: ahUrl(media.ah.seriesId),
      mediaName: "汽车之家",
      captured: MARKET_CAPTURED,
    };
  }
  return {
    status: "listed",
    kind: "tba",
    note: "官网未印固定价，之家 / 懂车帝条目待补，不编造。",
    officialUrl: car?.url || brand?.site,
    captured,
  };
}

function unlisted(v: { id: string; brand: string }, market: MarketId): MarketOffer {
  const hub = marketBrandHub(v.brand, market);
  if (v.id === "lynk02") {
    return {
      status: "unlisted",
      kind: "tba",
      note: "国内 02 Hatchback。以色列/摩洛哥在售纯电 02 是 Z20 的出口名，见 Lynk & Co Z20 车型页，不把两款合成一车。",
      officialUrl: hub?.url,
      captured: MARKET_CAPTURED,
    };
  }
  if (v.id === "lynk20") {
    return {
      status: "unlisted",
      kind: "tba",
      note: "国内新款 800V 领克20（autohome 8669），与 Z20 / 出口纯电 02 不是同一车。出口 02 见 Z20 车型页。",
      officialUrl: hub?.url,
      captured: MARKET_CAPTURED,
    };
  }
  return {
    status: "unlisted",
    kind: "tba",
    note: hub
      ? "当地官网未上架该车型，不编造价格。"
      : "当地官网未见该品牌在售目录，不编造。",
    officialUrl: hub?.url,
    captured: MARKET_CAPTURED,
  };
}

const IL: Record<string, MarketOffer> = {
  x: {
    status: "listed",
    localName: "Zeekr X",
    price: "₪169,990–186,990",
    priceTag: "₪169,990起",
    kind: "media",
    note: "官网 he-il 未印价。auto.co.il 在售价，不含牌照。",
    officialUrl: "https://www.zeekrlife.com/he-il/",
    mediaUrl: "https://www.auto.co.il/car/zeekr/x",
    mediaName: "auto.co.il",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "入门（auto.co.il）", price: "₪169,990" },
      { name: "高配（auto.co.il）", price: "₪186,990" },
    ],
  },
  "7x": {
    status: "listed",
    localName: "Zeekr 7X",
    price: "₪233,990–289,990",
    priceTag: "₪233,990起",
    kind: "media",
    note: "官网 he-il 未印价。auto.co.il 三档在售价。",
    officialUrl: "https://www.zeekrlife.com/he-il/",
    mediaUrl: "https://www.auto.co.il/car/zeekr/7x",
    mediaName: "auto.co.il",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "入门", price: "₪233,990" },
      { name: "中配", price: "₪262,990" },
      { name: "高配", price: "₪289,990" },
    ],
  },
  "001": {
    status: "listed",
    localName: "Zeekr 001",
    price: "₪283,990–344,990",
    priceTag: "₪283,990起",
    kind: "media",
    note: "官网 he-il 未印价。auto.co.il 在售价；evm.co.il 旧价 ₪269,990 不用。",
    officialUrl: "https://www.zeekrlife.com/he-il/",
    mediaUrl: "https://www.auto.co.il/car/zeekr/001",
    mediaName: "auto.co.il",
    captured: MARKET_CAPTURED,
  },
  lynk01: {
    status: "listed",
    localName: "Lynk & Co 01",
    price: "₪179,900起",
    priceTag: "₪179,900起",
    kind: "official",
    note: "lynkco.co.il 官网。Pro ₪179,900 / Halo ₪198,900。不含首年牌照 ₪2,450。",
    officialUrl: "https://lynkco.co.il/01",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Pro", price: "₪179,900" },
      { name: "Halo", price: "₪198,900" },
    ],
  },
  "08": {
    status: "listed",
    localName: "Lynk & Co 08",
    price: "₪229,900起",
    priceTag: "₪229,900起",
    kind: "official",
    note: "lynkco.co.il 官网。Pro ₪229,900 / Halo ₪249,900。不含牌照 ₪2,786。",
    officialUrl: "https://lynkco.co.il/08",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Pro", price: "₪229,900" },
      { name: "Halo", price: "₪249,900" },
    ],
  },
  lynk02: {
    status: "unlisted",
    kind: "tba",
    note: "国内 02 Hatchback。以色列官网纯电 02 是 Z20 出口名，挂在 Lynk & Co Z20 车型页。",
    officialUrl: "https://lynkco.co.il/",
    captured: MARKET_CAPTURED,
  },
  lynkz20: {
    status: "listed",
    localName: "Lynk & Co 02",
    price: "₪159,900–169,900",
    priceTag: "₪159,900起",
    kind: "official",
    note: "中国名 Z20。以色列官网当地名 02（纯电跨界 272 hp / 66 kWh），不是国内 02 Hatchback，不是国内新款 800V 领克20。lynkco.co.il Pro ₪159,900 / Halo ₪169,900，不含首年牌照 ₪2,450。",
    officialUrl: "https://lynkco.co.il/model/meet-the-02/",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Pro", price: "₪159,900" },
      { name: "Halo", price: "₪169,900" },
    ],
  },
  "byd-yuan-plus": {
    status: "listed",
    localName: "Atto 3 EVO",
    price: "₪154,990–164,990",
    priceTag: "₪154,990起",
    kind: "official",
    note: "当地名 Atto 3 EVO（元 PLUS 出口新世代），不回写中国参配。bydauto.co.il 官网从 ₪154,990；auto.co.il Design ₪154,990 / Excellence ₪164,990。",
    officialUrl: "https://bydauto.co.il/",
    mediaUrl: "https://www.auto.co.il/cars/byd/atto-3/",
    mediaName: "auto.co.il",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Design", price: "₪154,990" },
      { name: "Excellence", price: "₪164,990" },
    ],
  },
  "byd-seagull": {
    status: "listed",
    localName: "Dolphin Surf",
    price: "₪114,990–123,990",
    priceTag: "₪114,990起",
    kind: "media",
    note: "当地名 Dolphin Surf（海鸥出口名），不是海豚。carzone 新车价。官网未核对到印价。",
    officialUrl: "https://bydauto.co.il/",
    mediaUrl: "https://www.carzone.co.il/BYDAuto/",
    mediaName: "carzone.co.il",
    captured: MARKET_CAPTURED,
  },
  "byd-dolphin": {
    status: "listed",
    localName: "Dolphin",
    price: "₪149,990–156,990",
    priceTag: "₪149,990起",
    kind: "media",
    note: "当地名 Dolphin。carzone 新车价。不是 Dolphin Surf / 海鸥。",
    officialUrl: "https://bydauto.co.il/",
    mediaUrl: "https://www.carzone.co.il/BYDAuto/",
    mediaName: "carzone.co.il",
    captured: MARKET_CAPTURED,
  },
  "byd-yuan-up": {
    status: "listed",
    localName: "Atto 2",
    price: "₪148,990",
    priceTag: "₪148,990起",
    kind: "media",
    note: "当地名 Atto 2（元 UP 出口名）。carzone 新车 BEV 价。Atto 2 DMi 是另一套插混，不挂到纯电 元 UP。",
    officialUrl: "https://bydauto.co.il/",
    mediaUrl: "https://www.carzone.co.il/BYDAuto/",
    mediaName: "carzone.co.il",
    captured: MARKET_CAPTURED,
  },
};

const MX: Record<string, MarketOffer> = {
  "7x": {
    status: "listed",
    localName: "Zeekr 7X",
    price: "MXN $919,000–$989,000",
    priceTag: "MXN $919,000起",
    kind: "media",
    note: "官网 es-mx 未印价。Autocosmos 2025-09-30：Premium $919,000 / Flagship $989,000。",
    officialUrl: "https://www.zeekrlife.com/es-mx/",
    mediaUrl:
      "https://noticias.autocosmos.com.mx/2025/09/30/zeekr-7x-2026-llega-a-mexico-un-nuevo-suv-electrico-premium-chino-conoce-precios-y-versiones",
    mediaName: "Autocosmos",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Premium", price: "MXN $919,000" },
      { name: "Flagship", price: "MXN $989,000" },
    ],
  },
  x: {
    status: "listed",
    localName: "Zeekr X",
    kind: "tba",
    note: "官网 es-mx 已上架 X。Autocosmos 目录「Precio no disponible」，不编造。",
    officialUrl: "https://www.zeekrlife.com/es-mx/",
    mediaUrl: "https://www.autocosmos.com.mx/catalogo/vigente/zeekr/x",
    mediaName: "Autocosmos",
    captured: MARKET_CAPTURED,
  },
  "001": {
    status: "listed",
    localName: "Zeekr 001",
    kind: "tba",
    note: "官网 es-mx 已上架 001。Autocosmos 目录未印价，不编造。",
    officialUrl: "https://www.zeekrlife.com/es-mx/",
    mediaUrl: "https://www.autocosmos.com.mx/catalogo/vigente/zeekr/001",
    mediaName: "Autocosmos",
    captured: MARKET_CAPTURED,
  },
  "byd-seagull": {
    status: "listed",
    localName: "Dolphin Mini",
    price: "MXN $399,800–$415,800",
    priceTag: "MXN $399,800起",
    kind: "media",
    note: "当地名 Dolphin Mini（海鸥出口名），不是海豚。官网 mx 未印 $。bydventas / 经销商 2025-12-01。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Dolphin Mini", price: "MXN $399,800" },
      { name: "Dolphin Mini PLUS", price: "MXN $415,800" },
    ],
  },
  "byd-dolphin": {
    status: "listed",
    localName: "Dolphin",
    price: "MXN $553,900",
    priceTag: "MXN $553,900起",
    kind: "media",
    note: "当地媒体 bydventas 2025-12-01。官网 mx 未印 $。不是 Dolphin Mini。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
  },
  "byd-yuan-plus": {
    status: "listed",
    localName: "Yuan Plus EV",
    price: "MXN $799,000",
    priceTag: "MXN $799,000起",
    kind: "media",
    note: "bydventas / autosnuevos.mx。官网 mx 未印 $。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
  },
  "byd-qin-plus": {
    status: "listed",
    localName: "King",
    price: "MXN $499,800",
    priceTag: "MXN $499,800起",
    kind: "media",
    note: "当地名 King（秦 PLUS 拉美名）。bydventas 2025-12-01 King DM-i。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
  },
  "byd-han": {
    status: "listed",
    localName: "Han EV",
    price: "MXN $1,381,000",
    priceTag: "MXN $1,381,000起",
    kind: "media",
    note: "bydventas 2025-12-01 Han EV。官网 mx 未印 $。勿与汉 L 混挂。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
  },
  "byd-tang": {
    status: "listed",
    localName: "Tang EV",
    price: "MXN $1,399,000",
    priceTag: "MXN $1,399,000起",
    kind: "media",
    note: "bydventas 2025-12-01 Tang EV。官网 mx 未印 $。勿与唐 L 混挂。",
    officialUrl: "https://www.byd.com/mx",
    mediaUrl: "https://bydventas.com/byd-precios/",
    mediaName: "BYD Ventas",
    captured: MARKET_CAPTURED,
  },
  lynk01: {
    status: "listed",
    localName: "Lynk & Co 01",
    price: "MXN $729,000",
    priceTag: "MXN $729,000起",
    kind: "media",
    note: "Autocosmos 在售目录 Halo $729,000（页上印 1.5 L 汽油机；01 为 PHEV，不回写中国参配）。未见官方 mx 站印价。",
    mediaUrl: "https://www.autocosmos.com.mx/catalogo/vigente/lynk-and-co/01",
    mediaName: "Autocosmos",
    captured: MARKET_CAPTURED,
    trims: [{ name: "Halo", price: "MXN $729,000" }],
  },
  "08": {
    status: "listed",
    localName: "Lynk & Co 08",
    price: "MXN $837,900–$887,900",
    priceTag: "MXN $837,900起",
    kind: "media",
    note: "Autocosmos 在售目录 Pro $837,900 / Halo $887,900。页上印 1.5 L 汽油机（08 为 EM-P，不回写中国参配）。",
    mediaUrl: "https://www.autocosmos.com.mx/catalogo/vigente/lynk-and-co/08",
    mediaName: "Autocosmos",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Pro", price: "MXN $837,900" },
      { name: "Halo", price: "MXN $887,900" },
    ],
  },
  lynkz20: {
    status: "listed",
    localName: "Lynk & Co 02",
    kind: "tba",
    note: "墨西哥媒体（Radio Fórmula 2026-05）写 02 即中国 Z20 已在售。Autocosmos 目录 /02 /20 /z20 404，无印价，不编造。",
    mediaUrl:
      "https://www.radioformula.com.mx/autos/tecnologia-y-diseno-con-los-nuevos-02-y-08-de-lynk--co-20260507-0080.html",
    mediaName: "Radio Fórmula",
    captured: MARKET_CAPTURED,
  },
};

const MA: Record<string, MarketOffer> = {
  x: {
    status: "listed",
    localName: "ZEEKR X",
    kind: "tba",
    note: "官网 en-ma 已上架 X，未印价，不编造。",
    officialUrl: "https://www.zeekrlife.com/en-ma/",
    captured: MARKET_CAPTURED,
  },
  "7x": {
    status: "listed",
    localName: "ZEEKR 7X",
    kind: "tba",
    note: "官网 en-ma 已上架 7X，未印价，不编造。",
    officialUrl: "https://www.zeekrlife.com/en-ma/",
    captured: MARKET_CAPTURED,
  },
  "001": {
    status: "listed",
    localName: "ZEEKR 001",
    kind: "tba",
    note: "官网 en-ma 已上架 001，未印价，不编造。",
    officialUrl: "https://www.zeekrlife.com/en-ma/",
    captured: MARKET_CAPTURED,
  },
  "byd-seagull": {
    status: "listed",
    localName: "Seagull",
    price: "MAD 199,900",
    priceTag: "MAD 199,900起",
    kind: "media",
    note: "ovoiture.ma 当地媒体。官网 en-ma 已上架 Seagull，未印价。",
    officialUrl: "https://www.byd.com/en-ma",
    mediaUrl: "https://ovoiture.ma/en/neuf/byd/seagull/",
    mediaName: "O'Voiture",
    captured: MARKET_CAPTURED,
  },
  "byd-dolphin": {
    status: "listed",
    localName: "Dolphin",
    price: "MAD 269,000",
    priceTag: "MAD 269,000起",
    kind: "media",
    note: "ovoiture.ma。官网 en-ma 已上架 Dolphin，未印价。",
    officialUrl: "https://www.byd.com/en-ma",
    mediaUrl: "https://ovoiture.ma/en/neuf/byd/",
    mediaName: "O'Voiture",
    captured: MARKET_CAPTURED,
  },
  "byd-yuan-plus": {
    status: "listed",
    localName: "Atto 3",
    price: "MAD 339,900–369,900",
    priceTag: "MAD 339,900起",
    kind: "media",
    note: "当地名 Atto 3（元 PLUS 出口名）。wandaloo 目录 339,900–369,900。同目录另有 Atto 3 EVO 355,900–389,900，不把两代合成一个指导价。官网 en-ma 未印价。",
    officialUrl: "https://www.byd.com/en-ma",
    mediaUrl: "https://www.wandaloo.com/neuf/byd/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
  },
  "byd-han": {
    status: "listed",
    localName: "Han",
    price: "MAD 659,900",
    priceTag: "MAD 659,900起",
    kind: "official",
    note: "经销商官网 byd-maroc.com / wandaloo：HAN 659,900 DH。ovoiture 旧价 459k/599k 不用。勿与汉 L 混挂。",
    officialUrl: "https://byd-maroc.com/",
    mediaUrl: "https://www.wandaloo.com/neuf/byd/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
  },
  "byd-tang": {
    status: "listed",
    localName: "Tang",
    price: "MAD 709,900",
    priceTag: "MAD 709,900起",
    kind: "media",
    note: "wandaloo 在售目录 709,900 DH。ovoiture 曾标 coming 预告 699,000，不用预告价。勿与唐 L 混挂。",
    officialUrl: "https://www.byd.com/en-ma",
    mediaUrl: "https://www.wandaloo.com/neuf/byd/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
  },
  "byd-yuan-up": {
    status: "coming",
    localName: "Yuan Up",
    kind: "tba",
    note: "ovoiture 标注 coming soon，价格 TBC，不编造。",
    officialUrl: "https://www.byd.com/en-ma",
    mediaUrl: "https://ovoiture.ma/en/neuf/byd/",
    mediaName: "O'Voiture",
    captured: MARKET_CAPTURED,
  },
  lynkz20: {
    status: "listed",
    localName: "Lynk & Co 02",
    price: "MAD 399,000",
    priceTag: "MAD 399,000起",
    kind: "media",
    note: "中国名 Z20。摩洛哥当地名 02，100% 电动 Halo 200 kW / 66 kWh / WLTP 435 km（wandaloo 399,000 DH）。不是国内 02 Hatchback，不是国内新款 800V 领克20。",
    mediaUrl: "https://www.wandaloo.com/neuf/lynk-et-co/02/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
    trims: [{ name: "02 Halo 200 kW AT", price: "MAD 399,000" }],
  },
  lynk01: {
    status: "listed",
    localName: "Lynk & Co 01",
    price: "MAD 340,000",
    priceTag: "MAD 340,000起",
    kind: "media",
    note: "wandaloo：01 1.5T 280 PHEV 340,000 DH。不回写中国参配。",
    mediaUrl: "https://www.wandaloo.com/neuf/lynk-et-co/01/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
  },
  lynk06: {
    status: "listed",
    localName: "Lynk & Co 06",
    price: "MAD 259,000–299,000",
    priceTag: "MAD 259,000起",
    kind: "media",
    note: "wandaloo：Core+ 259,000 / Hyper Pro 279,000 / Hyper Halo 299,000（1.5T 181 AT）。不回写中国 06 电混参配。",
    mediaUrl: "https://www.wandaloo.com/neuf/lynk-et-co/06/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
    trims: [
      { name: "Core+", price: "MAD 259,000" },
      { name: "Hyper Pro", price: "MAD 279,000" },
      { name: "Hyper Halo", price: "MAD 299,000" },
    ],
  },
  "08": {
    status: "listed",
    localName: "Lynk & Co 08",
    price: "MAD 429,000",
    priceTag: "MAD 429,000起",
    kind: "media",
    note: "wandaloo 目录 1.5T 380 PHEV 429,000 DH。moteur.ma 另有一档 399,000，不把两源合成一个指导价，用目录价。",
    mediaUrl: "https://www.wandaloo.com/neuf/lynk-et-co/08/",
    mediaName: "Wandaloo",
    captured: MARKET_CAPTURED,
  },
};

const OVERSEAS: Record<Exclude<MarketId, "CN">, Record<string, MarketOffer>> = {
  IL,
  MX,
  MA,
};

export function marketOffer(v: { id: string; brand: string }, market: MarketId): MarketOffer {
  const raw = market === "CN" ? cnOffer(v) : OVERSEAS[market][v.id] || unlisted(v, market);
  if (raw.localName || market === "CN") return raw;
  const fromCard = localNameOf(v.id, market);
  return fromCard ? { ...raw, localName: fromCard } : raw;
}

export function nameLine(id: string): string | null {
  const c = NAME_CARDS[id];
  if (!c || !Object.keys(c.local).length) return null;
  const bits = (["IL", "MA", "MX"] as const)
    .filter((m) => c.local[m])
    .map((m) => {
      const short = shortLocalName(id, m) || c.local[m]!;
      const offer = marketOffer({ id, brand: "" }, m);
      const extra =
        offer.status === "unlisted"
          ? "未见"
          : offer.status === "coming"
            ? "即将"
            : !offer.price && !offer.priceTag
              ? "未印价"
              : null;
      const label = `${marketMeta(m).name} ${short}`;
      return extra ? `${label}（${extra}）` : label;
    });
  return `中国 ${c.cn} → ${bits.join(" · ")}`;
}

export function statusLabel(s: ListingStatus): string {
  if (s === "listed") return "在售";
  if (s === "coming") return "即将上市";
  return "当地目录未见";
}

export function kindLabel(k?: PriceKind): string {
  if (k === "official") return "官网价";
  if (k === "guide") return "厂商指导价";
  if (k === "media") return "当地媒体";
  return "待补";
}
