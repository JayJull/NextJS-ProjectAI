"use client";

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AiCard from "./components/AiCard";
import { getAi, getKategori } from "@/lib/data";
import { AI } from "@/app/data/ai-card";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

interface Category {
  id: number;
  nama: string;
  name?: string;
}


const List: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const Router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [filteredTools, setFilteredTools] = useState<AI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keywords, setKeywords] = useState<string[]>([]);
  
  const categoryKeywordMap: { [key: string]: string[] } = {
    'ai_photos': ['photo', 'photos', 'image', 'images', 'gambar', 'foto', 'picture', 'visual'], 
    'ai_video': ['video', 'videos', 'film', 'movie', 'cinema', 'animation'], 
    'ai_audio': ['audio', 'sound', 'music', 'voice', 'speech', 'suara', 'musik', 'lagu'], 
    'ai_text': ['text', 'writing', 'content', 'tulisan', 'tulis', 'article', 'blog'], 
    'ai_chat': ['chat', 'conversation', 'message', 'percakapan', 'assistant', 'chatbot'], 
    'ai_code': ['code', 'coding', 'programming', 'developer', 'kode', 'program'], 
    'ai_edit': ['edit', 'editing', 'editor', 'modification', 'enhance'], 
    'ai_translate': ['translate', 'translation', 'language', 'bahasa', 'terjemahan'], 
    'ai_data': ['data', 'analytics', 'analysis', 'statistics', 'visualization', 'chart'], 
    'ai_design': ['design', 'designer', 'graphic', 'desain', 'grafis', 'ui', 'ux']
  };

  // Add a ref to the results section
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData: Category[] = await getKategori();
        setCategories([{ id: 0, nama: "All Categories" }, ...categoriesData]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);
  
  // Function to check if a keyword belongs to a category
  const getCategoryForKeyword = (keyword: string): string | null => {
    const keywordLower = keyword.toLowerCase().trim();
    
    for (const [category, keywordList] of Object.entries(categoryKeywordMap)) {
      if (keywordList.some(k => k === keywordLower)) {
        return category;
      }
    }
    
    return null;
  };

  // Improved scoring function for search results
  const scoreSearchResult = (tool: AI, searchKeywords: string[]): number => {
    if (!searchKeywords.length) return 0;
    
    let score = 0;
    const toolName = tool.name.toLowerCase();
    const toolCategory = tool.kategori.nama.toLowerCase();
    const toolDesc = (tool.shortDesc || "").toLowerCase();
    
    // Check if all keywords are present in at least one of the fields
    const allKeywordsPresent = searchKeywords.every(keyword => {
      const keywordLower = keyword.toLowerCase();
      return toolName.includes(keywordLower) || 
             toolCategory.includes(keywordLower) || 
             toolDesc.includes(keywordLower);
    });
    
    // Bonus for matching all keywords
    if (allKeywordsPresent) {
      score += 100;
    }
    
    // Check each keyword against the AI tool properties
    for (const keyword of searchKeywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Exact match in name (highest priority)
      if (toolName === keywordLower) {
        score += 80;
      }
      // Name contains keyword (high priority)
      else if (toolName.includes(keywordLower)) {
        score += 40;
      }
      
      // Category exact match (high priority)
      if (toolCategory === keywordLower) {
        score += 60;
      }
      // Category contains keyword
      else if (toolCategory.includes(keywordLower)) {
        score += 30;
      }
      
      // Description contains keyword (medium priority for relevance)
      if (toolDesc.includes(keywordLower)) {
        score += 20;
      }
      
      // Get the category this keyword belongs to (if any)
      const keywordCategory = getCategoryForKeyword(keywordLower);
      
      if (keywordCategory) {
        // Map toolCategory to a standardized category if possible
        let toolCategoryStandard = null;
        
        for (const [category, keywordList] of Object.entries(categoryKeywordMap)) {
          if (keywordList.some(k => toolCategory.includes(k))) {
            toolCategoryStandard = category;
            break;
          }
        }
        
        // Special bonus for category-specific matches
        if (toolCategoryStandard === keywordCategory || 
            toolCategory.includes(keywordCategory.replace('ai_', '')) ||
            toolName.includes(keywordCategory.replace('ai_', '')) ||
            toolDesc.includes(keywordCategory.replace('ai_', ''))) {
          score += 50;
        }
      }
    }
    
    // Prioritize tools that match the category directly related to the search
    for (const keyword of searchKeywords) {
      const keywordCategory = getCategoryForKeyword(keyword.toLowerCase());
      
      if (keywordCategory) {
        const categoryType = keywordCategory.replace('ai_', '');
        
        if (toolCategory.includes(categoryType)) {
          score += 70;
        }
      }
    }
    
    // Give extra weight to search term order
    const fullSearchQuery = searchKeywords.join(" ").toLowerCase();
    if (toolName.includes(fullSearchQuery)) {
      score += 60;
    }
    if (toolDesc.includes(fullSearchQuery)) {
      score += 30;
    }
    
    return score;
  };

  // Improved keyword extraction function
  const extractKeywords = (query: string): string[] => {
    const query_lower = query.toLowerCase().trim();
    
    // Common words to exclude (stop words)
    const stopWords = [
      "saya", "ingin", "mencari", "yang", "untuk", "dengan", "dan", 
      "atau", "di", "ke", "dari", "cari", "tolong", "bantuan", "bagaimana",
      "carikan", "mau", "seperti", "mirip", "bagus", "terbaik", "gratis", "free",
      "premium", "berbayar", "a", "the", "an", "of", "in", "on", "at", "by",
      "to", "for", "about", "is", "are", "was", "were", "be", "been", "being",
      "have", "has", "had", "do", "does", "did", "akan", "sedang", "telah",
      "sudah", "belum", "not", "no", "yes", "dapat", "bisa", "mampu", "ini", "itu"
    ];
  
    // Get all important terms from the category keyword map
    const categoryTerms = Object.values(categoryKeywordMap).flat();
    
    // Additional important terms and known AI tool names
    const additionalTerms = [
      "ai", "gpt", "chatgpt", "gpt-4", "claude", "bard", "gemini", "dall-e", 
      "midjourney", "stable diffusion", "copilot", "assistant", "llm",
      "bing", "google", "openai", "huggingface", "generator", 
      "machine learning", "ml", "nlp", "youtube", 
      "education", "belajar", "learning", "pendidikan",
      "production", "produksi", "enhancement", "restoration", "compress"
    ];
    
    // Combine all important terms
    const importantTerms = [...new Set([...categoryTerms, ...additionalTerms])];
    
    // Keep the original order of terms for context preservation
    const originalTerms = query_lower.split(/\s+/);
    
    // First extract multi-word important terms
    let processedQuery = query_lower;
    const multiWordTerms: string[] = [];
    
    for (const term of importantTerms) {
      if (term.includes(" ") && processedQuery.includes(term)) {
        multiWordTerms.push(term);
        // Replace the term with placeholder to avoid double counting
        processedQuery = processedQuery.replace(term, "____");
      }
    }
    
    // Then extract single words
    const singleWords = processedQuery.split(/\s+/).filter(word => {
      // Always keep important terms
      if (importantTerms.includes(word)) return true;
      
      // Filter out stop words and short words
      return !stopWords.includes(word) && word.length >= 3;
    });
    
    // Combine all keywords while preserving the original ordering
    const allKeywords = [...multiWordTerms, ...singleWords];
    
    // Always include specific important keywords if they're in the original query
    for (const term of categoryTerms) {
      if (originalTerms.includes(term) && !allKeywords.includes(term)) {
        allKeywords.push(term);
      }
    }
    
    // Handle keyword mappings to standardize terms
    // Create a mapping from alternative terms to standard terms
    const keywordMappings: Record<string, string> = {};
    
    // For each category, map alternative terms to the primary term for that category
    Object.entries(categoryKeywordMap).forEach(([category, keywords]) => {
      if (keywords.length > 0) {
        const primaryTerm = keywords[0]; // Use the first term as the standard
        
        // Map all other terms to this primary term
        keywords.slice(1).forEach(altTerm => {
          keywordMappings[altTerm] = primaryTerm;
        });
      }
    });
    
    // Apply mappings while keeping original keywords too
    const normalizedKeywords = [...allKeywords];
    
    for (const keyword of allKeywords) {
      if (keywordMappings[keyword] && !normalizedKeywords.includes(keywordMappings[keyword])) {
        normalizedKeywords.push(keywordMappings[keyword]);
      }
    }
    
    // Remove duplicates while preserving order
    return [...new Set(normalizedKeywords)];
  };

  // Fetch AI tools and apply filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAi();
        setAiTools(data);
  
        // Get search parameters from URL
        const urlQuery = searchParams.get("query") || "";
        const urlCategory = searchParams.get("category") || "All Categories";
        const urlKeywords = searchParams.get("keywords") || "";
        
        // Parse keywords from comma-separated string
        const keywordArray = urlKeywords ? urlKeywords.split(",") : [];
        setKeywords(keywordArray);
        
        // Update state with URL parameters
        setSearchQuery(urlQuery);
        setSelectedCategory(urlCategory);
        
        let filtered = [...data];
        
        // Apply category filter if selected
        if (urlCategory !== "All Categories") {
          filtered = filtered.filter(tool => 
            tool.kategori.nama === urlCategory
          );
        }
        
        // Apply keyword filters and score results
        if (keywordArray.length > 0) {
          // Flag to check if any category-specific keywords are present
          let hasCategoryKeywords = false;
          
          // Check if any keywords map to specific categories
          for (const keyword of keywordArray) {
            const keywordCategory = getCategoryForKeyword(keyword);
            if (keywordCategory) {
              hasCategoryKeywords = true;
              break;
            }
          }
          
          // First compute a relevance score for each tool
          const scoredResults = filtered.map(tool => ({
            tool,
            score: scoreSearchResult(tool, keywordArray)
          }));
          
          // Filter out irrelevant results (score of 0)
          let relevantResults = scoredResults.filter(item => item.score > 0);
          
          // If no results but we have category keywords, try a broader approach
          if (relevantResults.length === 0 && hasCategoryKeywords) {
            console.log("No results with strict matching, trying category-based matching");
            
            // Extract categories from keywords
            const targetCategories = new Set<string>();
            
            for (const keyword of keywordArray) {
              const category = getCategoryForKeyword(keyword);
              if (category) {
                targetCategories.add(category);
              }
            }
            
            if (targetCategories.size > 0) {
              // For each tool, check if it matches any of the target categories
              relevantResults = data.map(tool => {
                let matchScore = 0;
                const toolCategoryLower = tool.kategori.nama.toLowerCase();
                
                for (const category of targetCategories) {
                  const categoryType = category.replace('ai_', '');
                  if (toolCategoryLower.includes(categoryType)) {
                    matchScore += 50;
                  }
                  
                  // Check if tool name or description contains category keywords
                  for (const keyword of categoryKeywordMap[category] || []) {
                    if (tool.name.toLowerCase().includes(keyword) ||
                        (tool.shortDesc && tool.shortDesc.toLowerCase().includes(keyword))) {
                      matchScore += 30;
                      break;
                    }
                  }
                }
                
                return {
                  tool,
                  score: matchScore
                };
              }).filter(item => item.score > 0);
            }
          }
          
          // Sort by score (descending)
          relevantResults.sort((a, b) => b.score - a.score);
          
          // For debugging: log the top 5 results with their scores
          console.log("Top 5 search results with scores:", 
            relevantResults.slice(0, 5).map(item => ({
              name: item.tool.name,
              category: item.tool.kategori.nama,
              score: item.score
            }))
          );
          
          // Extract just the tools from the scored results
          filtered = relevantResults.map(item => item.tool);
        }
        
        setFilteredTools(filtered);
      } catch (error) {
        console.error("Error fetching AI tools:", error);
        setError("Failed to load AI tools");
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };
  
    fetchData();
  }, [searchParams]);

  // Scroll to results when page changes
  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Handler for category selection
  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Handler for search form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearchLoading(true);
    
    // Extract keywords Google-style
    const keywordArray = extractKeywords(searchQuery);
    
    const params = new URLSearchParams();
    params.set("query", searchQuery);
    
    if (keywordArray.length > 0) {
      params.set("keywords", keywordArray.join(","));
      params.set("q", keywordArray.join(" "));
    }
    
    if (selectedCategory !== "All Categories") {
      params.set("category", selectedCategory);
    }

    Router.push(`/pages/ListAi?${params.toString()}`);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTools = filteredTools.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(filteredTools.length / ITEMS_PER_PAGE));

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };


  return (
    <Layout>
      <section
        aria-label="Header"
        className="relative min-h-[80vh] md:min-h-screen"
      >
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 pt-20 md:pt-40">
            <div className="max-w-4xl mx-auto text-center py-32 md:py-20">
              <h3
                className="text-white font-sans text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-12"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                Find The Best Ai Tools
              </h3>
              <p
                className="text-xs sm:text-sm mb-6 md:mb-10 text-white"
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-once="true"
              >
                Search from 25.700+ Ai
              </p>

              <div
                className="max-w-xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="1000"
                data-aos-once="true"
              >
                <form
                  className="bg-white/15 backdrop-blur-lg rounded-2xl shadow-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/20"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Dropdown Button */}
                    <div className="relative w-full sm:w-auto order-2 sm:order-1">
                      <button
                        id="dropdown-button"
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full sm:w-auto transition-all duration-300 inline-flex items-center justify-between py-3 px-4 text-sm font-medium text-gray-900 bg-gray-50/90 backdrop-blur-sm hover:bg-gray-100 border border-gray-200 rounded-xl hover:shadow-md"
                        disabled={searchLoading}
                      >
                        <span className="truncate max-w-[150px]">
                          {selectedCategory}
                        </span>
                        {isDropdownOpen ? (
                          <ChevronUpIcon
                            className="w-4 h-4 ms-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="w-4 h-4 ms-2"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      <div
                        id="dropdown"
                        className={`z-20 ${
                          isDropdownOpen ? "block" : "hidden"
                        } bg-white/90 backdrop-blur-md divide-y divide-gray-100 rounded-xl shadow-lg border border-gray-100 w-full sm:w-48 absolute mt-1 transition-all overflow-hidden`}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 max-h-60 overflow-y-auto"
                          aria-labelledby="dropdown-button"
                        >
                          {categories.map((category) => (
                            <li key={category.id}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCategorySelect(category.nama)
                                }
                                className="inline-flex w-full px-4 py-3 hover:bg-blue-50 transition-colors duration-200"
                              >
                                {category.nama}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 order-1 sm:order-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="search-dropdown"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block p-3 ps-10 w-full text-sm text-gray-900 bg-gray-50/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 hover:shadow-md"
                          placeholder="Search AI tools, platforms, services..."
                          required
                          disabled={searchLoading}
                        />
                      </div>
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300 shadow-md hover:shadow-lg"
                        disabled={searchLoading}
                      >
                        {searchLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        )}
                        <span className="sr-only">
                          {searchLoading ? "Searching..." : "Search"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-36" ref={resultsRef}>
        <div className="mt-1">
          {/* Search information */}
          {keywords.length > 0 && (
            <div className="mb-6 text-sm text-gray-600">
              <p>Search results for: <span className="font-medium">{searchQuery}</span></p>
              <p className="mt-1">
                Keywords: {keywords.map((keyword, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2 text-xs">
                    {keyword}
                  </span>
                ))}
              </p>
            </div>
          )}
          
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6"
          >
            <p className="text-black text-sm sm:text-base">
              Showing {filteredTools.length > 0 ? startIndex + 1 : 0} — {Math.min(endIndex, filteredTools.length)} of {filteredTools.length} results
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : paginatedTools.length === 0 ? (
            <div className="text-center py-10">
              <p>No AI tools found matching your criteria.</p>
              <p className="mt-2 text-gray-600">Try using different keywords or removing filters.</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {paginatedTools.map((tool) => (
                <div key={tool.id} className="border border-gray-200 hover:border-blue-300 transition-colors duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md">
                  <AiCard
                    logo={tool.gambar}
                    name={tool.name}
                    category={tool.kategori.nama}
                    shortDesc={tool.shortDesc}
                    url={tool.url}
                    shortLink={tool.shortLink || ""}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredTools.length > 0 && (
            <div className="flex justify-end mt-6 gap-4 items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded bg-gray-200 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <span className="px-4 py-2 border border-gray-300 rounded bg-white text-black text-sm">
                {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded bg-gray-200 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default List;