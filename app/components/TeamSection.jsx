'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';
import { getTeamMembers } from '@/app/lib/api';
import { useLocale } from 'next-intl';

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  const locale = useLocale();

  useEffect(() => {
    async function fetchMembers() {
      const data = await getTeamMembers(locale);
      setTeamMembers(data);
    }
    fetchMembers();
  }, []);

  const nextSlide = () => {
    if (currentIndex + visibleCount < teamMembers.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleMembers = teamMembers.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section id="team" className="w-full min-h-screen bg-[#f9f9f9] py-16 px-4 md:px-8 flex flex-col justify-center">

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#532F2C]">{locale=='en'?"Our Team":"فريقنا"}</h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
          {locale=='en'?"We are proud to introduce our dedicated professionals who drive our company’s success.":"نحن فخورون بتقديم محترفي فريقنا المتفانين الذين يقودون نجاح شركتنا"}           
        </p>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer"
          >
            <ChevronLeft size={28} stroke="black" />
          </button>
        )}

        {/* Team Members */}
        <div className="flex justify-center gap-8 overflow-hidden transition-all">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-md w-[260px] transition hover:shadow-lg"
            >
              {/* Image with brown background */}
              <div className="bg-[#532F2C] h-[220px] relative flex items-center justify-center rounded-t-2xl overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA}${member.photo}`}
                  alt={member.name}
                  width={260}
                  height={220}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-[#1c1c1c]">{member.name}</h3>
                <p className="text-sm text-gray-500 tracking-wide mb-3">{member.position}</p>
                <div className="flex justify-center gap-4 text-[#1c1c1c]">
                  <MessageCircle size={18} />
                  <Phone size={18} />
                  <Mail size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {currentIndex + visibleCount < teamMembers.length && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer"
          >
            <ChevronRight size={28} stroke="black" />
          </button>
        )}
      </div>
    </section>
  );
}
