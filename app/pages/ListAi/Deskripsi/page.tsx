'use client';

import { Layout } from "@/app/components/Home/Layout";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAi } from "@/lib/data";
import { AI } from "@/app/data/ai-card";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaPinterestP } from "react-icons/fa6";


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
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto rounded-lg p-8 text-center">
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              aiTools.length > 0 && (
                <>
                  {/* { Logo AI } */}
                  <div className="flex justify-center mb-4">
                    <Image
                      src={aiTools[0].gambar}
                      alt={aiTools[0].name}
                      width={200}
                      height={200}
                      className=""
                    />
                  </div>

                  {/* Nama & Kategori */}
                  <h2 className="text-2xl text-white font-bold">{aiTools[0].name}</h2>
                  <p className="text-white flex items-center justify-center gap-2 mt-2">
                     {aiTools[0].kategori.name}
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

                  {/* Deskripsi short */}
                  <p className="text-white mt-4">{aiTools[0].deskripsi}</p>
                </>
              )
            )}
          </div>
        </div>
      </section>
      <section>
        {/* Deskripsi Lengkap */}

        {/* Social Share Buttons */}
        <div className="mt-8 flex justify-left gap-3 ml-40">
                  <span className="text-black font-semibold flex items-center">Share this post</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition">
                        <FaFacebookF size={20} />Facebook 
                    </button>
                    <button className="bg-black text-white px-3 py-2 rounded-lg hover:bg-grey-700 transition">
                        <FaXTwitter size={20} />
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition">
                    <FaPinterestP size={20}/>Pinterest
                    </button>
        </div>

        {/* Related AI */}
        <div className="mt-8 flex justify-left gap-3 ml-40">
            <span className="text-black text-3xl font-bold mt-10">Related AI</span>
            
        </div>
      </section>
    </Layout>
  );
};

export default List;