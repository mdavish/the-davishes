import React from "react";
import Nav from "./Nav";
import type { Photo } from "../types/site";
import { Image } from "@yext/pages/components";

interface LayoutProps {
  children: React.ReactNode;
  bgPhoto?: Photo;
}

const Layout = ({ children, bgPhoto }: LayoutProps): JSX.Element => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${bgPhoto?.url})`,
      //   backgroundPosition: "bottom right",
      //   backgroundSize: "90%"
      // }}
      className="bg-no-repeat bg-center h-screen relative"
    >
      {bgPhoto &&
        <div className="w-full h-full absolute select-none -bottom-36 -right-48">
          <Image className="absolute w-full h-full" image={bgPhoto} />
        </div>}
      <div
        className="bg-cover bg-no-repeat bg-center flex flex-col h-full bg-beige-100 bg-opacity-90 relative"

      >
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
