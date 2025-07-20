import { getServiceBySlug } from "@/app/lib/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getLocale } from 'next-intl/server';


export default async function ServicePage({ params }) {
  const locale = await getLocale();
  
  const service = await getServiceBySlug(params.slug, locale);

  if (!service) {
    return <div className="text-center py-10 text-red-500">Service not found</div>;
  }

  const {
    title,
    short_description,
    detailed_description,
  } = service;

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-white/90 bg-center z-0"
        style={{ backgroundImage: `url('/assets/services.png')` ,
    filter: "blur(0.5px) brightness(50%)"}}
        
      ></div>

      {/* White overlay */}
      <div className="absolute inset-0 bg-white/90 z-10"></div>

      {/* Page Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-600 hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#4B2615] mb-4">
          {title}
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">{short_description}</p>

        <div className="space-y-6">
          {Array.isArray(detailed_description) &&
            detailed_description.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  );
}

// Rich Text Renderer
function renderBlock(block, i) {
  const content = block.children?.map((child) => child.text).join(" ");

  switch (block.type) {
    case "heading":
      return (
        <h2
          key={i}
          className="text-xl font-semibold text-brown-800 border-b pb-1"
        >
          {content}
        </h2>
      );
    case "paragraph":
      return (
        <p key={i} className="text-gray-800 leading-relaxed">
          {content}
        </p>
      );
    case "blockquote":
      return (
        <blockquote
          key={i}
          className="border-l-4 border-brown-600 bg-brown-50 p-4 italic text-gray-700 rounded-md"
        >
          {content}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul key={i} className="list-disc list-inside text-gray-800 space-y-1">
          {block.children?.map((item, j) => (
            <li key={j}>{item.children?.map((c) => c.text).join(" ")}</li>
          ))}
        </ul>
      );
    case "numbered-list":
      return (
        <ol key={i} className="list-decimal list-inside text-gray-800 space-y-1">
          {block.children?.map((item, j) => (
            <li key={j}>{item.children?.map((c) => c.text).join(" ")}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}
