import { Address } from "./types/site";

export const addressToUrlString = (address: Address) => {
  return `${address.line1} ${address.line2} ${address.city} ${
    address?.region ?? ""
  } ${address.postalCode}`;
};

export const prettyAddress = (address: Address) => {
  return `${address.line1} ${address.city} ${address?.region ?? ""} ${
    address.postalCode
  }`;
};
