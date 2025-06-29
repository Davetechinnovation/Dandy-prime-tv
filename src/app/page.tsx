"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Bookmark } from "lucide-react";
import { PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Movies from "./movies/page";

const images = [
  {
    src: "/images/im.webp",
    alt: "Dandy-image-1",
    title: "Lio & Stitch",
    year: "2025",
    rating: "7.5 (668 votes)",
    lang: "EN",
    desc: "Description of the movie This means: if no one replies after 5s, we give the 7th one a chance. 🧪 Real-World Example Setup First",
  },
  {
    src: "/images/28years.jpg",
    alt: "Dandy-image-2",
    title: "Lio & Stitch",
    year: "2025",
    rating: "7.5 (668 votes)",
    lang: "EN",
    desc: "Description of the movie This means: if no one replies after 5s, we give the 7th one a chance. 🧪 Real-World Example Setup First",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black min-h-[200dvh] overflow-x-auto min-w-[320px] ">
      <div className="relative w-full h-[90vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <div className="sm:pt-[69px] pt-[61px] w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full h-full bg-black/[30%] flex items-end">
                  <div className="text-white sm:px-10 px-3 pb-8 flex flex-col gap-3  ">
                    <h1 className="sm:text-[50px] text-[30px] font-bold ">
                      {images[index].title}
                    </h1>
                    <p className="flex items-center gap-2 sm:text-[17px] text-[14px] ">
                      <span className="bg-blue-700/[50%] px-2 rounded-sm  ">
                        {images[index].year}
                      </span>
                      <span className=" flex items-center bg-blue-700/[50%] px-2 rounded-md ">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {images[index].rating}
                      </span>
                      <span className="bg-blue-700/[50%] px-2 rounded-sm ">
                        {images[index].lang}
                      </span>
                    </p>
                    <p className="max-w-[700px] sm:text-[17px] text-[14px]">
                      {images[index].desc}
                    </p>
                    <div className="flex sm:gap-4 gap-2 items-center">
                      <button className=" sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2  border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all ">
                        <PlayCircle className="w-6 h-6 cursor-pointer" />
                        Watch Now
                      </button>
                      <button className="  sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2  border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all ">
                        <Bookmark className="w-5 h-5  cursor-pointer  " />
                        Save to watch list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Movies />
    </div>
  );
}
