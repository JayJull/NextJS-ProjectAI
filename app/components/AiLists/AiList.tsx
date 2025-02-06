import React from "react";
import { BookmarkIcon } from "lucide-react";

const JobCard = ({
  logo,
  title,
  categories,
  url
}: any) => {
  return (    
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img
              src={logo}              
              className="w-full h-full object-cover"
            />
          </div>

          <div>
          <a href={url} className="font-medium text-lg text-gray-900">
              {title}
            </a>
            <div className="flex gap-2 mt-3">
              {categories.map((category: any, index: any) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs
                    ${category.type === "primary" ? "bg-blue-100 text-blue-600" : ""}
                    ${
                      category.type === "secondary"
                        ? "bg-green-100 text-green-600"
                        : ""
                    }
                    ${
                      category.type === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : ""
                    }`}
                >
                  {category.text}
                </span>
              ))}
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

const JobListings = () => {
  const jobs = [
    {      
      logo: "https://aifree.id/wp-content/uploads/2025/02/1737062697014-AgentOpslogoblack-150x150.png",
      title: "AgentOps",
      categories: [
        { text: "Ai Photos", type: "primary" },
        { text: "Ai Videos", type: "secondary" },
        { text: "Ai Voice", type: "warning" },
      ],
      url: "https://flowbite.com/docs/components/card/#testimonial-card",
    },

    {      
      logo: "https://aifree.id/wp-content/uploads/2025/02/1737062697014-AgentOpslogoblack-150x150.png",
      title: "AgentOps",
      categories: [
        { text: "Ai Photos", type: "primary" },
        { text: "Ai Videos", type: "secondary" },        
      ],
      url: "https://tailwindcss.com/docs/font-family",
    },

    {      
      logo: "https://aifree.id/wp-content/uploads/2025/02/1737062697014-AgentOpslogoblack-150x150.png",
      title: "AgentOps",
      categories: [
        { text: "Ai Photos", type: "primary" },
        { text: "Ai Voice", type: "warning" },
      ],
      url: "https://translate.google.co.id/?hl=id",
    },

    {      
      logo: "https://aifree.id/wp-content/uploads/2025/02/1737062697014-AgentOpslogoblack-150x150.png",
      title: "AgentOps",
      categories: [
        { text: "Ai Videos", type: "secondary" },
      ],
      url: "https://github.com/JayJull/NextJS-ProjectAI",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center gap-4 mb-8">
        {["All", "Ai Video", "Ai Photos", "Ai Voice"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm
              ${
                filter === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-60">        
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
