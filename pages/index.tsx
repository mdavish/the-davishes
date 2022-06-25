import React, { useRef } from 'react';
import { NextPage } from "next";
import Image from "next/image";
import FadeIn from "react-fade-in";
import Head from "next/head";
import { FaChevronDown } from "react-icons/fa/";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { config } from "react-spring";
import NavItem from "../components/NavItem";
import Layer from "../components/Layer";

const navItems: { title: string, subtitle: string }[] = [
  {
    title: "Welcome Drinks",
    subtitle: "Welcome drinks will be held at Palacio Estoril on July 6th 2023. All guests are welcome!",
  },
  {
    title: "Rehearsal Dinner",
    subtitle: "The Rehearsal Dinner will be held at Monte Mar in Lisbon on July 7th 2023. All guests are welcome!",
  },
  {
    title: "The Wedding",
    subtitle: "The wedding will be held at Villa Italia Gran Real on July 8th 2023.",
  },
  {
    title: "Accommodations",
    subtitle: "We recommend staying in either Cascais or Lisbon. Cascais will be closer to the wedding venue. If you stay in Lisbon, just be aware that you'll have to take a train ride to the wedding venue.",
  },
  {
    title: "Transportation",
    subtitle: "We recommend flying to Lisbon and booking as quickly as possible. The earliest you can book most airlines is one year out.",
  },
  {
    title: "Contact",
    subtitle: "If you have questions email Max at davish9@gmail.com",
  },
]


const HomePage: NextPage = () => {
  const ref = useRef<IParallax>();
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
                <div className="my-auto w-2/5 p-4 flex flex-col gap-y-4 ">
                  <h1 className="text-2xl lg:text-5xl font-lobster-two">Welcome to our wedding website.</h1>
                  <p className="font-serif text-sm lg:text-lg">Here you can find information about our wedding, RSVP, sign up for updates, and more!</p>
                  {
                    navItems.map((item, index) => (
                      <NavItem
                        selected={false}
                        key={index}
                        number={index + 1}
                        label={item.title}
                        onSelect={() => ref.current.scrollTo(index)}
                      />
                    )
                    )
                  }
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