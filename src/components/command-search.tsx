import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { architectures, platforms, vehicles } from "@/lib/catalog";
import {
  academyFacts,
  academyTraps,
} from "@/data/zeekr-academy-seed";
import { nameSearchBlob, marketOffer } from "@/data/markets";
import { isLearnPriority, learnSearchForVehicle } from "@/lib/learn";
import { useGroup, useMarket, type AppSearch } from "@/lib/app-search";
import { useUI } from "@/lib/store";

type Hit =
  | { kind: "car"; id: string; title: string; sub: string; score: number }
  | { kind: "arch"; id: string; title: string; sub: string; score: number }
  | { kind: "plat"; id: string; archId: string; title: string; sub: string; score: number }
  | { kind: "fact"; id: string; title: string; sub: string; score: number; archHint?: string }
  | { kind: "trap"; id: string; title: string; sub: string; score: number };

export function CommandSearch() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const setFilter = useUI((s) => s.setFilter);
  const navigate = useNavigate();
  const group = useGroup();
  const market = useMarket();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const hits: Hit[] = [];

    const cars = vehicles
      .filter((v) => {
        if (v.group && v.group !== group) return false;
        if (!query) return isLearnPriority(v.id);
        const blob = [
          v.name,
          v.brand,
          v.arch,
          v.platform,
          v.eea,
          v.summary,
          v.koujing,
          nameSearchBlob(v.id),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(query);
      })
      .map((v) => {
        const offer = marketOffer(v, market);
        const local =
          market !== "CN" && offer.localName && offer.localName !== v.name
            ? offer.localName
            : null;
        const pri = isLearnPriority(v.id) ? 0 : 1;
        return {
          kind: "car" as const,
          id: v.id,
          title: v.name,
          sub: local
            ? `当地 ${local} · ${v.brand}`
            : `${v.brand} · ${v.arch} · ${platforms[v.platform]?.name || v.platform}`,
          score: pri,
        };
      })
      .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title, "zh"))
      .slice(0, query ? 12 : 4);

    hits.push(...cars);

    const arches = architectures
      .filter((a) => (!a.group || a.group === group) && a.id !== "UNHOSTED")
      .filter((a) => !query || `${a.name} ${a.nameZh} ${a.note}`.toLowerCase().includes(query))
      .slice(0, 6)
      .map((a) => ({
        kind: "arch" as const,
        id: a.id,
        title: `${a.name} · ${a.nameZh}`,
        sub: "架构",
        score: 2,
      }));
    hits.push(...arches);

    if (query) {
      const plats = Object.values(platforms)
        .filter((p) => !p.group || p.group === group)
        .filter((p) =>
          `${p.name} ${p.desc} ${p.id} ${p.arch}`.toLowerCase().includes(query),
        )
        .slice(0, 8)
        .map((p) => ({
          kind: "plat" as const,
          id: p.id,
          archId: p.arch,
          title: p.name,
          sub: `平台 · ${p.arch}${p.desc ? ` · ${p.desc}` : ""}`,
          score: 2,
        }));
      hits.push(...plats);

      const facts = academyFacts
        .filter((f) =>
          `${f.topic} ${f.text} ${(f.tags || []).join(" ")}`.toLowerCase().includes(query),
        )
        .slice(0, 8)
        .map((f) => ({
          kind: "fact" as const,
          id: f.id,
          title: f.topic,
          sub: f.text,
          score: 3,
          archHint: (f.tags || []).find((t) =>
            ["SEA", "CMA", "SPA", "SPA-Evo", "GEA", "BMA", "EM-P"].includes(t),
          ),
        }));
      hits.push(...facts);

      const traps = academyTraps
        .filter((t) =>
          `${t.wrong} ${t.right} ${(t.tags || []).join(" ")}`.toLowerCase().includes(query),
        )
        .slice(0, 6)
        .map((t) => ({
          kind: "trap" as const,
          id: t.id,
          title: `陷阱：${t.wrong}`,
          sub: t.right,
          score: 3,
        }));
      hits.push(...traps);
    }

    return hits.slice(0, 24);
  }, [q, group, market]);

  if (!open) return null;

  const kindLabel: Record<Hit["kind"], string> = {
    car: "车型",
    arch: "架构",
    plat: "平台",
    fact: "极氪学",
    trap: "陷阱",
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-stretch justify-center bg-ink/30 sm:items-start sm:px-4 sm:pt-[12vh]">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close search"
        onClick={() => setOpen(false)}
      />
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-surface sm:h-auto sm:max-w-lg sm:rounded-lg sm:border sm:border-line sm:shadow-panel">
        <div className="flex items-center border-b border-line pt-[env(safe-area-inset-top)] sm:pt-0">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索车型 / 架构 / 平台 / 极氪学要点…"
            className="h-14 min-w-0 flex-1 px-4 text-[16px] outline-none sm:h-12 sm:text-[14px]"
          />
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center text-muted hover:text-ink"
            aria-label="关闭搜索"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto py-1 pb-[env(safe-area-inset-bottom)] sm:max-h-80 sm:flex-none sm:pb-1">
          {!q.trim() ? (
            <p className="px-4 py-2 text-[11px] text-muted">
              重点：08 · Z20 · 20 · 900 — 点选进入学习路径（架构→平台→参数）
            </p>
          ) : null}
          {items.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-muted">没有匹配结果</p>
          ) : (
            items.map((it) => (
              <button
                key={`${it.kind}-${it.id}`}
                type="button"
                className="flex min-h-12 w-full flex-col items-start justify-center px-4 py-2.5 text-left hover:bg-bg"
                onClick={() => {
                  setOpen(false);
                  if (it.kind === "car") {
                    const car = vehicles.find((v) => v.id === it.id);
                    if (car) {
                      navigate({
                        to: "/learn",
                        search: (prev: AppSearch) => learnSearchForVehicle(car, prev),
                      });
                    } else {
                      navigate({
                        to: "/",
                        search: (prev: AppSearch) => ({ ...prev, v: it.id }),
                      });
                    }
                  } else if (it.kind === "arch") {
                    setFilter("arch", it.id);
                    navigate({
                      to: "/learn",
                      search: (prev: AppSearch) => ({
                        ...prev,
                        a: it.id,
                        p: undefined,
                        v: undefined,
                      }),
                    });
                  } else if (it.kind === "plat") {
                    navigate({
                      to: "/learn",
                      search: (prev: AppSearch) => ({
                        ...prev,
                        a: it.archId,
                        p: it.id,
                        v: undefined,
                      }),
                    });
                  } else if (it.kind === "fact") {
                    navigate({
                      to: "/learn",
                      search: (prev: AppSearch) => ({
                        ...prev,
                        a: it.archHint === "SPA-Evo" ? "SPA" : it.archHint || prev.a,
                        p: undefined,
                        v: undefined,
                      }),
                    });
                  } else {
                    navigate({
                      to: "/learn",
                      search: (prev: AppSearch) => prev,
                    });
                  }
                }}
              >
                <span className="text-[14px] font-medium sm:text-[13px]">{it.title}</span>
                <span className="line-clamp-2 text-[12px] text-muted sm:text-[11px]">
                  {kindLabel[it.kind]} · {it.sub}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
