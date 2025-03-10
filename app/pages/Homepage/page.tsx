"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import JobListings from "@/app/components/AiLists/AiList";
import satu from "../../../public/1.jpg";
import dua from "../../../public/2.jpg";
import tiga from "../../../public/3.jpg";
import blog1 from "../../../public/blog 1.jpg";
import blog2 from "../../../public/blog 2.jpg";
import blog3 from "../../../public/blog 3.jpg";
import { Layout } from "@/app/components/Home/Layout";
import { useRouter } from "next/navigation";
import { getKategori } from "@/lib/data";
import { PulseLoader } from "react-spinners";

const logos = [
  {
    id: 1,
    src: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
    alt: "Amazon",
  },
  {
    id: 2,
    src: "https://www.vectorlogo.zone/logos/airbnb/airbnb-ar21.svg",
    alt: "Airbnb",
  },
  {
    id: 3,
    src: "https://www.vectorlogo.zone/logos/slack/slack-ar21.svg",
    alt: "Slack",
  },
  {
    id: 4,
    src: "https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg",
    alt: "PayPal",
  },
  {
    id: 5,
    src: "https://www.vectorlogo.zone/logos/spotify/spotify-ar21.svg",
    alt: "Spotify",
  },
  {
    id: 6,
    src: "https://www.vectorlogo.zone/logos/figma/figma-ar21.svg",
    alt: "Figma",
  },
];

const blockContent = [
  {
    id: 1,
    icon: satu,
    title: "Register an account to start",
  },
  {
    id: 2,
    icon: dua,
    title: "Explore over thousands of resumes",
  },
  {
    id: 3,
    icon: tiga,
    title: "Find the most suitable candidate",
  },
];

const news = [
  {
    id: 1,
    img: blog1,
    title: "Attract Sales And Profits",
    blogSingleTitle:
      "Attract Sales And Profits toward the sunshine - and shadows will fall behind you.",
    link: "sito.pw",
  },
  {
    id: 2,
    img: blog2,
    title: "5 Tips For Your Job Interviews",
    blogSingleTitle:
      "5 Tips For Your Job Interviews toward the sunshine - and shadows will fall behind you.",
    link: "sito.pw",
  },
  {
    id: 3,
    img: blog3,
    title: "Overworked Newspaper Editor",
    blogSingleTitle:
      "Overworked Newspaper Editor toward the sunshine - and shadows will fall behind you.",
    link: "sito.pw",
  },
];

interface Category {
  id: number;
  nama: string;
  name?: string;
}

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const Router = useRouter();

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData: Category[] = await getKategori();
        setCategories([{ id: 0, nama: "All Categories" }, ...categoriesData]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (selectedCategory !== "All Categories") {
      params.set("category", selectedCategory);
    }

    Router.push(`/pages/ListAi?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
        <PulseLoader color="#ffffff" size={15} />
        <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
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

              {/*Search Form - Improved Aesthetics */}
              <div
                className="max-w-xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="1000"
                data-aos-once="true"
              >
                <form
                  className="bg-white/15 backdrop-blur-lg rounded-2xl shadow-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/20"
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
                          className="py-1 text-sm text-gray-700"
                          aria-labelledby="dropdown-button"
                        >
                          {categories.map((category) => (
                            <li key={category.id}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCategorySelect(category.nama)
                                } // Use nama instead of name
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
                        />
                      </div>
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
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
                        <span className="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular AI Section */}
      <section aria-label="Content" className="py-40 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text mb-8">
            <h2 className="text-center font-sans font-bold tracking-wide text-xl sm:text-2xl">
              Most Popular AI
            </h2>
            <p className="text-center font-sans font-extralight tracking-wide mt-2 text-sm sm:text-base px-4">
              Know your worth and find the Ai that qualify your life
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-full max-w-full overflow-x-auto px-2 sm:px-0"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <JobListings />
            </div>
            <div
              className="mt-6 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <Link
                href="/pages/ListAi"
                className="text-white bg-blue-600 hover:bg-blue-700 font-sans rounded-xl text-sm font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                More!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section aria-label="Content 2" className="mt-16 md:mt-36 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-sans font-bold tracking-wide text-xl sm:text-2xl">
              How It Works?
            </h2>
            <p className="font-sans font-extralight tracking-wide mt-2 text-sm sm:text-base">
              Ai for anyone, anywhere
            </p>
          </div>

          <div className="flex justify-center mt-4 md:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
              {blockContent.map((item) => (
                <div
                  className="process-block p-4 flex flex-col items-center bg-white/50 backdrop-blur-sm rounded-xl hover:shadow-md transition-all duration-300"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={200 + item.id * 100}
                  data-aos-once="true"
                >
                  <div className="icon-box flex justify-center items-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                    <Image
                      src={item.icon}
                      alt={`Step ${item.id}`}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-md sm:text-lg font-semibold text-center mt-4 sm:mt-8">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section
        aria-label="Article"
        className="py-12 md:py-16 bg-gray-100 mt-16 md:mt-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recent News Articles
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Fresh job related news content posted each day.
            </p>
          </div>

          {/* Articles Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16"
            data-aos="fade-up"
            data-aos-once="true"
          >
            {news.map((article) => (
              <article
                key={article.id}
                className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={article.id * 100}
                data-aos-once="true"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    priority
                  />
                </div>

                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    <Link
                      href={article.link}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm md:text-base text-gray-600 line-clamp-2 flex-grow">
                    {article.blogSingleTitle}
                  </p>

                  <Link
                    aria-label={`Read more about ${article.title}`}
                    href={article.link}
                    className="mt-4 text-sm md:text-base text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                  >
                    Read More
                    <svg
                      className="w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logos Carousel Section - Fixed for Mobile */}
      <section
        aria-label="Carousel"
        className="py-8 md:py-12 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-sm md:text-base text-gray-500 mb-6">
            Trusted by leading companies
          </p>
        </div>
        <div className="w-full overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Using pause on hover for better mobile experience */}
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap py-4 logos-container">
                {logos.map((logo) => (
                  <div
                    key={logo.id}
                    className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 min-w-[100px] sm:min-w-[140px] md:min-w-[180px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                ))}

                {/* Duplicate set for seamless loop - with enough spacing to prevent overlap */}
                {logos.map((logo) => (
                  <div
                    key={`${logo.id}-duplicate`}
                    className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 min-w-[100px] sm:min-w-[140px] md:min-w-[180px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
