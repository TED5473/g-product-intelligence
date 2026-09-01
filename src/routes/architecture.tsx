import { createFileRoute } from "@tanstack/react-router";
import { ArchWorkspace } from "@/components/arch-workspace";

type Search = { id?: string; vs?: string };

export const Route = createFileRoute("/architecture")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
    vs: typeof s.vs === "string" ? s.vs : undefined,
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const { id, vs } = Route.useSearch();
  return <ArchWorkspace initialId={id} initialVs={vs} />;
}
