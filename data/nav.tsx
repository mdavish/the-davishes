import React, { ReactNode } from "react";
import Events from "../components/stages/Events";

interface NavItem {
  title: string;
  subtitle: string | ReactNode;
  children?: ReactNode;
  imgSrc?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[],
}

export const navItems: NavItem[] = [
  {
    title: "Our Story",
    imgSrc: "/proposal.jpeg",
    subtitle:
      <div className="flex flex-col font-serif text-center gap-y-4 text-sm md:text-base lg:text-xl">
        <p>
          Thanks to an Ernst & Young travel project, we got stuck driving 2 hours every day to a client site together in North Carolina.
          At first, the awkward car rides were filled with Max making unnecessary small talk about work.
          However, over time, we warmed up to each other over a shared love of food, booze, travel, and Austin Powers.
        </p>
        <p>
          We had our first date drinking Boulvardiers (expensed to EY) at the Kimpton Hotel Bar in October 2018.
        </p>
        <p>
          After many road trips, surviving in a studio for the first year of COVID, to getting our fur baby Woody (also known as Willard, Babby Boy da Prince, Yurt Boy , Squirrel, Wilfred Brimley),
          Max proposed on January 28, 2022 in Rhinebeck, NY!
        </p>
        <p>
          We are so excited to kick start this next chapter of life with all of you in Cascais, Portugal next year!
        </p>
      </div>
  },
  {
    title: "Events",
    imgSrc: "/moltemar.jpeg",
    images: [{
      src: "/palacio.jpeg",
      alt: "Welcome Drinks",
      caption: "We'll kick off the wedding weekend with welcome drinks and Portugeuse barbeque at Palacio Estoril on Thursday, July 6th, 2023."
    },
    {
      alt: "Rehearsal Dinner",
      src: "/moltemar.jpeg",
      caption: "We're venturing into Lisboa for the Rehearsal Dinner at Monte Mar, situated in the beautiful Port of Lisbon, on Friday, July 7th, 2023.",
    },
    {
      alt: "Wedding",
      src: "/villa.jpeg",
      caption: "Ashley and Max will tie the knot at Grand Real Villa Italia on Saturday, July 8th, 2023.",
    }],
    subtitle:
      <div className="">
        <p className="text-center font-serif">
          Get ready for a jam-packed weekend!
          You&apos;re all coming to Portugal to celebrate with us so we want to make sure that your weekend is full of fun, food, and booze.
          We&apos;ll be hosting celebratory events from July 6th to July 8th.
          All guests are welcome!
        </p>
      </div>,
    children: <Events></Events>
  },
  {
    title: "Travel",
    subtitle: "More details to come on recommended flights & accommodations.",
    imgSrc: "/portugal.jpg",
  },
  {
    title: "Things-to-do",
    subtitle: "Stay tuned for a detailed travel guide for all things to see, eat, and drink in Lisbon, Sintra, and Cascais! ",
    imgSrc: "/family.jpeg",
  },
  {
    title: "Registry",
    imgSrc: "/couple.jpeg",
    subtitle: "More details to come.",
  },
]