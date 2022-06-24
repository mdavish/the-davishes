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
    subtitle: "A selection of drinks to welcome your guests",
  },
  {
    title: "Rehearsal Dinner",
    subtitle: "A selection of drinks to welcome your guests",
  },
  {
    title: "The Wedding",
    subtitle: "A selection of drinks to welcome your guests",
  },
  {
    title: "Transportation",
    subtitle: "A selection of drinks to welcome your guests",
  },
  {
    title: "Accommodations",
    subtitle: "A selection of drinks to welcome your guests",
  },
  {
    title: "Contact",
    subtitle: "A selection of drinks to welcome your guests",
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
                <h1 className="text-center text-amber-50 text-9xl font-lobster">The Davishes</h1>
                <h2 className="font-lobster-two text-amber-50 w-full text-center text-6xl"> 7 . 8 . 23</h2>
                <div className="flex flex-row">
                  <FadeIn
                    delay={500}
                    className="mx-auto">
                    <div className="mx-auto">
                      <h3 className="font-serif text-white mb-2 text-2xl">Scroll Down</h3>
                      <FaChevronDown className="mt-4 mx-auto animate-bounce text-3xl text-white" />
                    </div>
                  </FadeIn>
                </div>
              </FadeIn>
            </ParallaxLayer>
            <ParallaxLayer
              sticky={{ start: 1, end: 6 }}>
              <div className="mx-auto my-auto text-white h-full flex w-2/3">
                <div className="my-auto w-2/5 p-4 flex flex-col gap-y-4 ">
                  <h1 className="text-5xl font-lobster-two">Welcome to our wedding website.</h1>
                  <p className="font-serif text-lg">Here you can find information about our wedding, RSVP, sign up for updates, and more!</p>
                  <NavItem
                    number={1}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(1)}
                    label="Welcome Drinks"
                  />
                  <NavItem
                    number={2}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(2)}
                    label="Rehearsal Dinner"
                  />
                  <NavItem
                    number={3}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(3)}
                    label="The Wedding"
                  />
                  <NavItem
                    number={4}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(4)}
                    label="Flights and Transportation"
                  />
                  <NavItem
                    number={5}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(5)}
                    label="Accomodations"
                  />
                  <NavItem
                    number={6}
                    selected={false}
                    onSelect={() => ref.current.scrollTo(6)}
                    label="Contact"
                  />
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