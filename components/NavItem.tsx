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
        "flex flex-row group gap-x-1 transition duration-300 tracking-widest",
        selected ? "text-white" : "text-neutral-300 hover:text-white"
      )}>
        <span className="text-center transition">{label}</span>
      </div>
    </button>
  )
}

export default NavItem;