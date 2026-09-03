import { cn } from "@/lib/utils";

/**
 * Official 车标 from brand sites (not group wordmarks / not CSS-mask blobs):
 * 吉利汽车 2023 冰晶（geely.com 车标）
 * 比亚迪汽车 官网 header oval BYD（byd.com/material/domestic-official/header/logo.png）
 * 奇瑞汽车 官网钻石（chery.cn headLogo Fill-11）
 * 小鹏汽车 官网飞翼 X（xiaopeng.com black-logo）
 *
 * Rendered as <img> + invert so the mark stays readable at 16px.
 * Switcher already has 中文名, so these are emblems only (no extra wordmark).
 */
const MARK: Record<string, { src: string; className: string; label: string }> = {
  geely: {
    src: "/imgs/brands/geely.svg?v=4",
    className: "h-[18px] w-[20px]",
    label: "吉利汽车",
  },
  byd: {
    src: "/imgs/brands/byd.png?v=4",
    className: "h-[11px] w-[42px]",
    label: "比亚迪汽车",
  },
  chery: {
    src: "/imgs/brands/chery.svg?v=4",
    className: "h-[16px] w-[18px]",
    label: "奇瑞汽车",
  },
  xpeng: {
    src: "/imgs/brands/xpeng.svg?v=4",
    className: "h-[14px] w-[26px]",
    label: "小鹏汽车",
  },
};

export function GroupMark({
  id,
  on,
  className,
}: {
  id: string;
  on?: boolean;
  className?: string;
}) {
  const m = MARK[id];
  if (!m) return null;
  return (
    <img
      src={m.src}
      alt={m.label}
      className={cn(
        "inline-block shrink-0 object-contain object-center",
        m.className,
        on ? "brightness-0 invert" : "brightness-0 opacity-55",
        className,
      )}
    />
  );
}
