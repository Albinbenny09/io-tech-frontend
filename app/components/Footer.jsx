import { Facebook, Twitter, Mail, Phone, Globe } from "lucide-react";
import SubscriptionForm from './SubscriptionForm';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#2A1A0A] text-white px-6 py-12 ">
      <div className="max-w-6xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-end gap-6">
          {/* Subscribe Section */}
          <div className="flex rounded-xl overflow-hidden bg-white max-w-md">
            <SubscriptionForm />
           
            </div>

          {/* Contacts and Icons */}
          <div className="flex items-center gap-6">
            <span className="text-sm">Contacts</span>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <Globe className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 mt-8 mb-6" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-white/90 justify-center md:justify-start">
            <span  className="cursor-pointer hover:text-white">About</span>
            <span className="cursor-pointer hover:text-white">Our Strategy</span>
            <span className="cursor-pointer hover:text-white">Our Advantages</span>
            <span className="cursor-pointer hover:text-white">Social Responsibility</span>
            <span className="cursor-pointer hover:text-white">Our Services</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/70 text-center md:text-right">
            © 2025 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
