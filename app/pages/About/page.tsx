"use client";

import Image from "next/image";
import { Layout } from "@/app/components/Home/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import rhoma from '../../../public/rhoma.jpeg';
import prabowo from '../../../public/prabowo.jpeg';
import sarah from '../../../public/sarah.jpeg';

const teamMembers = [
  {
    id: 1,
    name: "Rhoma Irama",
    role: "Founder & CEO",
    image: rhoma
  },
  {
    id: 2,
    name: "Prabowo Subianto",
    role: "Head of AI Research",
    image: prabowo
  },
  {
    id: 3,
    name: "Sarah Viloid",
    role: "Technical Lead",
    image: sarah
  }
];

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

const stats = [
  { id: 1, number: "25,700+", label: "AI Tools Listed" },
  { id: 2, number: "100K+", label: "Monthly Users" },
  { id: 3, number: "50+", label: "Categories" },
  { id: 4, number: "24/7", label: "Support" }
];

const values = [
  {
    id: 1,
    title: "Innovation First",
    description: "We continuously evolve to bring you the latest in AI technology"
  },
  {
    id: 2,
    title: "User-Centric",
    description: "Every feature is designed with our users' needs in mind"
  },
  {
    id: 3,
    title: "Quality Assurance",
    description: "We carefully verify and test each AI tool before listing"
  }
];

const AboutPage = () => {
 // alert(params.shortLink)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
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
                About AiFree.id
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center" data-aos="fade-up">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To democratize access to artificial intelligence by creating the most comprehensive
              and user-friendly platform for discovering AI tools. We believe in making
              advanced technology accessible to everyone, regardless of their technical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div
                key={value.id}
                className="text-center p-6 rounded-lg bg-white shadow-lg"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={member.id * 100}
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 px-96 rounded-lg bg-blue-900">
        <div className="max-w-xl mx-auto px-80 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Want to Learn More?
          </h2>
          <p className="text-xl text-blue-200 mb-12">
            We're always happy to hear from you. Reach out to our team with any questions.
          </p>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-sans rounded-full text-lg font-semibold px-12 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            Contact Us
          </button>
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
  );
};

export default AboutPage;