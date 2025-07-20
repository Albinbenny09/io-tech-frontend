'use client';

import { useSelector } from 'react-redux';

import Navbar from "@/app/components/Navbar";
import HeroSlider from "@/app/components/HeroSlider";
import TeamSection from "@/app/components/TeamSection";
import Clients from "@/app/components/Clients";
import Footer from "@/app/components/Footer";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white">
      
      <div className="relative z-0">
        
        <Image
          src="/assets/Main.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center -z-10"
        />
       
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(271.47deg,rgba(75,38,21,0.28)_1.2%,rgba(75,38,21,0.68)_86.38%)]" />
        
        <Navbar />
        <HeroSlider />
      </div>

      {/* ✅ Rest of sections with default background */}
      <div className="relative z-10 bg-white text-black">
        <TeamSection />
        <Clients/>
        <Footer />
      </div>
    </main>
  );
}
