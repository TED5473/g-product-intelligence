import { useEffect, useState, type ImgHTMLAttributes } from "react";

/** Skip SSR `<img>` so React 19 does not preload 400KB car photos before hydration. */
export function ClientImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) {
    return <span className={props.className} style={{ display: "block" }} aria-hidden />;
  }
  return <img decoding="async" loading="lazy" {...props} />;
}
