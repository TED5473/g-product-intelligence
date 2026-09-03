import { useEffect, useMemo, useState } from "react";
import { SrcBadge } from "@/components/src-badge";
import {
  vehicles,
  homologGroups,
  carById,
  liveCars,
  brandMapFor,
} from "@/lib/catalog";
import { useFilters, useOpenVehicle } from "@/lib/app-search";
import { cn } from "@/lib/utils";

function relGroups(vId: string) {
  const v = carById(vId);
  if (!v) return [];
  const take = (arr: typeof vehicles) => arr.filter((x) => x.id !== v.id).slice(0, 8);
  const layer = (pred: (x: (typeof vehicles)[number]) => boolean) =>
    take(vehicles.filter((x) => (!v.group || x.group === v.group) && pred(x)));
  return [
    { key: "brand", label: "同品牌", nodes: layer((x) => x.brand === v.brand) },
    { key: "arch", label: "同架构", nodes: layer((x) => x.arch === v.arch) },
    { key: "plat", label: "同平台", nodes: layer((x) => x.platform === v.platform) },
    {
      key: "homolog",
      label: "同源",
      nodes: take(
        homologGroups
          .filter((g) => g.members.includes(v.id))
          .flatMap((g) => g.members.map((id) => carById(id)!).filter(Boolean)),
      ),
    },
    {
      key: "tech",
      label: "技术关联",
      nodes: layer(
        (x) => Boolean((v.eea && x.eea === v.eea) || (v.voltageClass && x.voltageClass === v.voltageClass)),
      ),
    },
  ].filter((g) => g.nodes.length);
}

export function RelationsView() {
  const filters = useFilters();
  const openVehicle = useOpenVehicle();
  const [mode, setMode] = useState<"board" | "map">("map");
  const [relId, setRelId] = useState("7x");
  const [q, setQ] = useState("");
  const brandMap = brandMapFor(filters.group);
  const list = liveCars(filters).filter(
    (x) =>
      !q ||
      `${x.name} ${x.brand} ${x.id} ${x.arch} ${x.platform}`.toLowerCase().includes(q.toLowerCase()),
  );
  useEffect(() => {
    if (!list.some((x) => x.id === relId)) {
      setRelId(list[0]?.id || "");
    }
  }, [filters.group]); // eslint-disable-line react-hooks/exhaustive-deps
  const v = carById(relId) || list[0] || vehicles[0];
  const groups = useMemo(() => relGroups(v.id), [v.id]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Vehicle Relations</h1>
        </div>
        <div className="flex h-11 overflow-hidden rounded-sm border border-line md:h-8">
          <button
            type="button"
            className={cn("px-3 py-1.5 text-[12px]", mode === "board" ? "bg-ink text-white" : "text-muted")}
            onClick={() => setMode("board")}
          >
            Board
          </button>
          <button
            type="button"
            className={cn("px-3 py-1.5 text-[12px]", mode === "map" ? "bg-ink text-white" : "text-muted")}
            onClick={() => setMode("map")}
          >
            Map
          </button>
        </div>
      </header>

      {mode === "map" ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {homologGroups.map((g) => (
              <div key={g.id} className="rounded-md border border-line bg-surface p-4">
                <h3 className="flex items-center gap-2 text-[14px] font-semibold">
                  {g.title} <SrcBadge source={g.source} />
                </h3>
                <p className="mt-1 text-[12px] text-muted">{g.note}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.members.map((id) => {
                    const c = carById(id);
                    return c ? (
                      <button
                        key={id}
                        type="button"
                        className="min-h-11 rounded-sm border border-line px-2.5 text-[12px] hover:border-ink"
                        onClick={() => openVehicle(id)}
                      >
                        {c.name}
                      </button>
                    ) : (
                      <span key={id} className="text-[12px] text-muted">
                        {id}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
            <div className="overflow-x-auto rounded-md border border-line p-4">
            <h3 className="mb-3 text-[13px] font-semibold">Brand map</h3>
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-1.5 font-medium">Brand</th>
                  <th className="py-1.5 font-medium">Primary</th>
                  <th className="py-1.5 font-medium">Also</th>
                </tr>
              </thead>
              <tbody>
                {brandMap.rows.map((r) => (
                  <tr key={r.brand} className="border-b border-line last:border-0">
                    <td className="py-1.5 font-medium">{r.brand}</td>
                    <td className="py-1.5">{r.primary}</td>
                    <td className="py-1.5 text-muted">{r.also}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-md border border-line bg-surface">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search vehicles…"
              className="h-10 w-full border-b border-line px-3 text-[13px] outline-none"
            />
            <div className="max-h-[28rem] overflow-y-auto">
              {list.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => {
                    setRelId(x.id);
                    openVehicle(x.id);
                  }}
                  className={cn(
                    "flex min-h-12 w-full flex-col items-start px-3 py-2.5 text-left text-[13px]",
                    x.id === v.id ? "bg-bg font-medium" : "hover:bg-bg/70",
                  )}
                >
                  {x.name}
                  <span className="text-[11px] font-normal text-muted">
                    {x.brand} · {x.arch} · {x.platform || "—"}
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <div className="space-y-3">
            <div className="rounded-md border border-line bg-surface p-4">
              <div className="text-[12px] text-muted">中心车型</div>
              <button
                type="button"
                className="text-lg font-semibold hover:underline"
                onClick={() => openVehicle(v.id)}
              >
                {v.name}
              </button>
              <p className="text-[12px] text-muted">
                {v.brand} · {v.arch} · {v.platform} · {v.powertrain}
              </p>
            </div>
            {groups.map((g) => (
              <div key={g.key} className="rounded-md border border-line p-3">
                <h3 className="mb-2 text-[12px] font-semibold text-muted">{g.label}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.nodes.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className="min-h-11 rounded-sm border border-line px-2.5 text-[12px] hover:border-ink"
                      onClick={() => {
                        setRelId(n.id);
                        openVehicle(n.id);
                      }}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
