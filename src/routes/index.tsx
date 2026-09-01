import { createFileRoute } from "@tanstack/react-router";
import { ArchTree } from "@/components/arch-tree";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ArchTree />;
}