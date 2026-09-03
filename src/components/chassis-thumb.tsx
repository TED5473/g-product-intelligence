import type { Architecture } from "@/lib/catalog";
import { ClientImg } from "@/components/client-img";
import { cn } from "@/lib/utils";

export function ChassisThumb({
  arch,
  className,
}: {
  arch: Architecture;
  className?: string;
}) {
  if (arch.skateboardImg) {
    return (
      <ClientImg
        src={`/${arch.skateboardImg}`}
        alt={`${arch.name} 滑板底盘`}
        className={cn("block h-full w-full object-cover object-center", className)}
      />
    );
  }
  return (
    <span
      className={cn("block h-full w-full", className)}
      style={{ background: `${arch.color}22` }}
      aria-hidden
    />
  );
}
