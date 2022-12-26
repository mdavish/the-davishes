import React from "react";
import { Event } from "../types/site";
import { Link } from "@yext/pages/components";
import { IoCalendarOutline } from "react-icons/io5";
import { addressToUrlString } from "../utils";
import cx from "classnames";

const EventLink = (props: { event: Event, className?: string }) => {
  const event = props.event;
  const eventLocation = event.c_eventLocation[0];
  const addressUrlString = addressToUrlString(eventLocation.address);
  return (
    <Link
      className={cx(
        "text-sm text-green-1100",
        props.className
      )}
      href={`https://calendar.google.com/calendar/r/eventedit?text=${event.name}&dates=${event.time.start.toISOString().replace(/[-:]/g, "")}/${event.time.end.toISOString().replace(/[-:]/g, "")}&details=${JSON.stringify(event.description)}&location=${addressUrlString}`}
      target="_blank"
      rel="noreferrer"
    >
      <IoCalendarOutline className="inline-block mr-2 mb-1 text-green-1100" />
      {
        event.time.start.toLocaleString("en-US", {
          // Config matches this format: "July 8, 2023, 5:00 PM"
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      }
    </Link >
  )
};

export default EventLink;