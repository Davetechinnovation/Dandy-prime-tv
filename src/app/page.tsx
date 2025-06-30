"use client";
import Image from "next/image";
import { Star, Bookmark, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Movies from "./movies/page";

type HeroMovie = {
  id: number;
  title: string;
  image: string | null;
  year: string | null;
  rating: number;
  votes: number;
  language: string;
  description: string;
};

export default function Home() {
  const [movies, setMovies] = useState<HeroMovie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const res = await fetch("/api/home/hero");
        const data = await res.json();
        setMovies(data);
      } catch (e) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (movies.length <= 1) return;

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      // Wait for transition to complete before changing index
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsTransitioning(false);
      }, 700); // Match this with your transition duration
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentIndex, movies.length]);

  const nextIndex = (currentIndex + 1) % movies.length;
  const currentMovie = movies[currentIndex];
  const nextMovie = movies[nextIndex];

  return (
    <>
      <div className="bg-black min-w-[320px] pt-[68px] min-h-screen">
        <div className="relative w-full h-[60vh] sm:h-[83vh] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="flex items-center justify-center w-full h-full text-white text-xl">
                Loading...
              </div>
            ) : movies.length > 0 ? (
              <div>
                {/* Current slide */}
                <motion.div
                  key={`current-${currentIndex}`}
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isTransitioning ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="w-full h-[60vh] sm:h-[80vh] aspect-[16/9] relative">
                    {currentMovie?.image && (
                      <Image
                        src={currentMovie.image}
                        alt={currentMovie.title}
                        fill
                        className=" object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-black/[30%] flex items-end">
                      <div className="text-white sm:px-10 px-3 sm:pb-10 pb-2 flex flex-col gap-2">
                        <h1 className="sm:text-[50px] text-[25px] font-bold">
                          {currentMovie.title}
                        </h1>
                        <p className="flex items-center gap-2 sm:text-[17px] text-[14px]">
                          <span className="bg-blue-700/[50%] px-2 rounded-sm">
                            {currentMovie.year}
                          </span>
                          <span className="flex items-center bg-blue-700/[50%] px-2 rounded-md">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {currentMovie.rating} ({currentMovie.votes} votes)
                          </span>
                          <span className="bg-blue-700/[50%] px-2 rounded-sm">
                            {currentMovie.language?.toUpperCase()}
                          </span>
                        </p>
                        <p className="max-w-[700px] sm:text-[17px] text-[14px] line-clamp-2">
                          {currentMovie.description}
                        </p>
                        <div className="flex sm:gap-4 gap-2 items-center">
                          <button className="sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2 border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all">
                            <PlayCircle className="w-5 h-5 cursor-pointer" />
                            Watch Now
                          </button>
                          <button className="sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2 border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all">
                            <Bookmark className="w-5 h-5 cursor-pointer" />
                            Save to watch list
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Next slide */}
                {isTransitioning && (
                  <motion.div
                    key={`next-${nextIndex}`}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="w-full h-[60vh] sm:h-[80vh] aspect-[16/9] relative">
                      {nextMovie?.image && (
                        <Image
                          src={nextMovie.image}
                          alt={nextMovie.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      )}
                      <div className="absolute bottom-0 left-0 w-full h-full bg-black/[30%] flex items-end">
                        <div className="text-white sm:px-10 px-3 sm:pb-10 pb-2 pt-[69px] flex flex-col gap-2">
                          <h1 className="sm:text-[50px] text-[25px] font-bold">
                            {nextMovie.title}
                          </h1>
                          <p className="flex items-center gap-2 sm:text-[17px] text-[14px]">
                            <span className="bg-blue-700/[50%] px-2 rounded-sm">
                              {nextMovie.year}
                            </span>
                            <span className="flex items-center bg-blue-700/[50%] px-2 rounded-md">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              {nextMovie.rating} ({nextMovie.votes} votes)
                            </span>
                            <span className="bg-blue-700/[50%] px-2 rounded-sm">
                              {nextMovie.language?.toUpperCase()}
                            </span>
                          </p>
                          <p className="max-w-[600px] sm:text-[17px] text-[14px] line-clamp-2">
                            {nextMovie.description}
                          </p>
                          <div className="flex sm:gap-4 gap-2 items-center">
                            <button className="sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2 border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all">
                              <PlayCircle className="w-5 h-5 cursor-pointer" />
                              Watch Now
                            </button>
                            <button className="sm:text-[17px] text-[14px] flex items-center gap-2 bg-blue-700 sm:px-4 px-2 py-[5px] rounded-md cursor-pointer border-2 border-blue-700 hover:text-blue-700 hover:bg-transparent duration-500 transition-all">
                              <Bookmark className="w-5 h-5 cursor-pointer" />
                              Save to watch list
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white text-xl">
                No movies found.
              </div>
            )}
          </AnimatePresence>
        </div>
        <Movies />
      </div>
    </>
  );
}
