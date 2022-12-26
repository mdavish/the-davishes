import React, { useState } from "react";
import cx from "classnames";
import { ImLink } from "react-icons/im";
import { BiCheck } from "react-icons/bi";

const Header = (props: { children: React.ReactNode, className?: string, href?: string }) => {
  if (props.href && props.href.startsWith("#")) {
    throw new Error(`href "${props.href}" should not start with #. You're doing it wrong.`);
  }
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative">
      <h1 className={cx(
        props.className,
        "text-5xl text-green-1100 font-lobster my-4"
      )}>
        {
          props.href &&
          <button
            onClick={() => {
              props.href && navigator.clipboard.writeText(`https://www.thedavishes.com/#${props.href}`);
              setCopied(true);
            }}
            className="text-xs rounded-lg top-2 -left-6 in my-auto p-1 group-hover:bg-green-1100/10 hover:bg-green-1100/20 absolute text-transparent hover:text-green-1100 group-hover:text-green-1100/50">
            {
              copied
                ? <BiCheck className="my-auto" />
                : <ImLink className="my-auto" />
            }
          </button>
        }
        {props.children}
      </h1>
    </div>
  );
};

export default Header;