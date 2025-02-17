'use client'

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AiCard from "./components/AiCard";
import { getAi } from "@/lib/data";
import { AI } from "@/app/data/ai-card";

const List: React.FC = () => {
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAi();
        setAiTools(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching AI tools:', error);
        setError('Failed to load AI tools');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <section className="relative min-h-[100vh]">
        <div className="relative z-10">
          <div className="container mx-auto px-6 pt-48">
            <div className="max-w-4xl mx-auto text-center">
              
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
              Showing 1 — {aiTools.length} of {aiTools.length} results
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
              {aiTools.map((tool) => (
                <AiCard
                  key={tool.id}
                  logo={tool.gambar}
                  name={tool.name}
                  category={tool.kategori.name}
                  deskripsi={tool.deskripsi}
                  url={tool.url}
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