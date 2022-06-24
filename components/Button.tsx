import React from 'react';
import cx from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,
  onClick
}) => {
  const fullClassName = cx(
    className,
    "font-lobster-two text-2xl bg-lime-800 hover:bg-lime-900 text-white font-bold py-3 px-6 border rounded-md duration-200 hover:shadow-md transition-all"
  );
  return (
    <>
      {
        href ?
          <a
            href={href}
            className={fullClassName}>
            {children}
          </a>
          : <button
            onClick={onClick}
            className={fullClassName}>
            {children}
          </button>

      }
    </>
  )
}

export default Button;