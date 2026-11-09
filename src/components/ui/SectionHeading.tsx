import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow, title, lede, align = "left", as: Tag = "h2", className = "", children,
}: {
  eyebrow?: string; title: ReactNode; lede?: ReactNode; align?: "left" | "center"; as?: "h1" | "h2" | "h3"; className?: string; children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <Tag className={`${eyebrow ? "mt-5" : ""} ${Tag === "h1" ? "text-h1" : "text-h2"}`}>{title}</Tag>
      {lede && <p className={`lede mt-6 ${center ? "mx-auto" : ""} max-w-2xl`}>{lede}</p>}
      {children}
    </Reveal>
  );
}
