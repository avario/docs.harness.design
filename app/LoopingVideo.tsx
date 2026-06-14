"use client";

import type { ComponentPropsWithoutRef } from "react";

type LoopingVideoProps = {
  src: string;
  width?: number;
  holdMs?: number;
} & Omit<ComponentPropsWithoutRef<"video">, "src" | "width">;

export function LoopingVideo({ src, width = 634, holdMs = 2000, ...props }: LoopingVideoProps) {
  return (
    <video
      src={src}
      width={width}
      style={{ borderRadius: "8px" }}
      autoPlay
      muted
      playsInline
      onEnded={(e) => {
        const v = e.currentTarget;
        setTimeout(() => {
          v.currentTime = 0;
          void v.play();
        }, holdMs);
      }}
      {...props}
    />
  );
}
