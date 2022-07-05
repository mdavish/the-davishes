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
    <div className="w-full h-full flex flex-col gap-y-4">
      {/* <h1 className="font-lobster-two text-2xl mx-auto">{selectedImage.title}</h1> */}
      <div className="w-full h-full flex flex-row gap-x-4 overflow-x-scroll">
        <div className="w-full mx-auto flex flex-row gap-x-4 relative">
          <button
            disabled={selectedIndex === 0}
            onClick={() => setSelectedIndex(selectedIndex - 1)}
            className={buttonClass}>
            <BsFillArrowLeftCircleFill />
          </button>
          <div className="relative w-h-full w-full">
            <Image
              className="rounded-lg"
              objectFit="cover"
              layout="fill"
              key={selectedImage.src}
              src={selectedImage.src}
              alt={selectedImage.caption}
            />
            <div className="text-sm lg:text-base rounded-b-lg py-3 px-6 lg:px-10 font-serif bg-gray-900/90 w-full bottom-0 absolute z-10 text-center">
              {selectedImage.caption}
            </div>
          </div>
          <button
            disabled={selectedIndex === photos.length - 1}
            onClick={() => setSelectedIndex(selectedIndex + 1)}
            className={buttonClass}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
      {/* {
        selectedImage.caption &&
        <div className="w-2/3 mx-auto">
          <p className="font-serif text-center text-base ">
            {selectedImage.caption}
          </p>
        </div>
      } */}
    </div >
  )
}

export default PhotoGallery;