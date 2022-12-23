import React from "react";
import cx from "classnames";

const Header = (props: { children: React.ReactNode, className?: string }) => {
  return (
    <h1 className={cx(
      props.className,
      "text-5xl text-green-1100 font-lobster my-4"
    )}>
      {props.children}
    </h1>
  );
};

export default Header;