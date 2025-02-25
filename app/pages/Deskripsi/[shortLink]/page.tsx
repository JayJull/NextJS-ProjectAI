"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@/app/components/Home/Layout";
import { FaFacebookF, FaXTwitter, FaPinterestP } from "react-icons/fa6";
//import DeskripsiPage from "../Deskripsi";
import { getAi, getAiMostFavorite, incrementClick } from "@/lib/data";
import { Ai } from "@prisma/client";
import { AI } from "@/app/data/ai-card";
import AiCard from "../../ListAi/components/AiCard";
import DeskripsiCard from "../Deskripsi";
import "aos/dist/aos.css";
import AOS from "aos";


//import { url } from "inspector";

interface ProductData {
  name: string;
  shortDesc: string;
  longDesc: string;
  gambar: string;
  url: string;
  kategoriId: string;
}

const ProductPage = () => {
  const { shortLink } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [aiTools, setAiTools] = useState<AI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const getDisplayLink = (shortLink?: string) => {
  //   if (shortLink) {
  //     return `/aff/${shortLink}`;
  //   }
  //   return shortLink || '/404';
  // };

  // const handleClick = async () => {
  //       if (shortLink) {
  //         try {
  //           await incrementClick(shortLink);
  //         } catch (error) {
  //           console.error("Error tracking click:", error);
  //         }
  //       }
  //     };

  useEffect(() => {
    if (shortLink) {
      setIsLoading(true);
      fetch(`../api/Deskripsi/${shortLink}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          if (data.nama && data.nama[0]) {
            setProduct(data.nama[0]);
          } else {
            throw new Error("Product data not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError(err.message || "Error fetching data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [shortLink]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAiMostFavorite();
        setAiTools(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching AI tools:", error);
        setError("Failed to load AI tools");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <section className="relative min-h-[100vh]">
          <div className="container mx-auto px-6 pt-48">
            <p className="text-white text-center">Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <section className="relative min-h-[100vh]">
          <div className="container mx-auto px-6 pt-48">
            <p className="text-white text-center">{error}</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <section className="relative min-h-[100vh]">
          <div className="container mx-auto px-6 pt-48">
            <p className="text-white text-center">Loading</p>
          </div>
        </section>
      </Layout>
    );
  }
  
  // Fallback image jika gambar kosong
  const imageUrl = product.gambar || "/placeholder-image.jpg";
  
  return (
    <Layout>
      <section className="relative min-h-[100vh]">
        <div className="relative z-10">
          <div className="container mx-auto px-6 pt-48">
            <div className="flex flex-col items-center mb-4">
              {product.gambar && (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="mb-4"
                />
              )}
              <h2 className="text-2xl text-white font-bold">{product.name}</h2>
              <p className="text-white flex items-center gap-2 mt-2">
                <span>📂</span> {product.kategoriId}
              </p>
              <div className="mt-6">
                <Link
                  href={product.url}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg inline-block"
                >
                  Visit Website
                </Link>
              </div>
              <p className="text-white mt-4">{product.shortDesc}</p>
            </div>
          </div>
        </div>
    </section>

      <section>
        {/* Deskripsi Lengkap */}
        <div className="bg-white rounded-lg p-4 ml-20 w-[80%] max-w-[1500px] mx-auto">
          <div className="mt-4 flex justify-left gap-3 ml-10">
            <h2 className="text-black text-2xl font-bold">Deskripsi Lengkap</h2>
          </div>
          <div className="flex items-start gap-4 ml-10">
            <div className="mt-8 flex justify-left gap-3">
              <p className="text-black text-xl text-justify leading-relaxed font-medium">
                {product.longDesc}
              </p>
            </div>
          </div>
          {/* Social Share Buttons */}
          <div className="mt-8 flex gap-3 ml-10">
            <span className="text-black text-2xl font-bold flex items-center">
              Share this post
            </span>
          </div>
          <div className="mt-4 flex gap-3 ml-10">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition">
              <FaFacebookF size={20} />
              Facebook
            </button>
            <button className="bg-black text-white px-3 py-2 rounded-lg">
              <FaXTwitter size={20} />
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition">
              <FaPinterestP size={20} />
              Pinterest
            </button>
          </div>
        </div>
      </section>

      <section>
        {/* Deskripsi Lengkap */}
        <div className="bg-white rounded-lg p-4 ml-20 w-[80%] max-w-[1500px] mt-8 mx-auto">
          <div className="mt-4 flex justify-left gap-3 ml-10">
            <h2 className="text-black text-2xl font-bold">Related Jobs</h2>
          </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4 mx-10">
          {aiTools.map((tool) => (
            <DeskripsiCard
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
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
