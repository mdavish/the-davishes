import "../index.css";
import React, { useEffect, useRef } from "react";
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
// import ReactMarkdown from "react-markdown";

export const config: TemplateConfig = {
  stream: {
    $id: "site-stream",
    fields: [
      "name",
      "c_dominantPhoto",
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
  return (
    <Layout>
      <Parallax pages={5.5} ref={parallaxRef}>
        <ParallaxLayer >
          <div
            className="flex flex-col justify-center h-full">
            <FadeIn delay={250} >
              <div
                className="text-center flex flex-col gap-y-10">
                <h1 className="text-6xl lg:text-8xl text-green-1100 font-lobster">The Davishes</h1>
                <h2 className="text-4xl lg:text-5xl font-light text-green-1100 font-lobsterTwo">8 July, 2023</h2>
                <button
                  onClick={() => {
                    parallaxRef.current?.scrollTo(1);
                  }}
                >
                  <IoChevronDownCircle className="mt-4 mx-auto text-3xl text-green-1100 animate-bounce" />
                </button>
              </div>
            </FadeIn>
          </div>
        </ParallaxLayer>
        <Block i={0}>
          <div className="h-full flex lg:flex-row flex-col gap-y-2 align-middle">
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
            <div className="lg:p-8 my-auto">
              <Header
                className="text-center lg:text-left"
                href="our-story"
              >
                Our Story
              </Header>
              <P>
                {site.c_ourStoryCopy}
              </P>
            </div>
          </div>
        </Block>
        <Block i={1}>
          <div className="w-full flex flex-row">
            <div className="lg:mx-auto">
              <Header className="lg:mx-auto" href="itinerary">
                Itinerary
              </Header>
            </div>
          </div>
          <div className="flex flex-col gap-y-10">
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
                        <P>
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
        <Block i={3}>
          <div className="flex flex-col h-full">
            <Header className="text-center">
              Frequently Asked Questions
            </Header>
            <div className="flex flex-col gap-y-4 w-full lg:w-3/5 mx-auto">
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
                              {faq.answer}
                              {/* Weird hack due to `document` being undefined */}
                              {/* {ReactMarkdown &&
                                <ReactMarkdown className="prose-sm list-disc list-outside">
                                  {faq.answer}
                                </ReactMarkdown>} */}
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
  );
};


export default SiteTemplate;