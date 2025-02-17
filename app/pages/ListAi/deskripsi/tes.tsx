'use client';

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAi } from "@/lib/data";
import { AI } from "@/app/data/ai-card";
import Link from "next/link";
import Image from "next/image";

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
        console.error("Error fetching AI tools:", error);
        setError("Failed to load AI tools");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="rounded-sm shadow-lg p-8 text-center">
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              aiTools.length > 0 && (
                <>
                  {/* Logo AI */}
                  <div className="flex justify-center mb-4">
                    <Image
                      src={aiTools[0].gambar}
                      alt={aiTools[0].name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Nama & Kategori */}
                  <h2 className="text-2xl font-bold">{aiTools[0].name}</h2>
                  <p className="text-gray-500 flex items-center justify-center gap-2 mt-2">
                    <span>📂</span> {aiTools[0].kategori.name}
                  </p>

                  {/* Visit Website Button */}
                  <div className="mt-6">
                    <Link
                      href={aiTools[0].url}
                      target="_blank"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg inline-block"
                    >
                      Visit Website
                    </Link>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-gray-600 mt-4">{aiTools[0].deskripsi}</p>

                  {/* Social Share Buttons */}
                  <div className="mt-8 flex justify-center gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Facebook
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                      Twitter
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                      Pinterest
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default List;