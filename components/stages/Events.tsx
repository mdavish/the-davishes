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
            caption: "Welcome drinks will be held at Palacio Estoril on July 7th 2023.",
          },
          {
            title: "Rehearsal Dinner",
            src: "/moltemar.jpeg",
            caption: "The Rehearsal Dinner will be held at Monte Mar in Lisbon on July 7th 2023. All guests are welcome!",
          },
          {
            title: "Wedding",
            src: "/villa.jpeg",
            caption: "The Wedding will be held at Villa Italia Gran Real on July 8th 2023.",
          },
        ]} />
    </div>
  )
}

export default Events;