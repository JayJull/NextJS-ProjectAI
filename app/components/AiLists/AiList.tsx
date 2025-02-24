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
  click: number;
}

interface JobCardProps {
  gambar: string;
  name: string;
  kategori: Category;
  url: string;
  shortDesc: string;
}

const JobCard: React.FC<JobCardProps> = ({
  gambar,
  name,
  kategori,
  url,
  shortDesc
}) => {
  const getCategoryType = (index: number) => {
    const types = ['primary', 'secondary', 'warning'];
    return types[index % types.length];
  };

  return (    
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img
              src={gambar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <a href={url} className="font-medium text-lg text-gray-900">
              {name}
            </a>
            <p className="text-sm text-gray-600 mt-1">{shortDesc}</p>
            <div className="flex gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs ${
                getCategoryType(0) === 'primary' ? 'bg-blue-100 text-blue-600' :
                getCategoryType(0) === 'secondary' ? 'bg-green-100 text-green-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {kategori?.nama}
              </span>
            </div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <BookmarkIcon size={20} />
        </button>
      </div>
    </div>    
  );
};

const JobListings: React.FC = () => {
  const [ais, setAis] = useState<AI[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aisData, categoriesData] = await Promise.all([
          getAiMostFavorite(),
          getKategori()
        ]);
        setAis(aisData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const filteredAis = selectedFilter === 'All' 
    ? ais
    : ais.filter(ai => ai.kategori.nama === selectedFilter);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedFilter('All')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedFilter === 'All'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedFilter(category.nama)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedFilter === category.nama
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.nama}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-60">        
        {filteredAis.map((ai) => (
          <JobCard
            key={ai.id}
            gambar={ai.gambar}
            name={ai.name}
            kategori={ai.kategori}
            url={ai.url}
            shortDesc={ai.shortDesc}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;