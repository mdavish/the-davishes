import "../index.css";
import React, { useState, useEffect, useRef } from "react";
import {
  TemplateConfig,
  TransformProps,
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  GetHeadConfig,
} from "@yext/pages/*";
import { Site, siteSchema } from "../types/site";
import FadeIn from "react-fade-in";
import { IoChevronDownCircle, IoLocationOutline } from "react-icons/io5";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { addressToUrlString } from "../utils";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Block from "../components/Block";
import P from "../components/P";
import Footer from "../components/Footer";
import EventLink from "../components/EventLink";
import { Image, Link } from "@yext/pages/components";
import { Disclosure, Transition } from "@headlessui/react";
import cx from "classnames";
import Tilt from 'react-parallax-tilt';
import { provideHeadless, SearchHeadlessProvider } from "@yext/search-headless-react";
import LodgingMap from "../components/LodgingMap";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Markdown from "markdown-to-jsx";
import ImageBlock from "../components/ImageBlock";
import { IoChatbubblesSharp, IoCaretDownOutline } from "react-icons/io5";

export const config: TemplateConfig = {
  stream: {
    $id: "site-stream",
    fields: [
      "name",
      "c_dominantPhoto",
      "c_secondPhoto",
      "c_thirdPhoto",
      "c_ourStoryCopy",
      "c_ourStoryPhoto",
      "c_faqs.name",
      "c_faqs.answer",
      "c_itinerary.name",
      "c_itinerary.description",
      "c_itinerary.c_eventPhoto",
      "c_itinerary.time",
      "c_itinerary.c_recommendedAttire",
      "c_itinerary.c_eventLocation.name",
      "c_itinerary.c_eventLocation.address",
      "c_recommendedLodging.name",
      "c_recommendedLodging.address",
      "c_recommendedLodging.c_weddingDescription",
      "c_recommendedLodging.c_photo",
      "c_recommendedLodging.priceRange",
    ],
    filter: {
      entityTypes: ["ce_site"]
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  }
};

export const transformProps: TransformProps<TemplateProps> = async (data) => {
  return data
};

export const getPath: GetPath<TemplateProps> = () => {
  return "index.html"
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => ({
  title: "The Davish Wedding Website",
  lang: "en",
  charset: "utf-8",
});

const headless = provideHeadless({
  apiKey: "e5752463b6278ab2218622a356ab15f7",
  locale: "en",
  experienceKey: "davish-goldschmid-wedding",
  experienceVersion: "PRODUCTION",
  headlessId: "location-searcher",
});

const SiteTemplate = (props: TemplateRenderProps) => {

  const parallaxRef = useRef<IParallax>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const hashToIdx: { [k: string]: number } = {
      "our-story": 1,
      "itinerary": 2,
      "lodging": 3,
      "faq": 4,
      "rsvp": 5,
    }
    if (hashToIdx[hash]) {
      parallaxRef.current?.scrollTo(hashToIdx[hash] - 0.07);
    } else {
      console.warn(`Hash ${hash} not found in hashToIdx. You're probably doing something wrong.`);
    }
  }), [parallaxRef.current];

  console.log(props.document);
  let site: Site;
  try {
    site = siteSchema.parse(props.document);
  } catch (e) {
    console.log("Error parsing site document: ")
    console.log({
      document: props.document,
      error: e
    })
    throw e;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsModalOpen(true);
  //   }
  //     , 1000);
  // }, [])

  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div className={cx(
        "fixed z-50 bottom-6 right-4 lg:bottom-14 lg:right-10",
        showChat && "h-auto"
      )}>
        <Transition
          className="fixed right-4 bottom-24 lg:bottom-40 lg:right-10 w-80 lg:w-96 h-2/3 lg:h-1/2  bg-white rounded-xl shadow-xl overflow-hidden"
          as="div"
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={showChat}>
          <iframe
            className="w-full h-full"
            src="https://yext-chatbot-v2-production.up.railway.app/bots/6"
          />
        </Transition>
        <button
          onClick={() => setShowChat(!showChat)}
          className="border border-white shadow-xl hover:shadow-2xl bottom-10 right-10 w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-green-800 to-green-1100 hover:-translate-y-2 transition-all duration-150">
          <div className="flex flex-col justify-center items-center h-full w-full text-white">
            {
              showChat ?
                <IoCaretDownOutline className="text-xl lg:text-3xl text-white" /> :
                <IoChatbubblesSharp className="text-xl lg:text-3xl text-white" />
            }
          </div>
        </button>
      </div>
      <Layout bgPhoto={site.c_dominantPhoto}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Header className="text-center">
            Hello there!
          </Header>
          <P className="text-center">
            Thanks for checking out the Davish wedding website. Feel free to take a look around.
            Just a heads up, this website is still a work in progress, so some things may not be
            fully functional yet.
            If you have any questions, feel free to reach out to Max at davish9@gmail.com
          </P>
          <div className="my-4 flex flex-row">
            <Button
              className="mx-auto w-2/3"
              onClick={() => setIsModalOpen(false)}>
              Got it!
            </Button>
          </div>
        </Modal >
        <Parallax
          pages={5.3}
          ref={parallaxRef}
          config={{
          }}
        >
          <ParallaxLayer className="absolute z-50" offset={0}>
            <div
              className="z-50 flex flex-col justify-center h-full">
              <FadeIn delay={250} >
                <div
                  className="mx-auto w-3/4 text-left flex flex-col gap-y-10 pb-28">
                  <h1 className="text-center lg:text-left text-6xl lg:text-8xl text-green-1100 font-lobster">The Davishes</h1>
                  <h2 className="text-center lg:text-left text-4xl lg:text-5xl font-light text-green-1100 font-lobsterTwo">8 July, 2023</h2>
                  <Link
                    className="mx-auto lg:mx-0 text-2xl lg:text-3xl text-green-1100 font-lobsterTwo bg-green-1000 hover:bg-green-1100 py-2 px-4 border border-white w-fit rounded-xl no-underline"
                    href="/rsvp">
                    <span className="text-white">RSVP Now</span>
                  </Link>
                  <button
                    className="mx-auto lg:mx-0"
                    onClick={() => {
                      parallaxRef.current?.scrollTo(1);
                    }}
                  >
                    <IoChevronDownCircle className="mt-4 text-3xl text-green-1100 animate-bounce" />
                  </button>
                </div>
              </FadeIn>
            </div>
          </ParallaxLayer>
          {/* <ImageBlock sticky={{ start: 0, end: 0.5 }} className="lg:bottom-48 lg:-right-64" photo={site.c_dominantPhoto} /> */}
          {/* <ImageBlock sticky={{ start: 1.7, end: 2.9 }} className="lg:bottom-64 lg:-right-64" photo={site.c_secondPhoto} /> */}
          {/* <ImageBlock sticky={{ start: 3.9, end: 5 }} className="lg:bottom-64 lg:-right-64" photo={site.c_thirdPhoto} /> */}
          <Block i={0}>
            <div className="h-full flex lg:flex-row-reverse flex-col gap-y-2 align-middle max-w-7xl">
              <div className="lg:p-8 my-auto">
                <Header
                  className="text-center lg:text-left"
                  href="our-story"
                >
                  Our Story
                </Header>
                <div className="">
                  <P>
                    {site.c_ourStoryCopy}
                  </P>
                </div>
              </div>
              <div className="shrink-0 aspect-auto my-auto relative">
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.4}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                >
                  <Image
                    className="mx-auto h-96 w-96 object-cover rounded-md"
                    image={site.c_ourStoryPhoto}
                  />
                </Tilt>
              </div>
            </div>
          </Block>
          <Block i={1}>
            <div className="w-full flex flex-row">
              <div className="mx-auto lg:mx-0">
                <Header className="text-center lg:mx-auto" href="itinerary">
                  Itinerary
                </Header>
              </div>
            </div>
            <div className="flex flex-col gap-y-10 w-full lg:w-2/3">
              {
                site.c_itinerary.map((event, i) => {
                  const eventLocation = event.c_eventLocation[0];
                  const addressUrlString = addressToUrlString(eventLocation.address);
                  return (
                    <div key={i} className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
                      <div className="flex flex-row gap-x-2 lg:gap-x-10">
                        <div className="hidden lg:block">
                          <Header className="">
                            {i + 1}
                          </Header>
                          {/* There is a nice large vertical line tying each together */}
                          <div className="w-[1.5px] h-3/4 mx-auto bg-green-1100/50 my-auto hidden lg:block" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h3 className="text-2xl font-medium text-green-1100 font-lobsterTwo">
                            <span className="lg:hidden">
                              {`${i + 1}.`}
                            </span>
                            {event.name}
                          </h3>
                          <div className="flex flex-row align-baseline">
                            <EventLink event={event} />
                          </div >
                          <div className="text-sm text-green-1100 flex flex-row align-baseline">
                            <Link
                              href={`https://www.google.com/maps/search/?api=1&query=${addressUrlString}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IoLocationOutline className="inline-block mr-2 mb-1 text-green-1100" />
                              {eventLocation?.name ?? "TBD"}
                            </Link>
                          </div>
                          <P className="max-h-48 text-ellipsis overflow-hidden">
                            {event.description}
                          </P>
                        </div >
                      </div >
                    </div >
                  )
                })
              }
            </div >
          </Block >
          <Block i={2}>
            <Header href="lodging">
              Lodging
            </Header>
            <SearchHeadlessProvider searcher={headless}>
              <LodgingMap />
            </SearchHeadlessProvider>
          </Block>
          <Block
            i={3}>
            <div className="flex flex-col h-full">
              <div>
                <Header
                  href="faq"
                  className="text-center lg:text-left">
                  Frequently Asked Questions
                </Header>
              </div>
              <div className="flex flex-col gap-y-4 w-full max-w-xl">
                {
                  site.c_faqs.map((faq, i) => (
                    <div key={i} className="flex flex-col">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={cx(
                                open && "bg-green-1100/5",
                                "flex justify-between w-full px-4 py-2 text-sm font-medium text-left hover:bg-green-1100/5 rounded-lg transition-colors ease-in  text-green-1100"
                              )}
                            >
                              <span>{faq.name}</span>
                              <svg
                                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-green-1100 shrink-0`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Disclosure.Button>
                            <Transition
                              enter="transition ease-out duration-250"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-green-1100">
                                <Markdown className="prose prose-sm text-green-1100">
                                  {faq.answer}
                                </Markdown>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))
                }
              </div>
            </div>
          </Block>
        </Parallax >
        <Footer />
      </Layout >
    </>
  );
};


export default SiteTemplate;