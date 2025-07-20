//app/page.js
'use client';

import { useSelector } from 'react-redux';
import { selectLanguage } from '@/store/loadingSlice';
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import TeamSection from "./components/TeamSection";
import Clients from "./components/Clients";
import Footer from "./components/Footer";

export default function HomePage() {
  const language = useSelector(selectLanguage);

  return (
    <main
      lang={language}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="relative min-h-screen text-white"
    >
      {/* ✅ Only wrap Navbar + Hero in background */}
      <div
        className="relative z-0"
        style={{
          backgroundImage: `linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%), url('/assets/Main.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Navbar />
        <HeroSlider />
      </div>

      {/* ✅ Rest of sections with default background */}
      <div className="relative z-10 bg-white text-black">
        <TeamSection />
        <Clients />
        <Footer />
      </div>
    </main>
  );
}
