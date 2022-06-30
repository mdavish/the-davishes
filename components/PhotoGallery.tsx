import React, { useState } from 'react';
import Image from "next/image";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from "react-icons/bs";

interface Photo {
  src: string;
  title?: string;
  caption?: string;
  date?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const buttonClass = "my-auto text-xl hover:cursor-pointer disabled:text-gray-300";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = photos[selectedIndex];
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-lobster-two text-2xl mx-auto">{selectedImage.title}</h1>
      <div className="w-full flex flex-row gap-x-4 overflow-x-scroll">
        <div className="mx-auto flex flex-row gap-x-4">
          <button
            disabled={selectedIndex === 0}
            onClick={() => setSelectedIndex(selectedIndex - 1)}
            className={buttonClass}>
            <BsFillArrowLeftCircleFill />
          </button>
          <Image
            className="rounded-lg"
            key={selectedImage.src}
            src={selectedImage.src}
            alt={selectedImage.caption}
            width={440}
            height={330}
          />
          <button
            disabled={selectedIndex === photos.length - 1}
            onClick={() => setSelectedIndex(selectedIndex + 1)}
            className={buttonClass}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
      {
        selectedImage.caption &&
        <div className="w-2/3 mx-auto">
          <p className="font-serif text-center text-base ">
            {selectedImage.caption}
          </p>
        </div>
      }
    </div >
  )
}

export default PhotoGallery;