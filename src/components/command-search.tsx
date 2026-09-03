import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { architectures, platforms, vehicles } from "@/lib/catalog";
import { nameSearchBlob, marketOffer } from "@/data/markets";
import { useGroup, useMarket, type AppSearch } from "@/lib/app-search";
import { useUI } from "@/lib/store";

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
    const cars = vehicles
      .filter((v) => {
        if (v.group && v.group !== group) return false;
        if (!query) return true;
        const blob = [
          v.name,
          v.brand,
          v.arch,
          v.platform,
          v.eea,
          v.summary,
          nameSearchBlob(v.id),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(query);
      })
      .slice(0, 12)
      .map((v) => {
        const offer = marketOffer(v, market);
        const local = market !== "CN" && offer.localName && offer.localName !== v.name ? offer.localName : null;
        return {
          kind: "car" as const,
          id: v.id,
          title: v.name,
          sub: local
            ? `当地 ${local} · ${v.brand}`
            : `${v.brand} · ${v.arch} · ${platforms[v.platform]?.name || v.platform}`,
        };
      });
    const arches = architectures
      .filter((a) => (!a.group || a.group === group) && a.id !== "UNHOSTED")
      .filter((a) => !query || `${a.name} ${a.nameZh}`.toLowerCase().includes(query))
      .slice(0, 6)
      .map((a) => ({
        kind: "arch" as const,
        id: a.id,
        title: `${a.name} · ${a.nameZh}`,
        sub: "架构",
      }));
    return [...arches, ...cars];
  }, [q, group, market]);

  if (!open) return null;

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
            placeholder="搜索车型 / 架构…"
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
                    navigate({
                      to: "/",
                      search: (prev: AppSearch) => ({ ...prev, v: it.id }),
                    });
                  } else {
                    setFilter("arch", it.id);
                    navigate({
                      to: "/architecture",
                      search: (prev: AppSearch) => ({ ...prev, id: it.id }),
                    });
                  }
                }}
              >
                <span className="text-[14px] font-medium sm:text-[13px]">{it.title}</span>
                <span className="text-[12px] text-muted sm:text-[11px]">
                  {it.kind === "arch" ? "架构" : "车型"} · {it.sub}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
