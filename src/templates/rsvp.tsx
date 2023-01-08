import React from "react";
import Layout from "../components/Layout";
import { GetPath, Template, TemplateRenderProps, TemplateConfig } from "@yext/pages/*";
import { provideHeadless, SearchHeadlessProvider } from "@yext/search-headless-react";
import RSVPForm from "../components/RSVPForm";
import { itinerarySchema, photoSchema } from "../types/site";
import "../index.css";

// This also includes the site config so you can fetch the itinerary
export const config: TemplateConfig = {
  stream: {
    $id: "rsvp-stream",
    fields: [
      "c_dominantPhoto",
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

export const getPath: GetPath<TemplateRenderProps> = () => {
  return "rsvp"
};

const headless = provideHeadless({
  apiKey: "e5752463b6278ab2218622a356ab15f7",
  locale: "en",
  experienceKey: "davish-goldschmid-wedding",
  experienceVersion: "PRODUCTION",
});

const RsvpTemplate: Template<TemplateRenderProps> = (props: TemplateRenderProps) => {
  const rawDocument = props.document;
  const itinerary = itinerarySchema.parse(rawDocument.c_itinerary);
  const photo = photoSchema.parse(rawDocument.c_dominantPhoto);
  return (
    <Layout bgPhoto={photo}>
      <SearchHeadlessProvider searcher={headless}>
        <RSVPForm itinerary={itinerary} />
      </SearchHeadlessProvider>
    </Layout>
  )
}

export default RsvpTemplate;