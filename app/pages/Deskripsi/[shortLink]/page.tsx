"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@/app/components/Home/Layout";

interface ProductData {
  name: string;
  shortDesc: string;
  gambar: string;
  url: string;
  kategoriId: string;
}

const ProductPage = () => {
  const { shortLink } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const imageUrl = product.gambar || '/placeholder-image.jpg';

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
              <h2 className="text-2xl text-white font-bold">
                {product.name}
              </h2>
              <p className="text-white flex items-center gap-2 mt-2">
                <span>📂</span> {product.kategoriId}
              </p>
              <div className="mt-6">
                <Link
                  href={product.url || '#'}
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
    </Layout>
  );
};

export default ProductPage;