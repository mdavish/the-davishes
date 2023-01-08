import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import P from "../components/P";
import "../index.css";

export const getPath = () => "404.html";

const NotFoundPage = () => (
  <Layout>
    <div className="mx-auto my-auto text-center">
      <Header>NOT FOUND</Header>
      <P>
        You just hit a route that doesn&#39;t exist yet.
        The site is still under construction, so please check back later.
      </P>
    </div>
  </Layout>
);

export default NotFoundPage;