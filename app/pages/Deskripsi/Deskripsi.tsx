import React from 'react';
import { AiCardProps } from "@/app/data/ai-card";
import { incrementClick } from '@/lib/data';
import { useRouter } from 'next/navigation';
import  Link  from "next/link";


const AiCard: React.FC<AiCardProps> = ({ logo, name, category, shortDesc, url, shortLink }) => {
  const getDisplayLink = (shortLink?: string) => {
    if (shortLink) {
      return `/aff/${shortLink}`;
    }
    return url || '/404';
  };

  const handleClick = async () => {
    if (shortLink) {
      try {
        await incrementClick(shortLink);
      } catch (error) {
        console.error("Error tracking click:", error);
      }
    }
  };

  const handleDesc = async () => {
    const Router = useRouter();
    Router.push(`/pages/About/${shortLink}`);
  }

  return (
<div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-full max-w-md mx-auto">
  {/* Logo */}
  <div className="w-16 h-16 mx-auto">
    <img src={logo} alt={name} className="w-full h-full rounded-lg object-cover" />
  </div>

  {/* Nama Produk */}
  <div className="mt-4 text-center">
    <Link href={`/pages/Deskripsi/${shortLink}`}>
      <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 hover:underline">
        {name}
      </h3>
    </Link>
  </div>

  {/* Kategori */}
  <div className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    {category}
  </div>

  {/* Deskripsi Singkat */}
  <p className="mt-3 text-sm text-gray-700 text-center leading-relaxed">
    {shortDesc}
  </p>

  {/* Tombol Visit Website */}
  <div className="mt-4 text-center">
    <a
      href={getDisplayLink(shortLink)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
    >
      Visit Website
    </a>
  </div>
</div>

  );
};

export default AiCard;