import React from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children } = props;
  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen">
      <div className="bg-beige-100 flex flex-col h-full">
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default Layout;
