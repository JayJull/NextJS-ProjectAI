"use client";

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AiCard from "./components/AiCard";
import { getAi } from "@/lib/data";
import { AI } from "@/app/data/ai-card";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const List: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [filteredTools, setFilteredTools] = useState<AI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAi();
        setAiTools(data);

        const searchQuery = searchParams.get("q")?.toLowerCase() || "";
        const categoryFilter = searchParams.get("category") || "All Categories";
        const page = parseInt(searchParams.get("page") || "1");
        setCurrentPage(page);

        const filtered = data.filter((tool) => {
          const matchesSearch =
            searchQuery === "" ||
            tool.name.toLowerCase().includes(searchQuery) ||
            tool.kategori.nama.toLowerCase().includes(searchQuery) ||
            (tool.shortDesc?.toLowerCase() || "").includes(searchQuery);

          const matchesCategory =
            categoryFilter === "All Categories" ||
            tool.kategori.nama === categoryFilter;

          return matchesSearch && matchesCategory;
        });

        setFilteredTools(filtered);
        setError(null);
      } catch (error) {
        console.error("Error fetching AI tools:", error);
        setError("Failed to load AI tools");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    AOS.init({ duration: 1000 });
  }, [searchParams]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    // Create new URLSearchParams object based on current query string
    const params = new URLSearchParams(searchParams.toString());
    // Update or add the page parameter
    params.set("page", pageNumber.toString());
    
    // Update the URL with the new search parameters
    router.push(`?${params.toString()}`);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    // Logic to show limited page numbers with ellipsis
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust to show up to 3 pages in the middle
      if (startPage > 2) pageNumbers.push('...');
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages - 1) pageNumbers.push('...');
      
      // Always show last page
      pageNumbers.push(totalPages);
    }

    return (
      <div className="flex justify-end mt-8 gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          &laquo;
        </button>
        
        {pageNumbers.map((number, index) => (
          number === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
          ) : (
            <button
              key={index}
              onClick={() => paginate(number as number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {number}
            </button>
          )
        ))}
        
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <section className="relative min-h-[100vh]">
        <div className="relative z-10">
          <div className="container mx-auto px-6 pt-48">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-white font-sans text-5xl font-bold mb-6"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                Find Your AI
              </h1>
              <p
                className="text-lg mb-8 text-white/90"
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-once="true"
              >
                Your Gateway to the World of Artificial Intelligence Tools
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-36">
        <div className="mt-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-black">
              Showing {indexOfFirstItem + 1} — {Math.min(indexOfLastItem, filteredTools.length)} of {filteredTools.length} results
            </p>
            <div className="flex gap-4">
              <select className="text-black px-4 py-2 rounded">
                <option>Sort by Default</option>
                <option>Sort by Popular</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {currentItems.map((tool) => (
                  <AiCard
                    key={tool.id}
                    logo={tool.gambar}
                    name={tool.name}
                    category={tool.kategori.nama}
                    shortDesc={tool.shortDesc}
                    url={tool.url}
                    shortLink={tool.shortLink || ""}
                  />
                ))}
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default List;