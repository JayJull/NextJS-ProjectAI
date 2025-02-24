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

const categories = [
  { id: "All Categories", name: "All Categories" },
  { id: "Ai Video", name: "Ai Video" },
  { id: "Ai Photos", name: "Ai Photos" },
  { id: "Ai Voice", name: "Ai Voice" },
];

const logos = [
  {
    id: 1,
    src: "https://aifree.id/wp-content/uploads/2021/03/b7.jpg",
    alt: "Amazon",
  },
  {
    id: 2,
    src: "https://aifree.id/wp-content/uploads/2021/03/b6.jpg",
    alt: "Airbnb",
  },
  {
    id: 3,
    src: "https://aifree.id/wp-content/uploads/2021/03/b4.jpg",
    alt: "Slack",
  },
  {
    id: 4,
    src: "https://aifree.id/wp-content/uploads/2021/03/b3.jpg",
    alt: "PayPal",
  },
  {
    id: 5,
    src: "https://aifree.id/wp-content/uploads/2021/03/b5.jpg",
    alt: "Spotify",
  },
  {
    id: 6,
    src: "https://aifree.id/wp-content/uploads/2021/03/b1.jpg",
    alt: "Figma",
  },
];

const blockContent = [
  {
    id: 1,
    icon: satu,
    title: (
      <>
        Register an account <br />
        to start
      </>
    ),
  },
  {
    id: 2,
    icon: dua,
    title: (
      <>
        Explore over thousands <br />
        of resumes
      </>
    ),
  },
  {
    id: 3,
    icon: tiga,
    title: (
      <>
        Find the most suitable <br />
        candidate
      </>
    ),
  },
];

const news = [
  {
    id: 1,
    img: blog1,
    title: "Attract Sales And Profits ",
    blogSingleTitle:
      "Attract Sales And Profits toward the sunshine - and shadows will fall behind you.",
    link: `A job ravenously while Far much that one rank beheld after outside....`,
  },
  {
    id: 2,
    img: blog2,
    title: "5 Tips For Your Job Interviews",
    blogSingleTitle:
      "5 Tips For Your Job Interviews toward the sunshine - and shadows will fall behind you.",
    link: `A job ravenously while Far much that one rank beheld after outside....`,
  },
  {
    id: 3,
    img: blog3,
    title: "Overworked Newspaper Editor",
    blogSingleTitle:
      "Overworked Newspaper Editor toward the sunshine - and shadows will fall behind you.",
    link: `A job ravenously while Far much that one rank beheld after outside....`,
  },
];

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const Router = useRouter();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Inisialisasi AOS
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <>
      <Layout>
        <section aria-label="Header" className="relative min-h-screen">
          <div className="relative z-10">
            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-40">
              <div className="max-w-4xl my-28 mx-auto text-center">
                <h3
                  className="text-white font-sans text-4xl font-bold mb-12"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-once="true"
                >
                  Find The Best Ai Tools
                </h3>
                <p
                  className="text-sm mb-10 -mt-10 -ml-10 text-white"
                  data-aos="fade-up"
                  data-aos-delay="700"
                  data-aos-once="true"
                >
                  Search from 25.700+ Ai
                </p>

                {/*Search Form */}
                <div
                  className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                  data-aos-once="true"
                >
                  <form
                    className="max-w-full rounded-full overflow-hidden"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex">
                      {/* Dropdown Button */}
                      <button
                        id="dropdown-button"
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      >
                        {selectedCategory}
                        {isDropdownOpen ? (
                          <ChevronUpIcon
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      <div
                        id="dropdown"
                        className={`z-10 ${
                          isDropdownOpen ? "block" : "hidden"
                        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute mt-10`}
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          {categories.map((category) => (
                            <li key={category.id}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCategorySelect(category.name)
                                }
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {category.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Search Input */}
                      <div className="relative w-full">
                        <input
                          type="search"
                          id="search-dropdown"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          placeholder="Search Mockups, Logos, Design Templates..."
                          required
                        />
                        <button
                          type="submit"
                          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <span>Search</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Content">
          <div className="text">
            <h2 className="text-center font-sans font-bold tracking-wide text-2xl">
              Most Popular AI
            </h2>
            <p className="text-center font-sans font-extralight tracking-wide mt-2">
              Know your worth and find the Ai that qualify your life
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
              <JobListings />
            </div>
            <div
              className="mt-4"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <a
              href="/pages/ListAi"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-sans rounded-full text-sm font-semibold px-10 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                More!
              </a>
            </div>
          </div>
        </section>

        <section aria-label="Content 2" className="mt-36">
          <div className="text-center">
            <h2 className="font-sans font-bold tracking-wide text-2xl">
              How It Works?
            </h2>
            <p className="font-sans font-extralight tracking-wide mt-2">
              Ai for anyone, anywhere
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex flex-wrap justify-center w-full">
              {blockContent.map((item) => (
                <div
                  className="process-block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  key={item.id}
                >
                  <div className="icon-box flex justify-center items-center">
                    <Image src={item.icon} alt="" />
                  </div>
                  <h4 className="text-lg font-semibold text-center mt-8">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Article" className="py-16 bg-gray-100 mt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent News Articles
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Fresh job related news content posted each day.
              </p>
            </div>

            {/* Articles Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24"
              data-aos="fade-up"
              data-aos-once="true"
            >
              {news.map((article) => (
                <article key={article.id} className="flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={article.img}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    <Link
                      href={article.link}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {article.blogSingleTitle}
                  </p>

                  <Link
                    href={article.link}
                    className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read More
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Carousel" className="relative">
          <div className="w-full bg-white py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative flex overflow-hidden">
                {/* First set of logos */}
                <div className="flex animate-marquee whitespace-nowrap min-w-full">
                  {logos.map((logo) => (
                    <div
                      key={logo.id}
                      className="flex items-center justify-center flex-grow px-16 min-w-[200px]"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex animate-marquee2 whitespace-nowrap min-w-full absolute left-full">
                  {logos.map((logo) => (
                    <div
                      key={`${logo.id}-duplicate`}
                      className="flex items-center justify-center flex-grow px-16 min-w-[200px]"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
