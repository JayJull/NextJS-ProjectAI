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
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <img src={logo} alt={name} className="w-full h-full rounded-lg object-cover" />
          </div>
          <div className="flex-1">
            <Link href={`/pages/Deskripsi/${shortLink}`}>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 hover:text-blue-600 hover:underline">{name}</h3>
            </div>
            </Link>
            <div className="mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {category}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{shortDesc}</p>
          </div>
          <a
            href={getDisplayLink(shortLink)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            Visit Website
          </a>
        </div>
      </div>
    );
  };

  export default AiCard;