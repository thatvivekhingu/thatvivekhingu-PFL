import React from "react";

interface BlurFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: unknown;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: unknown;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  ...props
}: BlurFadeProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
