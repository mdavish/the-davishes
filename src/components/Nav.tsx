import React from "react";
import { Link } from "@yext/pages/components";

type NavItem = {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    name: "RSVP",
    href: "/rsvp"
  },
  {
    name: "Logistics",
    href: "/logistics"
  },
  {
    name: "Registry",
    href: "/registry"
  }
];


export const Nav = (): JSX.Element => {
  return (
    <div className="absolute z-50 w-full flex-row justify-between items-center h-20 px-10 hidden lg:flex border-b border-green-1100/5 bg-beige-100">
      <div className="flex flex-row gap-x-10">
        <h1 className="text-3xl font-lobster text-green-1100">
          <Link href="/">The Davishes</Link>
        </h1>
        <h2 className="text-2xl font-light text-green-1100 font-lobsterTwo">8 July, 2023</h2>
      </div>
      <nav className="flex flex-row gap-x-10">
        {
          navItems.map((item, i) => (
            <h1
              key={i}
              className="text-2xl font-light text-green-1100 font-lobsterTwo transition-none delay-150"
            >
              <Link href={item.href
              } >
                {item.name}
              </Link>
            </h1>
          ))
        }
      </nav>
    </div >
  )
};

export default Nav;