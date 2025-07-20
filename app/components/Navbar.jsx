"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getServices } from '@/app/lib/api';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  // Handle language switch
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
    router.replace(`/${newLocale}${pathWithoutLocale}`);
    setLangDropdownOpen(false);
  };

  useEffect(() => {
    async function fetchServices() {
      const data = await getServices(locale);
      setServices(data);
    }
    fetchServices();
  }, []);

 useEffect(() => {
  const handleClickOutside = (e) => {
    if (langRef.current && !langRef.current.contains(e.target)) {
      setLangDropdownOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


  const columns = [[], [], [], []];
  services.forEach((service, i) => {
    columns[i % 4].push(service);
  });

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <nav className={`w-full max-w-[1252px] h-[71px] mx-auto mt-[20px] px-4 md:px-8 flex items-center justify-between text-sm font-medium md:flex ${locale === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'} text-white`}>
      <a href="/">
        <Image src="/assets/logo.png" alt="Logo" width={100} height={32} />
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 text-white">
        <a href="#" className="hover:text-blue-400">{t('home')}</a>
        <a href="#" className="hover:text-blue-400">{t('about')}</a>

        {/* Services Mega Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center hover:text-blue-400"
          >
            {t('services')}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute left-0 w-[700px] bg-[#4B2615] text-white mt-4 p-8 rounded-lg shadow-lg z-50 flex justify-between">
              {columns.map((col, idx) => (
                <div key={idx} className="flex flex-col space-y-2 w-1/4">
                  {col.map((service) => (
                    <a
                      key={service.id}
                      href={`/${locale}/services/${service.slug}`}
                      className="hover:text-blue-300 transition-colors"
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="#clients" className="hover:text-blue-400">{t('blog')}</a>
        <a href="#team" className="hover:text-blue-400">{t('team')}</a>
        <a href="#footer" className="hover:text-blue-400">{t('contact')}</a>
      </div>

      {/* Right Side Controls */}
       <div
  className={`flex items-center ${
    locale === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'
  } text-white`}
>
        {/* Search Input */}
        <div className="relative transition-all duration-300 ease-in-out">
          <div
            className={`flex items-center border border-white rounded-full px-2 transition-all duration-300 bg-transparent ${
              searchOpen ? 'w-64' : 'w-10 justify-center'
            }`}
          >
            <svg
              style={{ display: searchOpen ?  'none':'inline-block'  }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-5 h-5 text-white cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchOpen && (
                <>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="ml-2 bg-transparent outline-none text-white placeholder-white w-full"
                    placeholder={t('searchPlaceholder')}
                    autoFocus
                  />
                  <button
                    onClick={handleSearch}
                    className="ml-2 text-white hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </>
              )}

          </div>
        </div>

        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-1 text-sm hover:text-blue-300"
          >
            <span>{locale === 'en' ? 'En' : 'Ar'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langDropdownOpen && (
            <div className="absolute mt-2 bg-[#4B2615] text-white rounded shadow-md z-50">
              <button
                onClick={toggleLanguage}
                className="block px-4 py-2 text-sm  w-full text-left"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <button className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-[#4B2E2E] transition-all">
          {t('book')}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden hover:text-blue-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
