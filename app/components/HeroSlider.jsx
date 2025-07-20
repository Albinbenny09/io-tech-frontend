"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroPages } from "@/app/lib/api"; 
import {  useLocale } from 'next-intl';

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
   const locale = useLocale();

  useEffect(() => {
    async function fetchSlides() {
      const data = await getHeroPages(locale);
      setSlides(data);
    }
    fetchSlides();
  }, []);

  const slide = slides[current];

  useEffect(() => {
    if (!slide?.media?.length) return;

    const timer = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % slide.media.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slide]);

  if (slides.length === 0) return null;

  const fullText = slide.description;
  const shortText = fullText.split(". ").slice(0, 1).join(". ") + ".";

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setExpanded(false);
    setMediaIndex(0);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setExpanded(false);
    setMediaIndex(0);
  };

  return (
    <section className="w-full h-[calc(100vh-80px)] relative px-8 md:px-16 flex items-center justify-center gap-12">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full z-10 gap-10">
        {/* Text */}
        <div className="max-w-xl text-white">
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">{slide.heading}</h2>
          <p className="text-base md:text-lg mb-6">
            {expanded ? fullText : shortText}
          </p>
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="bg-white text-black px-6 py-2 rounded-md font-medium transition hover:bg-gray-200"
            >
              {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
            </button>
          )}
        </div>

        {/* Media Preview */}
        {slide.media?.length > 0 && (
          <div className="w-[300px] h-[300px] bg-[#4B2615] relative shrink-0 rounded-lg overflow-hidden">
            {slide.media[mediaIndex].mime.startsWith("image") ? (
              <Image
                src={slide.media[mediaIndex].url}
                alt="Hero"
                fill
                className="object-cover"
              />
            ) : slide.media[mediaIndex].mime.startsWith("video") ? (
              <video
                src={slide.media[mediaIndex].url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : null}
          </div>
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute left-8 bottom-10 flex flex-col space-y-2 z-10">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => {
              setCurrent(index);
              setExpanded(false);
              setMediaIndex(0);
            }}
            className={`w-2 h-2 rounded-full cursor-pointer border border-white ${
              current === index ? "bg-white" : "bg-transparent"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
