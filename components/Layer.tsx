import React, { useLayoutEffect, useState, useRef } from 'react';
import { ParallaxLayer } from "@react-spring/parallax";
import Image from "next/image";
import cx from "classnames";
import PhotoGallery from "./PhotoGallery";

export interface LayerProps {
  offset: number;
  title?: string;
  subtitle: string | React.ReactNode;
  children: React.ReactNode;
  expanded: boolean;
  onScreenEnter?: () => void;
  imgSrc?: string;
  imgAlt?: string;
  images?: {
    src: string;
    alt?: string;
    caption?: string;
  }[],
  bgColor?: string;
  direction: "left" | "right"
}

const Layer: React.FC<LayerProps> = ({
  offset,
  title,
  subtitle,
  children,
  onScreenEnter,
  imgSrc = "/lighthouse.jpg",
  imgAlt = "A picture of Portugal",
  bgColor = "bg-gray-900",
  direction = "left",
  images = [],
}) => {

  const ref = useRef<HTMLDivElement>();
  const [onScreen, setOnScreen] = useState(false);

  useLayoutEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        onScreenEnter();
      },
      {
        rootMargin: "5000px",
      }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      observer.unobserve(currentRef);
      setOnScreen(false);
    };
  }, [])

  if (!imgSrc && !images.length) {
    return (
      <div>
        This a real small layer
      </div>
    )
  }

  return (
    <ParallaxLayer offset={offset} speed={0.5}>
      <div className={cx(
        direction === "left" && "lg:flex-row-reverse",
        "text-white h-full w-full flex flex-col-reverse lg:flex-row")}>
        <div className={cx(bgColor, "h-2/5 lg:w-2/5 lg:h-full grid w-full ")}>
          <div className="p-10 mx-auto my-auto flex flex-col gap-y-5 lg:gap-y-8">
            <h1
              ref={ref}
              className="text-center text-white font-lobster-two text-4xl lg:text-6xl">
              {title}
            </h1>
            {typeof (subtitle) === "string" ?
              <p className="text-center font-serif text-white">
                {subtitle}
              </p> : subtitle
            }
            {children}
          </div>
        </div>
        {images.length === 0 &&
          <div className="h-3/5 lg:w-3/5 lg:h-3/4 my-auto relative mx-4">
            <Image
              className="rounded-2xl"
              objectFit="cover"
              src={imgSrc ?? "/family.jpeg"}
              alt="The family"
              layout="fill"
            />
          </div>}
        {(images?.length > 0) &&
          <div className="h-3/5 lg:w-3/5 lg:h-3/4 my-auto relative mx-4">
            <PhotoGallery
              photos={images.map(({ src, caption, alt }) => ({ src, caption }))}
            />
          </div>}
      </div>
    </ParallaxLayer>
  )
}

export default Layer;