// components/RouteLoadingSpinner.jsx
'use client';

import { useEffect, useState } from 'react';

export default function RouteLoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-[#4B2615]/60 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center gap-4">
     
      <div className="w-16 h-16 border-4 border-[#A15F3F] border-t-transparent rounded-full animate-spin" />
      
  
      <div className="w-3 h-3 bg-[#A15F3F] rounded-full animate-ping" />

     
      <p className="text-white text-sm tracking-wide">Loading...</p>
    </div>
  );
}
