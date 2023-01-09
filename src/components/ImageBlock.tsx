import React from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import type { Photo } from "../types/site";
import { Image } from "@yext/pages/components";
import cx from "classnames";

interface ImageBlockProps {
  photo: Photo;
  sticky: {
    start: number;
    end: number;
  }
  speed?: number;
  className?: string;
}

export default function ImageBlock({ photo, sticky, speed = 0.25, className }: ImageBlockProps) {
  return (
    <ParallaxLayer
      className="absolute -z-20"
      sticky={sticky}
      speed={speed}
    >
      <div className={cx(
        "w-full h-full absolute lg:-bottom-60 lg:-right-36 opacity-30 select-none",
        className)}>
        <Image image={photo} />
      </div>
    </ParallaxLayer>
  );
} 