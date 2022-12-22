import React, { useRef } from "react";
import {
  TemplateConfig,
  TransformProps,
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  GetHeadConfig
} from "@yext/pages/*";
import { siteSchema } from "../types/site";
import FadeIn from "react-fade-in";
import { IoChevronDownCircle } from "react-icons/io5";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import Layout from "../components/Layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import { Disclosure, Transition } from "@headlessui/react";
import Block from "../components/Block";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import cx from "classnames";

export const config: TemplateConfig = {
  stream: {
    $id: "site-stream",
    fields: [
      "name",
      "c_dominantPhoto",
      "c_ourStoryCopy",
      "c_ourStoryPhoto",
      "c_contentBlocks.name",
      "c_faqs.name",
      "c_faqs.answer",
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
  const site = siteSchema.parse(props.document);
  const parallaxRef = useRef<IParallax>(null);
  return (
    <Layout>
      <Parallax pages={3} ref={parallaxRef} >
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
              <Image
                className="mx-auto h-96 w-96 object-cover"
                image={site.c_ourStoryPhoto}
              />
            </div>
            <div className="p-8 my-auto">
              <h1 className="text-green-1100 text-5xl font-lobster mb-6">
                Our Story
              </h1>
              <p className="text-sm text-stone-800 lg:leading-7">
                {site.c_ourStoryCopy}
              </p>
            </div>
          </div>
        </Block>
        <Block i={1}>
          <div className="flex flex-col h-full">
            <h1 className="mt-36 text-5xl text-center text-green-1100 font-lobster my-4"
            >
              Frequently Asked Questions
            </h1>
            <div className="flex flex-col gap-y-4 w-full lg:w-3/5 mx-auto">
              {
                site.c_faqs.map((faq, i) => (
                  <div key={i} className="flex flex-col">
                    {/* A series of collapse/expandable FAQs */}
                    {/* Each of them uses the Disclosure component from @headlessui/react */}
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
                              <ReactMarkdown className="prose-sm">
                                {faq.answer}
                              </ReactMarkdown>
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
}


export default SiteTemplate;