import { createFileRoute } from "@tanstack/react-router";
import { ArchWorkspace } from "@/components/arch-workspace";
import { isGroupId, type GroupId } from "@/lib/catalog";
import { isMarketId, type MarketId } from "@/data/markets";

type Search = { id?: string; vs?: string; g?: GroupId; v?: string; m?: MarketId };

export const Route = createFileRoute("/architecture")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
    vs: typeof s.vs === "string" ? s.vs : undefined,
    g: isGroupId(s.g) ? s.g : undefined,
    v: typeof s.v === "string" && s.v ? s.v : undefined,
    m: isMarketId(s.m) ? s.m : undefined,
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const { id, vs } = Route.useSearch();
  return <ArchWorkspace initialId={id} initialVs={vs} />;
}
