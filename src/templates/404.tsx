import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import P from "../components/P";
import "../index.css";
import { GetHeadConfig, TemplateRenderProps } from "@yext/pages";

export const getPath = () => "404.html";

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => ({
  title: "The Davish Wedding Website",
  lang: "en",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
});

const NotFoundPage = () => (
  <Layout>
    <div className="mx-auto my-auto text-center">
      <Header>Not Found</Header>
      <P>
        You just hit a route that doesn&#39;t exist yet.
        The site is still under construction, so please check back later.
      </P>
    </div>
  </Layout>
);

export default NotFoundPage;