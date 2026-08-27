"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transform = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "none",
  }[direction];

  const style: React.CSSProperties = {
    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0,0)" : (direction === "none" ? "none" : transform),
    willChange: "opacity, transform",
  };

  return (
    // @ts-expect-error dynamic tag ref
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
