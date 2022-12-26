import React, { } from "react";
import Layout from "../components/Layout";
import { GetPath, Template, TemplateRenderProps } from "@yext/pages/*";
import { provideHeadless, SearchHeadlessProvider } from "@yext/search-headless-react";
import RSVPForm from "../components/RSVPForm";
import "../index.css";

export const getPath: GetPath<TemplateRenderProps> = () => {
  return "rsvp"
};

const headless = provideHeadless({
  apiKey: "e5752463b6278ab2218622a356ab15f7",
  locale: "en",
  experienceKey: "davish-goldschmid-wedding",
  experienceVersion: "PRODUCTION",
});

const RsvpTemplate: Template<TemplateRenderProps> = () => {
  return (
    <Layout>
      <SearchHeadlessProvider searcher={headless}>
        <RSVPForm />
      </SearchHeadlessProvider>
    </Layout>
  )
}

export default RsvpTemplate;