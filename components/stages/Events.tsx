import React from 'react';
import PhotoGallery from "../PhotoGallery";

interface EventsProps {

}

const Events: React.FC<EventsProps> = (props) => {
  return (
    <div className="mt-4 flex flex-col">
      <PhotoGallery
        photos={[
          {
            src: "/palacio.jpeg",
            title: "Welcome Drinks",
            caption: "We'll kick off the wedding weekend with welcome drinks and Portugeuse barbeque at Palacio Estoril on Thursday July 6th 2023"
          },
          {
            title: "Rehearsal Dinner",
            src: "/moltemar.jpeg",
            caption: "We're venturing into Lisboa for the Rehearsal Dinner at Monte Mar, situated in the beautiful Port of Lisbon, on July 7th 2023.",
          },
          {
            title: "Wedding",
            src: "/villa.jpeg",
            caption: "Ashley and Max will tie the knot at Grand Real Villa Italia on July 8th 2023. More details on itinerary to come...",
          },
        ]} />
    </div>
  )
}

export default Events;