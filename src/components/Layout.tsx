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
      style={{ backgroundImage: `url(${bgPhoto?.url})` }}
      className="bg-cover bg-no-repeat bg-center h-screen"
    >
      <div
        // style={{ backgroundImage: `url(${bgPhoto?.url})` }}
        className="bg-cover bg-no-repeat bg-center flex flex-col h-full bg-beige-100 bg-opacity-90"

      >
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
