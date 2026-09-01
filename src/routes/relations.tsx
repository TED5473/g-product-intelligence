import { createFileRoute } from "@tanstack/react-router";
import { RelationsView } from "@/components/relations-view";

export const Route = createFileRoute("/relations")({ component: RelationsPage });

function RelationsPage() {
  return <RelationsView />;
}
