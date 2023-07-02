import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { GetPath, TemplateRenderProps, TemplateConfig, GetHeadConfig } from "@yext/pages";

export const seats: Array<string[]> = [
  ["Ashley", "Max", "Nick", "Sam", "Natalie", "Jake", "Peter", "Allison", "Michaela", "Gio"],
  ["Martin", "Anouk", "Armando", "Cecile", "Antoine", "Andrea", "Steve", "Daniel"],
  ["Connor", "Jayla", "Mackenzie", "Annie", "Reid", "Mac", "Madelyn", "Ross", "Zach"],
  ["Anne", "Kathy", "Greg", "Wendy", "Sheryl", "Kent", "Helene", "Ronnie", "Gina", "Tom", "Nancy"],
  ["Lucas", "Brenna", "Stephanie", "George", "Luis", "Xana", "Cuca", "David"],
  ["Patrick", "Tony", "Michelle", "Deb", "Jon", "Mark", "Nancy", "Steve", "Peggy"],
  ["Dennis", "Stacey", "Sondra", "Josh", "Santiago", "Michelle", "Leo", "Dominque", "Andrew"],
  ["Francesca", "Gavin", "Pressler", "Coleman", "Trey", "Walker", "Kate", "Frank", "Mike", "Jon"],
  ["Max", "Tanja", "Colin", "Alex", "Josh", "Ed", "Romy", "Christian", "Kim", "Seth"],
  ["Colby", "Matt", "Ariana", "Jeff", "Ali", "Joey", "Morgan", "Tommy"]
];


export const config: TemplateConfig = {
  stream: {
    $id: "rehearsal-stream",
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
  return "rehearsal"
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => ({
  title: "The Davish Wedding Website",
  lang: "en",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
});

export default function RehearsalTemplate(props: TemplateRenderProps) {
  const rawDocument = props.document;
  const photo = rawDocument.c_dominantPhoto;
  return (
    <Layout bgPhoto={photo}>
      <div className="w-full h-full p-6 overflow-auto">
        <Header className="mb-10">
          Rehearsal Dinner Seating Chart
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
          {
            seats.map((row, i) => {
              return (
                <div key={i} className="py-3 px-5 flex flex-col gap-y-2 bg-beige-500/30 rounded-md border border-beige-400">
                  <h2 className="font-lobsterTwo text-xl text-green-1100">
                    Table {i + 1}
                  </h2>
                  <div className="grid grid-cols-2 gap-y-2">
                    {
                      row.map((name, j) => {
                        return (
                          <div key={j} className="w-1/2 text-left text-sm  text-green-1100 font-serif whitespace-nowrap">
                            {`${j + 1}. ${name}`}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}