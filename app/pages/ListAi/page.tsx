"use client";

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AiCard from "./components/AiCard";
import { getAi } from "@/lib/data";
import { AI } from "@/app/data/ai-card";
import { useSearchParams } from "next/navigation";

const List: React.FC = () => {
  const searchParams = useSearchParams();
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [filteredTools, setFilteredTools] = useState<AI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAi();
        setAiTools(data);

        const searchQuery = searchParams.get("q")?.toLowerCase() || "";
        const categoryFilter = searchParams.get("category") || "All Categories";

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

  return (
    <Layout>
      <section className="relative min-h-[70vh] md:min-h-[100vh]">
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-48">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-white font-sans text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                Find Your AI
              </h1>
              <p
                className="text-base sm:text-lg mb-6 sm:mb-8 text-white/90 px-4"
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

      <section className="py-60 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-36">
        <div className="mt-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <p className="text-black text-sm sm:text-base">
              Showing 1 — {filteredTools.length} of {aiTools.length} results
            </p>
            <div className="flex gap-4 w-full sm:w-auto">
              <select className="text-black px-4 py-2 rounded w-full sm:w-auto">
                <option>Sort by (Default)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-10">No AI tools found matching your criteria.</div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {filteredTools.map((tool) => (
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
        </div>
      </section>
    </Layout>
  );
};

export default List;