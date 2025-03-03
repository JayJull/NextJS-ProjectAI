import React, { useState, useEffect } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { getAiMostFavorite, getKategori } from '@/lib/data';

interface Category {
  id: number;
  nama: string;
}

interface AI {
  id: number;
  gambar: string;
  name: string;
  kategori: Category;
  url: string;
  shortDesc: string;
  shortLink: string | null;
  click: number;
}

interface AiData {
  all: AI[];
  byCategory: {
    [categoryName: string]: AI[];
  };
}

interface JobCardProps {
  gambar: string;
  name: string;
  kategori: Category;
  url: string;
  shortDesc: string;
  shortLink: string | null;
}

const JobCard: React.FC<JobCardProps> = ({
  gambar,
  name,
  kategori,
  shortDesc,
  shortLink
}) => {
  const getCategoryType = (index: number) => {
    const types = ['primary', 'secondary', 'warning'];
    return types[index % types.length];
  };

  return (    
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden mb-2 sm:mb-0">
            <img
              src={gambar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <a 
              href={shortLink ? `/pages/Deskripsi/${shortLink}` : '#'} 
              className="font-medium text-base sm:text-lg text-gray-900 hover:text-blue-600 hover:underline"
            >
              {name}
            </a>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{shortDesc}</p>
            <div className="flex gap-2 mt-2 sm:mt-3">
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                getCategoryType(0) === 'primary' ? 'bg-blue-100 text-blue-600' :
                getCategoryType(0) === 'secondary' ? 'bg-green-100 text-green-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {kategori?.nama}
              </span>
            </div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0">
          <BookmarkIcon size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>    
  );
};

const JobListings: React.FC = () => {
  const [aiData, setAiData] = useState<AiData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aisMostFavorite, categoriesData] = await Promise.all([
          getAiMostFavorite(),
          getKategori()
        ]);
        
        setAiData(aisMostFavorite);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Check if filter buttons container is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      const filterContainer = document.getElementById('filter-container');
      if (filterContainer) {
        setIsOverflowing(filterContainer.scrollWidth > filterContainer.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [categories]);

  // Get the appropriate AI list based on selected filter
  const getFilteredAis = () => {
    if (!aiData) return [];
    
    if (selectedFilter === 'All') {
      return aiData.all;
    } else {
      return aiData.byCategory[selectedFilter] || [];
    }
  };

  const filteredAis = getFilteredAis();
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Filter Section */}
      <div className="relative mb-6">
        <div 
          id="filter-container" 
          className="flex overflow-x-auto pb-2 gap-2 sm:gap-4 sm:justify-center scrollbar-hide"
        >
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
              selectedFilter === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {displayedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.nama)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                selectedFilter === category.nama
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.nama}
            </button>
          ))}

          {isOverflowing && categories.length > 3 && !showAllCategories && (
            <button 
              onClick={() => setShowAllCategories(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm bg-gray-100 text-blue-600 hover:bg-gray-200 whitespace-nowrap flex-shrink-0"
            >
              +{categories.length - 3} more
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">        
        {filteredAis.map((ai) => (
          <JobCard
            key={ai.id}
            gambar={ai.gambar}
            name={ai.name}
            shortLink={ai.shortLink}
            kategori={ai.kategori}
            url={ai.url}
            shortDesc={ai.shortDesc}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAis.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No AI tools found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default JobListings;