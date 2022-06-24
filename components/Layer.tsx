import React from 'react';
import { ParallaxLayer } from "@react-spring/parallax";

interface LayerProps {
  offset: number;
  title?: string;
  subtitle: string;
  children: React.ReactNode;
}

const Layer: React.FC<LayerProps> = ({ offset, title, subtitle, children }) => {
  return (
    <ParallaxLayer offset={offset} speed={0.5} factor={0.5}>
      <div className="mx-auto my-auto text-white h-full flex w-2/3">
        <div className="ml-auto my-auto w-3/5 p-4 flex flex-col gap-y-4">
          <h3 className="text-2xl lg:text-5xl font-lobster-two">
            {title}
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