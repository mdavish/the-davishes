import React, { useRef, useState, useEffect } from "react";
import { ContentBlock } from "../types/site";
import { ParallaxLayer } from "@react-spring/parallax";
import { Image } from "@yext/pages/components";
import cx from "classnames";

interface ContentBlockProps {
  block: ContentBlock;
  i: number;
}

const ContentBlockComp = (props: ContentBlockProps): JSX.Element => {
  const { block, i } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowing(true);
        } else {
          setShowing(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  return (
    <ParallaxLayer
      key={i}
      offset={i + 1}
      speed={0.5}
    >
      <div ref={ref} className="grid items-center w-full h-full">
        <div className={cx(
          "flex flex-row lg:w-3/4 mx-auto my-auto transition-opacity duration-500 ease-in-out",
          i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row",
          showing ? "opacity-100" : "opacity-0"
        )}>
          <div className="shrink-0 aspect-auto my-auto relative">
            {block.c_dominantPhoto && <Image
              className="mx-auto h-96 w-96 object-cover"
              image={block.c_dominantPhoto} />
            }
          </div>
          <div className="p-8">
            <h1 className="text-green-1100 text-4xl tracking-wider font-lobsterTwo mb-6">
              {block.name}
            </h1>
            <p className="text-sm text-stone-800 lg:leading-7">
              {block.c_content}
            </p>
          </div>
        </div>
      </div>
    </ParallaxLayer>
  )
};

export default ContentBlockComp;