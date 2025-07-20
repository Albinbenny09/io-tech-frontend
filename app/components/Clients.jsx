"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getClients } from "@/app/lib/api";
import { useLocale } from "next-intl";

export default function Clients() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClients(locale);
      setTestimonials(data);
    };
    fetchData();
  }, [locale]);

  if (!testimonials.length) return null;

  const { name, position, image, testimonial, heading, description } =
    testimonials[currentIndex];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section id="clients" className="bg-[#4B2615] text-white py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-200 text-base md:text-lg">{description}</p>
        </div>

        {/* Testimonial Content */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Image */}
          <div className="bg-[#744633] w-[300px] h-[300px] relative rounded-md overflow-hidden">
            <Image
             src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA}${image}`}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-lg md:text-xl leading-relaxed text-white mb-6">
              {testimonial}
            </p>
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <p className="text-sm text-gray-300">{position}</p>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={prevSlide}
            className="bg-[#744633] hover:bg-[#85503a] rounded-full p-3 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white text-[#532F2C] hover:bg-gray-100 rounded-full p-3 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
