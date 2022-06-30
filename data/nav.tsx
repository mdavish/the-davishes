import React, { ReactNode } from "react";
import Events from "../components/stages/Events";

interface NavItem {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export const navItems: NavItem[] = [
  {
    title: "Events",
    subtitle: "We will be having three successive events from July 6th to July 8th. All guests are welcome at all events.",
    children: <Events />,
  },
  {
    title: "Travel",
    subtitle: "The Rehearsal Dinner will be held at Monte Mar in Lisbon on July 7th 2023. All guests are welcome!",
  },
  {
    title: "FAQ",
    subtitle: "The wedding will be held at Villa Italia Gran Real on July 8th 2023.",
  },
  {
    title: "Photos",
    subtitle: "We recommend staying in either Cascais or Lisbon. Cascais will be closer to the wedding venue. If you stay in Lisbon, just be aware that you'll have to take a train ride to the wedding venue.",
  },
  {
    title: "Registry",
    subtitle: "We recommend flying to Lisbon and booking as quickly as possible. The earliest you can book most airlines is one year out.",
  },
  {
    title: "Contact",
    subtitle: "If you have questions email Max at davish9@gmail.com",
  },
]