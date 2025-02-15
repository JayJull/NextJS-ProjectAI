import { AiCardProps } from "@/app/data/ai-card";

const AiCard: React.FC<AiCardProps> = ({ logo, name, category, deskripsi, url }) => {
  const getFullUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <img src={logo} alt={name} className="w-full h-full rounded-lg object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{name}</h3>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {category}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{deskripsi}</p>
          </div>
          <a
            href={getFullUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            Visit Website
          </a>
        </div>
      </div>
    );
  };
  
  export default AiCard;