import React from "react";
import cx from "classnames";

const P = (props: { children: React.ReactNode, className?: string }): JSX.Element => {
  return (
    <p className={cx("text-sm leading-7 text-green-1100", props.className)}>{props.children}</p>
  )
};

export default P;