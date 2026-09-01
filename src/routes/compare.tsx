import { createFileRoute } from "@tanstack/react-router";
import { CompareView } from "@/components/compare-view";

export const Route = createFileRoute("/compare")({ component: ComparePage });

function ComparePage() {
  return <CompareView />;
}
