import React from "react";
import { ImGithub } from "react-icons/im";

const Footer = (): JSX.Element => {
  return (
    <footer className="absolute bottom-0 z-50 w-full hidden lg:flex flex-row bg-beige-100 bg-gradient-to-t from-beige-100 to-beige-100/50 border-t border-green-1100/5">
      <div className="my-3 mx-auto text-sm text-beige-900/70 flex flex-row gap-x-4">
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            className="no-underline"
            href="https://www.yext.com/">Website Built on Yext</a>
        </div>
        <div className="border-l border-beige-900/10" />
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex flex-row gap-x-1 
            no-underline"
            href="https://github.com/mdavish/the-davishes">
            <ImGithub className="my-auto" /> View Source Code
          </a>
        </div>
      </div>
    </footer >
  )
}

export default Footer;