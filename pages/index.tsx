import React, { useState, useRef } from 'react';
import { NextPage } from "next";
import Image from "next/image";
import FadeIn from "react-fade-in";
import Head from "next/head";
import { FaChevronDown } from "react-icons/fa/";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { config } from "react-spring";
import NavItem from "../components/NavItem";
import Layer from "../components/Layer";
import { navItems } from "../data/nav";
import { BsFillArrowLeftCircleFill, BsDot } from "react-icons/bs";
import { Transition } from "@headlessui/react";
import cx from "classnames";

const HomePage: NextPage = () => {
  const ref = useRef<IParallax>();
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <Head>
        <title>The Davishes</title>
        <meta name="description" content="The wedding website of Max Davish and Ashley Goldschmid." />
      </Head>
      <div className="w-screen h-screen cool-bg grid">
        <div className="w-full h-full">
          <Image src="/portugal.jpg" alt="A picture of Portugal" layout="fill" />
        </div>
        <div className="absolute w-full h-full bg-green-900/60 backdrop-blur-sm flex">
          <Parallax
            pages={6}
            ref={ref}
            config={config.gentle}
          >
            <ParallaxLayer offset={0} speed={1.5}>
              <FadeIn delay={250} transitionDuration={1000} className="mx-auto mt-64 flex flex-col gap-y-8">
                <h1 className="text-center text-amber-50 text-7xl lg:text-9xl font-lobster">The Davishes</h1>
                <h2 className="font-lobster-two text-amber-50 w-full text-center text-5xl lg:text-6xl"> 7 . 8 . 23</h2>
                <div className="flex flex-row">
                  <FadeIn
                    delay={500}
                    className="mx-auto">
                    <div className="mx-auto">
                      <h3 className="font-serif text-white mb-2 text-xl lg:text-2xl">Scroll Down</h3>
                      <FaChevronDown className="mt-4 mx-auto animate-bounce text-3xl text-white" />
                    </div>
                  </FadeIn>
                </div>
              </FadeIn>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 1, end: 6 }}>
              <div className="mx-auto my-auto text-white h-full flex w-full lg:w-2/3">
                <div className="mt-36 w-2/5 py-4 px-2">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className={cx(
                      "ml-0.5 mx-auto mb-4 text-neutral-200 hover:text-white transition duration-150 text-lg lg:text-xl",
                      expanded && "rotate-180"
                    )}
                  >
                    <BsFillArrowLeftCircleFill />
                  </button>
                  <Transition
                    as="div"
                    className="flex flex-col gap-y-4 overflow-hidden transition-width"
                    show={expanded}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <h1 className="text-2xl lg:text-5xl font-lobster-two">Welcome to our wedding website.</h1>
                    <p className="font-serif text-xs lg:text-lg">Here you can find information about our wedding, RSVP, sign up for updates, and more!</p>
                    {
                      navItems.map((item, index) => (
                        <NavItem
                          selected={false}
                          key={index}
                          number={index + 1}
                          label={item.title}
                          onSelect={() => ref.current.scrollTo(index + 1)}
                        />
                      )
                      )
                    }
                  </Transition>
                  <Transition
                    as="div"
                    className="flex flex-col gap-y-2 w-fit"
                    show={!expanded}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {
                      navItems.map((item, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => ref.current.scrollTo(index + 1)}
                            className={cx(
                              "text-2xl my-auto text-gray-200 hover:text-white transition-colors"
                            )}
                          >
                            <BsDot />
                          </button>
                        )
                      })
                    }
                  </Transition>
                </div>
              </div>
            </ParallaxLayer>
            {
              navItems.map((item, index) => (
                <Layer
                  key={index}
                  offset={index + 1}
                  title={item.title}
                  subtitle={item.subtitle}
                  expanded={expanded}
                >
                </Layer>
              )
              )
            }
          </Parallax>
        </div>
      </div>
    </>
  )
}

export default HomePage;