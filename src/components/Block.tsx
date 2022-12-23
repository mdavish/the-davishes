import React, { useRef, useState, useEffect, ReactNode } from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import cx from "classnames";


const Block = (props: { i: number, navId?: string, children: ReactNode }): JSX.Element => {
  const { i } = props;
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
          "flex align-middle w-10/12 lg:w-3/4 h-full mx-auto my-auto transition-opacity duration-300 ease-in-out",
          i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row",
          showing ? "opacity-100" : "opacity-0"
        )}>
          <div className="mx-auto my-auto w-full h-full">
            {props.children}
          </div>
        </div>
      </div>
    </ParallaxLayer>
  )
};

export default Block;