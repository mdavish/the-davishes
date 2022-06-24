import React, { useState } from 'react';

interface NavItemProps {
  number: number;
  label: string;
  onSelect: () => void;
  selected: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ number, label, onSelect, selected }) => {
  return (
    <button
      onClick={onSelect}
      className="font-serif text-lg text-left w-fit focus:outline-none"
    >
      <div className="flex flex-row group gap-x-2 transition duration-300 tracking-widest">
        <span className="text-neutral-200 group-hover:text-white transition">{number}</span>
        <span className="bg-white h-px w-8 group-hover:w-16 my-auto transition-width"></span>
        <span className="text-neutral-200 group-hover:text-white transition">{label}</span>
      </div>
    </button>
  )
}

export default NavItem;