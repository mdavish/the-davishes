import React from "react";
import cx from "classnames";
import { Link } from "@yext/pages/components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  className,
  onClick = () => { return },
  disabled = false,
  type = "button",
}: ButtonProps
) {
  const fullClassName = cx(
    className,
    "h-10 flex w-full justify-center rounded-md border border-transparent bg-green-1000 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-1100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
  )
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cx(fullClassName, "no-underline")}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={fullClassName}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  )
}