import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { architectures, platforms, vehicles } from "@/lib/catalog";
import { useUI } from "@/lib/store";

export function CommandSearch() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const openVehicle = useUI((s) => s.openVehicle);
  const setFilter = useUI((s) => s.setFilter);
  const navigate = useNavigate();
  const group = useUI((s) => s.filters.group);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const cars = vehicles
      .filter((v) => (!v.group || v.group === group) && (
        !query
          ? true
          : [v.name, v.brand, v.arch, v.platform, v.eea, v.summary]
              .join(" ")
              .toLowerCase()
              .includes(query)
      ))
      .slice(0, 12)
      .map((v) => ({
        kind: "car" as const,
        id: v.id,
        title: v.name,
        sub: `${v.brand} · ${v.arch} · ${platforms[v.platform]?.name || v.platform}`,
      }));
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
  }, [q, group]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/30 pt-[12vh] px-4">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close search"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-line bg-surface shadow-panel">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search anything…"
          className="h-12 w-full border-b border-line px-4 text-[14px] outline-none"
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-muted">没有匹配结果</p>
          ) : (
            items.map((it) => (
              <button
                key={`${it.kind}-${it.id}`}
                type="button"
                className="flex w-full flex-col items-start px-4 py-2 text-left hover:bg-bg"
                onClick={() => {
                  setOpen(false);
                  if (it.kind === "car") {
                    openVehicle(it.id);
                    navigate({ to: "/" });
                  } else {
                    setFilter("arch", it.id);
                    navigate({ to: "/architecture", search: { id: it.id } });
                  }
                }}
              >
                <span className="text-[13px] font-medium">{it.title}</span>
                <span className="text-[11px] text-muted">
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
