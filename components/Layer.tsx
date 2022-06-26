import React from 'react';
import { ParallaxLayer } from "@react-spring/parallax";
import cx from "classnames";

interface LayerProps {
  offset: number;
  title?: string;
  subtitle: string;
  children: React.ReactNode;
  expanded: boolean;
}

const Layer: React.FC<LayerProps> = ({
  offset,
  title,
  subtitle,
  expanded,
  children,
}) => {
  return (
    <ParallaxLayer offset={offset} speed={0.5}>
      <div className="text-white mx-auto my-auto text-green h-full flex flex-col w-full lg:w-2/3">
        <div className={cx(
          expanded ? "w-3/5" : "w-[89%]",
          "transition-width bg-green-900/50 h-2/3 border-white border-y border-l lg:border backdrop-blur-sm rounded-l-xl lg:rounded-xl ml-auto my-auto p-4 lg:p-8 flex flex-col gap-y-2 lg:gap-y-4"
        )}>
          <h3 className="text-2xl lg:text-5xl font-lobster-two">
            {`${offset}. ${title}`}
          </h3>
          <p className="text-sm lg:text-lg font-serif">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </ParallaxLayer>
  )
}

export default Layer;