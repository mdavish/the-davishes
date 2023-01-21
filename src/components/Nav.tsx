import React from "react";
import { Link } from "@yext/pages/components";
import cx from "classnames";

type NavItem = {
  name: string;
  href: string;
  primary?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "RSVP",
    href: "/rsvp",
    primary: true
  },
  {
    name: "Recs",
    href: "/recommendations"
  },
  {
    name: "Registry",
    href: "https://overthemoon.com/apps/registry/goldschmid-davish-f556"
  }
];


export const Nav = (): JSX.Element => {
  return (
    <div className="sticky top-0 z-40 w-full flex-row justify-between items-center py-2 px-6 hidden lg:flex border-b border-green-1100/5 bg-beige-100">
      <div className="flex flex-row gap-x-10">
        <h1 className="text-2xl font-lobster text-green-1100">
          <Link href="/">The Davishes</Link>
        </h1>
        <h2 className="text-xl my-auto font-light text-green-1100 font-lobsterTwo">
          8 July, 2023
        </h2>
      </div>
      <nav className="ml-auto flex gap-x-10 flex-row-reverse">
        {
          navItems.map((item, i) => (
            <h1
              key={i}
              className={cx(
                "text-xl font-light text-green-1100 font-lobsterTwo transition-none delay-150 my-auto",
                item.primary && "bg-green-1000 hover:bg-green-1100 py-1.5 px-4 rounded-xl border border-white  no-underline",
              )}
            >
              <Link
                className={item.primary ? "no-underline" : ""}
                href={item.href
                } >
                {/* Not sure why this is suddenyl necessary */}
                <span className={item.primary ? "text-white" : ""}>
                  {item.name}
                </span>
              </Link>
            </h1>
          ))
        }
      </nav>
    </div >
  )
};

export default Nav;