import React from 'react';
import cx from "classnames";

interface NavItemProps {
  number?: number;
  label?: string;
  onSelect?: () => void;
  selected?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ number, label, onSelect, selected }) => {
  return (
    <button
      onClick={onSelect}
      className="font-serif text-xs lg:text-lg text-left w-fit focus:outline-none"
    >
      <div className={cx(
        "flex flex-row group gap-x-2 transition duration-300 tracking-widest",
        selected ? "text-white" : "text-neutral-300 hover:text-white"
      )}>
        {/* <span
          className={cx(
            selected ? "w-12" : "w-6 group-hover:w-12",
            "hidden lg:block bg-white h-px my-auto transition-width"
          )}
        /> */}
        <span className="transition">{label}</span>
      </div>
    </button>
  )
}

export default NavItem;