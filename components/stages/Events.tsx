import React from 'react';
import PhotoGallery from "../PhotoGallery";

interface Event {
  name: string;
  where: string,
  when: string
  whereHref?: string;
  whenHref?: string;
}

const events: Event[] = [
  {
    name: "Welcome Drinks",
    where: "Palacio Estoril",
    when: "July 6th, 2023",
    whereHref: "https://g.page/PalacioEstorilHotel?share"
  },
  {
    name: "Rehearsal Dinner",
    where: "Monte Mar",
    when: "July 7th, 2023",
    whereHref: "https://goo.gl/maps/9YdUffSnR86BCL8e6"
  },
  {
    name: "The Wedding",
    where: "Grand Real Villa Italia",
    when: "July 8th, 2023",
    whereHref: "https://g.page/hotel-grande-real-villa-italia?share"
  },
]

const Events: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6 font-serif">
      {
        events.map((event, index) => (
          <div className="text-center mx-auto"
            key={index}
          >
            <h1 className="text-xl mx-auto mb-1">
              {`${index + 1}. `}
              {event.name}
            </h1>
            <h3 className="text-gray-300">
              {event.where ?
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:underline hover:text-gray-50" href={event.whereHref}>{event.where}</a>
                : <span>{event.whereHref}</span>
              }
            </h3>
            <h3 className="text-gray-300">
              {event.when ?
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:underline hover:text-gray-50" href={event.whenHref}>{event.when}</a>
                : <span>{event.when}</span>
              }
            </h3>
          </div>
        )
        )
      }
    </div>
  )
}

export default Events;