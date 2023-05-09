import React from "react";
import { Link } from "@yext/pages/components";
import cx from "classnames";
import { FaBars } from "react-icons/fa"
import { Menu, Transition } from "@headlessui/react";

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
    href: "https://overthemoon.com/apps/registry/goldschmid-davish-f556/experiences"
  }
];


export const Nav = (): JSX.Element => {
  return (
    <div className="sticky top-0 z-40 w-full flex-row justify-between items-center py-2 px-6 border-b border-green-1100/5 bg-beige-100 flex">
      <div className="hidden lg:flex flex-row gap-x-10">
        <h1 className="text-2xl font-lobster text-green-1100">
          <Link href="/">The Davishes</Link>
        </h1>
        <h2 className="text-xl my-auto font-light text-green-1100 font-lobsterTwo">
          8 July, 2023
        </h2>
      </div>
      <div className="ml-auto my-auto flex lg:hidden">
        <Menu as="div" className="relative inline-block text-left my-auto">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2">
              <FaBars
                className="ml-2 -mr-1 h-5 w-5 text-green-1000 "
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-beige-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navItems.map((item) => (
                <div key={item.name} className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={`${active ? 'bg-beige-200' : 'text-green-1000'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm no-underline text-green-1100`}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <nav className="ml-auto hidden lg:flex gap-x-10 flex-row-reverse">
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