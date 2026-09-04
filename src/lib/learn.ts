import {
  academyFacts,
  academyTraps,
  WALL_TRAP_LINE,
  type AcademyFact,
  type AcademyTrap,
} from "@/data/zeekr-academy-seed";
import { PRODUCT_TECH } from "@/data/product-tech";
import {
  archById,
  flashcards,
  platforms,
  vehicles,
  type Architecture,
  type Flashcard,
  type GroupId,
  type Platform,
  type Vehicle,
} from "@/lib/catalog";

export { WALL_TRAP_LINE };

/** PM mastery drill targets — surface first in Learn + Cmd+K. */
export const LEARN_PRIORITY_IDS = ["08", "lynkz20", "lynk20", "lynk900"] as const;

export type LearnPath = {
  arch: Architecture;
  platforms: {
    plat: Platform;
    cars: Vehicle[];
  }[];
};

export function isLearnPriority(id: string) {
  return (LEARN_PRIORITY_IDS as readonly string[]).includes(id);
}

export function priorityVehicles(group: GroupId = "geely"): Vehicle[] {
  return LEARN_PRIORITY_IDS.map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is Vehicle => Boolean(v))
    .filter((v) => !group || !v.group || v.group === group);
}

/** Map vehicle id / brand+name → academy series tags used in seed. */
export function seriesKeysForVehicle(v: Vehicle): string[] {
  const id = (v.id || "").toLowerCase();
  const name = `${v.brand} ${v.name}`.toLowerCase();
  const keys = new Set<string>();

  if (id === "7x" || /\b7x\b/.test(name)) keys.add("7x");
  if (id === "009" || /\b009\b/.test(name)) keys.add("009");
  if (id === "08" || /\b08\b/.test(name)) keys.add("08");
  if (id === "09" || /\b09\b/.test(name)) keys.add("09");
  if (id === "lynk900" || /\b900\b/.test(name) || /领克\s*900/.test(name)) {
    keys.add("lynk900");
    keys.add("900");
    keys.add("SPA-Evo");
  }
  if (
    id === "x" ||
    (/\bzeekr\s*x\b/.test(name) || /极氪\s*x\b/.test(name)) && id !== "lynkz20"
  ) {
    keys.add("x");
  }
  if (id === "007" || /\b007\b/.test(name)) keys.add("007");
  if (id === "007gt" || /007\s*gt/.test(name)) keys.add("007gt");
  if (id === "001" || /\b001\b/.test(name)) keys.add("001");
  if (id === "lynkz20" || id === "z20" || /\bz20\b/.test(name)) {
    keys.add("z20");
    keys.add("SEA");
  }
  if (id === "lynk20" || (/领克\s*20/.test(name) && !/z20/.test(name) && !/\b02\b/.test(name))) {
    keys.add("lynk20");
    keys.add("20");
    keys.add("SEA");
    keys.add("800V");
  }

  return [...keys];
}

function tagHit(tags: string[] | undefined, series: string[]): boolean {
  if (!tags?.length || !series.length) return false;
  const lower = tags.map((t) => t.toLowerCase());
  return series.some((s) => lower.includes(s.toLowerCase()));
}

export function academyFactsForVehicle(v: Vehicle): AcademyFact[] {
  const series = seriesKeysForVehicle(v);
  if (!series.length) return [];
  return academyFacts.filter((f) => tagHit(f.tags, series));
}

export function academyTrapsForVehicle(v: Vehicle): AcademyTrap[] {
  const series = seriesKeysForVehicle(v);
  if (!series.length) return [];
  return academyTraps.filter((t) => tagHit(t.tags, series));
}

export function flashcardsForVehicle(v: Vehicle): Flashcard[] {
  const series = seriesKeysForVehicle(v);
  const blob = [v.id, v.name, v.arch, v.platform, v.eea, v.voltageClass, ...series]
    .join(" ")
    .toLowerCase();
  return flashcards.filter((fc) => {
    const hay = `${fc.q} ${fc.a} ${(fc.tags || []).join(" ")}`.toLowerCase();
    if (series.some((s) => hay.includes(s.toLowerCase()))) return true;
    return (fc.tags || []).some((t) => blob.includes(t.toLowerCase()));
  });
}

/** Arch → platforms → vehicles for the Learning Center stepper. Priority cars float up. */
export function learnPath(archId: string, group: GroupId = "geely"): LearnPath | null {
  const arch = archById(archId);
  if (!arch) return null;
  if (group && arch.group && arch.group !== group) return null;

  const plats = (arch.platforms || [])
    .map((id) => platforms[id])
    .filter(Boolean)
    .map((plat) => {
      const cars = vehicles
        .filter(
          (v) =>
            v.platform === plat.id &&
            v.arch === arch.id &&
            (!group || !v.group || v.group === group),
        )
        .slice()
        .sort((a, b) => {
          const pa = isLearnPriority(a.id) ? 0 : 1;
          const pb = isLearnPriority(b.id) ? 0 : 1;
          return pa - pb || a.name.localeCompare(b.name, "zh");
        });
      return { plat, cars };
    })
    // platforms that host priority cars first
    .sort((a, b) => {
      const pa = a.cars.some((c) => isLearnPriority(c.id)) ? 0 : 1;
      const pb = b.cars.some((c) => isLearnPriority(c.id)) ? 0 : 1;
      return pa - pb;
    });

  return { arch, platforms: plats };
}

export function learnKeySpecs(v: Vehicle) {
  const tech = PRODUCT_TECH[v.id];
  const d = (v.detail || {}) as Record<string, unknown>;
  const rows: { k: string; v: string }[] = [
    { k: "品牌", v: v.brand },
    { k: "架构", v: v.arch },
    { k: "平台", v: platforms[v.platform]?.name || v.platform },
    { k: "动力", v: v.powertrain || "待补" },
    { k: "电压", v: String(d.voltage || v.voltageClass || tech?.hv || "待补") },
    { k: "EEA", v: v.eea || "待补" },
    { k: "电池", v: String(d.batteryNotes || tech?.batteryTech || "待补") },
    { k: "电机", v: String(d.motors || "待补") },
    { k: "续航", v: String(d.range || "待补") },
    { k: "智驾", v: String(d.adas || tech?.adas || "待补") },
  ];
  if (v.summary) rows.push({ k: "摘要", v: v.summary });
  if (v.koujing) rows.push({ k: "口径", v: v.koujing });
  if (v.salesRisk) rows.push({ k: "销售风险", v: v.salesRisk });
  if (tech?.tech?.length) {
    for (const t of tech.tech) rows.push({ k: "产品技术", v: t });
  }
  return rows;
}

/** Learn deep-link search for a vehicle (arch → platform → specs). */
export function learnSearchForVehicle(
  v: Vehicle,
  prev: { g?: GroupId; m?: string; [k: string]: unknown } = {},
) {
  return {
    ...prev,
    a: v.arch,
    p: v.platform,
    v: v.id,
  };
}
