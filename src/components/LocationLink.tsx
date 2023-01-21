import React from "react";
import { Address } from "../types/site";
import { Link } from "@yext/pages/components";
import { IoLocationOutline } from "react-icons/io5";
import { addressToUrlString, prettyAddress } from "../utils";

interface LocationLinkProps {
  address: Address,
  text?: string,
}

const LocationLink = ({ address, text }: LocationLinkProps): JSX.Element => {
  const addressUrlString = addressToUrlString(address);
  return (
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${addressUrlString}`}
      target="_blank"
      rel="noreferrer"
      className="w-fit"
    >
      <IoLocationOutline className="inline-block mr-2 mb-1 text-green-1100" />
      <span className="text-sm text-green-1100" >{text || prettyAddress(address)}</span>
    </Link>
  )
}

export default LocationLink;