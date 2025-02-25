"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@/app/components/Home/Layout";
import { FaFacebookF, FaXTwitter, FaPinterestP } from "react-icons/fa6";
//import DeskripsiPage from "../Deskripsi";
import { incrementClick } from "@/lib/data";

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
            <p className="text-white text-center">Product not found</p>
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
        <div className="mt-8 flex justify-left gap-3 ml-40">
              <h2 className="text-black font-semibold">
                Deskripsi Lengkap 
              </h2>
          </div>
          <div className="mt-8 flex justify-left gap-3 ml-40">
              <p className="text-black max-w-lg">
                {product.longDesc}
              </p>
          </div>

        {/* Social Share Buttons */}
        <div className="mt-8 flex justify-left gap-3 ml-40">
          <span className="text-black font-semibold flex items-center">
            Share this post
          </span>
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
      </section>
    </Layout>
  );
};

export default ProductPage;
