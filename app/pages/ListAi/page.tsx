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

const INITIAL_ITEMS_TO_SHOW = 5;
const LOAD_MORE_COUNT = 5;

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
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [filteredTools, setFilteredTools] = useState<AI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ubah currentPage menjadi itemsToShow untuk load more
  const [itemsToShow, setItemsToShow] = useState<number>(INITIAL_ITEMS_TO_SHOW);

  // Add a ref to the results section
  const resultsRef = useRef<HTMLDivElement>(null);

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  // Mengambil data AI dan menerapkan filter dari URL params
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAi();
        setAiTools(data);

        // Ambil parameter pencarian dari URL
        const urlSearchQuery = searchParams.get("q") || "";
        const urlCategory = searchParams.get("category") || "All Categories";

        // Perbarui state dengan parameter URL
        setSearchQuery(urlSearchQuery);
        setSelectedCategory(urlCategory);

        // Terapkan filter berdasarkan parameter URL
        const filtered = data.filter((tool) => {
          const matchesSearch =
            urlSearchQuery === "" ||
            tool.name.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
            tool.kategori.nama
              .toLowerCase()
              .includes(urlSearchQuery.toLowerCase()) ||
            (tool.shortDesc?.toLowerCase() || "").includes(
              urlSearchQuery.toLowerCase()
            );

          const matchesCategory =
            urlCategory === "All Categories" ||
            tool.kategori.nama === urlCategory;

          return matchesSearch && matchesCategory;
        });

        setFilteredTools(filtered);

        // Reset itemsToShow ketika ada filter baru
        setItemsToShow(INITIAL_ITEMS_TO_SHOW);
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

  // Handler untuk memilih kategori
  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Handler submit form
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearchLoading(true);

    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (selectedCategory !== "All Categories") {
      params.set("category", selectedCategory);
    }

    Router.push(`/pages/ListAi?${params.toString()}`);
  };

  // Implementasi Load More
  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + LOAD_MORE_COUNT);
  };

  // Tampilkan hanya sejumlah item yang ditentukan
  const visibleTools = filteredTools.slice(0, itemsToShow);

  // Cek apakah masih ada item lain yang bisa ditampilkan
  const hasMoreItems = itemsToShow < filteredTools.length;

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
            </div>
          </div>
        </div>
      </section>

      <section>
          <h3
            className="text-center text-blue-600 font-sans text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="true"
          >
            Search AI
          </h3>
        {/* Form pencarian */}
        <div
          className="max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-once="true"
        >
          <form
            className="rounded-2xl shadow-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/20"
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
                          onClick={() => handleCategorySelect(category.nama)}
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
      </section>

      <section
        className="py-32 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-36"
        ref={resultsRef}
      >
        <div className="mt-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <p className="text-black text-sm sm:text-base">
              Showing {filteredTools.length > 0 ? 1 : 0} —{" "}
              {Math.min(itemsToShow, filteredTools.length)} of{" "}
              {filteredTools.length} results
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : visibleTools.length === 0 ? (
            <div className="text-center py-10">
              No AI tools found matching your criteria.
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
              {visibleTools.map((tool) => (
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
          )}

          {/* Load More button - hanya ditampilkan jika masih ada item */}
          {hasMoreItems && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Load More</span>
                <Loader2
                  className={`w-4 h-4 ${loading ? "animate-spin" : "hidden"}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default List;
