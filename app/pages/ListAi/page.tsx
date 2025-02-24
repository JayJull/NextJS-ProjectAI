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
              Showing 1 — {filteredTools.length} of {aiTools.length} results
            </p>
            <div className="flex gap-4">
              <select className="text-black px-4 py-2 rounded">
                <option>Sort by (Default)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
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
