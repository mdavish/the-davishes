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
import ContentBlockComp from "../components/ContentBlock";


export const config: TemplateConfig = {
  stream: {
    $id: "site-stream",
    fields: [
      "name",
      "c_dominantPhoto",
      "c_contentBlocks.name",
      "c_contentBlocks.c_content",
      "c_contentBlocks.c_dominantPhoto",
      "c_contentBlocks.c_secondaryPhoto",
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
  return "website.html"
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => ({
  title: "The Davish Wedding Website",
  lang: "en",
  charset: "utf-8",
});

const SiteTemplate = (props: TemplateRenderProps) => {
  const site = siteSchema.parse(props.document);
  const nBlocks = site.c_contentBlocks?.length ?? 0;
  const parallaxRef = useRef<IParallax>(null);

  return (
    <Layout>
      <Parallax pages={nBlocks + 1} ref={parallaxRef} >
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
        {
          site.c_contentBlocks?.map((block, i) => (
            <ContentBlockComp
              key={i}
              block={block}
              i={i}
            />
          )
          )
        }
      </Parallax>
    </Layout>
  );
}


export default SiteTemplate;