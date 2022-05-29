import React from 'react';
import { NextPage } from "next";
import Image from "next/image";
import FadeIn from "react-fade-in";
import Head from "next/head";

const HomePage: NextPage = () => {
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
        <div className="absolute w-full h-full bg-lime-900/50 backdrop-blur-sm	">
          <FadeIn delay={250} transitionDuration={1000} className=" mx-auto mt-64 flex flex-col gap-y-8">
            <h1 className="text-center text-amber-50 text-9xl font-lobster">The Davishes</h1>
            <h2 className="font-lobster-two text-amber-50 w-full text-center text-6xl"> 7 . 8 . 23</h2>
          </FadeIn>
        </div>
      </div>
    </>
  )
}

export default HomePage;