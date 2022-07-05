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
  const [selectedLayer, setSelectedLayer] = useState(0);
  return (
    <>
      <Head>
        <title>The Davishes</title>
        <meta name="description" content="The wedding website of Max Davish and Ashley Goldschmid." />
      </Head>
      <div className="absolute h-14 z-50 top-0 flex flex-row w-full">
        <FadeIn className="w-full" delay={1750} transitionDuration={1000}>
          <div className="bg-white/5 mx-auto flex flex-row gap-y-4 border-b border-gray-300 backdrop-blur-md">
            <div className="py-4 mx-auto flex flex-row gap-x-4 lg:gap-x-8 text-white font-serif">
              {
                navItems.map((item, index) => {
                  return (
                    <NavItem
                      selected={selectedLayer === index}
                      onSelect={() => ref.current.scrollTo(index + 1)}
                      key={index}
                      label={item.title}
                    />
                  )
                })
              }
            </div>
          </div>
        </FadeIn>
      </div>
      <Parallax ref={ref} pages={navItems.length + 2} className="bg-gray-900">
        <ParallaxLayer offset={0} speed={0.3}>
          <>
            <div className="absolute w-full h-full">
              <Image
                priority
                objectFit="cover"
                src="/lighthouse.jpg"
                className="object-none"
                alt="A picture of Portugal"
                layout="fill"
                placeholder="blur"
                blurDataURL="/lighthouse_small.jpeg"
              />
            </div>
            <div className="absolute z-10 w-full h-full bg-slate-900/60 backdrop-blur-sm">
            </div>
          </>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1}>
          <FadeIn delay={250} transitionDuration={1000} className="mx-auto mt-64 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-8">
              <h1 className="text-center text-amber-50 text-7xl lg:text-9xl font-lobster">The Davishes</h1>
              <h2 className="font-lobster-two text-amber-50 w-full text-center text-5xl lg:text-6xl"> 7 . 8 . 23</h2>
              <div className="flex flex-row">
                <FadeIn
                  delay={500}
                  className="mx-auto">
                  <div className="mx-auto">
                    {/* <h3 className="font-serif text-white mb-2 text-xl lg:text-2xl">Scroll Down</h3> */}
                    <FaChevronDown className="mt-4 mx-auto animate-bounce text-xl lg:text-3xl text-white" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </ParallaxLayer>
        {
          navItems.map((item, index) => (
            <Layer
              direction={index % 2 === 0 ? "left" : "right"}
              key={index}
              offset={index + 1}
              title={item.title}
              subtitle={item.subtitle}
              expanded={expanded}
              onScreenEnter={() => setSelectedLayer(index)}
              imgSrc={item.imgSrc}
            >
              {item.children && item.children}
            </Layer>
          )
          )
        }
      </Parallax>
    </>
  )
}

export default HomePage;