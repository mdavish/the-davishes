import React from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import type { Photo } from "../types/site";
import { Image } from "@yext/pages/components";

interface ImageBlockProps {
  photo: Photo;
  sticky: {
    start: number;
    end: number;
  }
  speed?: number;
}

export default function ImageBlock({ photo, sticky, speed = 0.25 }: ImageBlockProps) {
  return (
    <ParallaxLayer
      className="absolute -z-20"
      sticky={sticky}
      speed={speed}
    >
      <div className="w-full h-full absolute bottom-60 -right-36  opacity-30 select-none">
        <Image image={photo} />
      </div>
    </ParallaxLayer>
  );
} 