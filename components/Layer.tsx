import React, { useLayoutEffect, useState, useRef } from 'react';
import { ParallaxLayer } from "@react-spring/parallax";
import Image from "next/image";
import cx from "classnames";

interface LayerProps {
  offset: number;
  title?: string;
  subtitle: string;
  children: React.ReactNode;
  expanded: boolean;
  onScreenEnter?: () => void;
  imgSrc?: string;
  imgAlt?: string;
  bgColor?: string;
  direction: "left" | "right"
}

const Layer: React.FC<LayerProps> = ({
  offset,
  title,
  subtitle,
  expanded,
  children,
  onScreenEnter,
  imgSrc = "/lighthouse.jpg",
  imgAlt = "A picture of Portugal",
  bgColor = "bg-gray-900",
  direction = "left"
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

  return (
    <ParallaxLayer offset={offset} speed={0.5}>
      <div className={cx(
        direction === "left" && "flex-col-reverse lg:flex-row-reverse",
        "text-white h-full w-full flex flex-col lg:flex-row")}>
        <div className={cx(bgColor, "h-2/5 lg:w-2/5 lg:h-full grid w-full ")}>
          <div className="p-10 mx-auto my-auto flex flex-col gap-y-8">
            <h1 ref={ref} className="text-center text-white font-lobster-two text-5xl">{title}</h1>
            <p className="text-center font-serif text-white">
              {subtitle}
            </p>
            {children}
          </div>
        </div>
        <div className="h-3/5 lg:w-3/5 lg:h-full relative">
          <Image
            objectFit="cover"
            src="/family.jpeg"
            alt="The family"
            layout="fill"
          />
        </div>
      </div>
      {/* <div className="text-center text-white mx-auto my-auto text-green h-full flex flex-col w-full lg:w-1/2">
        <div className={cx(
          expanded ? "w-full" : "w-[89%]",
          "transition-width  h-3/4 border-y  rounded-l-xl lg:rounded-xl ml-auto my-auto p-4 lg:p-8 flex flex-col gap-y-2 lg:gap-y-4"
        )}>
          <h3 ref={ref} className="text-2xl lg:text-5xl font-lobster-two">
            {title}
          </h3>
          <p className="text-sm lg:text-lg font-serif">
            {subtitle}
          </p>
          {children}
        </div>
      </div> */}
    </ParallaxLayer>
  )
}

export default Layer;