import React, { useRef } from "react";
import {
  TemplateConfig,
  TransformProps,
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  GetHeadConfig,
} from "@yext/pages/*";
import { getRuntime } from "@yext/pages/util";
import { Site, siteSchema } from "../types/site";
import FadeIn from "react-fade-in";
import { IoChevronDownCircle, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import Layout from "../components/Layout";
import Header from "../components/Header";
import P from "../components/P";
import "../index.css";
import { Image, Link } from "@yext/pages/components";
import { Disclosure, Transition } from "@headlessui/react";
import Block from "../components/Block";
import cx from "classnames";
import Tilt from 'react-parallax-tilt';
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

const SiteTemplate = (props: TemplateRenderProps) => {

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
  const parallaxRef = useRef<IParallax>(null);
  return (
    <Layout>
      <Parallax pages={4.5} ref={parallaxRef} >
        <ParallaxLayer >
          <div
            className="flex flex-col justify-center h-full">
            <FadeIn delay={250} >
              <div
                className="text-center flex flex-col gap-y-10">
                <h1 className="text-8xl tracking-wider text-green-1100 font-lobster">The Davishes</h1>
                <h2 className="text-5xl font-light text-green-1100 font-lobsterTwo">8 July, 2023</h2>
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
            <div className="p-8 my-auto">
              <Header>
                Our Story
              </Header>
              <P>
                {site.c_ourStoryCopy}
              </P>
            </div>
          </div>
        </Block>
        <Block i={1}>
          <Header className="text-center">
            Itinerary
          </Header>
          <div className="flex flex-col gap-y-10">
            {
              site.c_itinerary.map((event, i) => {
                const eventLocation = event.c_eventLocation[0];
                return (
                  <div key={i} className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
                    {/* <div className="shrink-0 aspect-auto">
                    {event.c_eventPhoto &&
                      <Image
                        className="h-48 w-48 object-cover my-auto"
                        image={event.c_eventPhoto}
                      />}
                  </div> */}
                    <div className="flex flex-row gap-x-10">
                      <Header className="my-auto">
                        {i + 1}
                      </Header>
                      <div className="flex flex-col gap-y-2">
                        <h3 className="text-2xl font-medium text-green-1100 font-lobsterTwo">
                          {event.name}
                        </h3>
                        <div className="text-sm text-green-1100 flex flex-row align-baseline">
                          <Link
                            href={`https://calendar.google.com/calendar/r/eventedit?text=${event.name}&dates=${event.time.start.toISOString().replace(/[-:]/g, "")}/${event.time.end.toISOString().replace(/[-:]/g, "")}&details=${event.description}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IoCalendarOutline className="inline-block mr-2 mb-1 text-green-1100" />
                            {event.time.start.toLocaleString("en-US", {
                              // Config matches this format: "July 8, 2023, 5:00 PM"
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </Link>
                        </div>
                        {/* We show a similar looking link for the location */}
                        <div className="text-sm text-green-1100 flex flex-row align-baseline">
                          <Link
                            href={`https://www.google.com/maps/search/`}
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
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Block>
        <Block i={2}>
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
                              className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-green-1100`}
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
      </Parallax>
    </Layout>
  );
};


export default SiteTemplate;