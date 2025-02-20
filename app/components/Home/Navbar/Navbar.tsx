"use client"

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
    className={`fixed top-0 left-0 right-0 mx-auto flex items-center justify-between p-6 lg:px-8 z-50 ${
      scrolled ? "bg-blue-800 shadow-lg" : "bg-transparent"
    }`}
    >
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">          
          <img alt="Logo" src="/AIfree.png" className="h-16 w-auto ml-20" />
        </a>
      </div>

      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenu(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="size-6" aria-hidden="true" />
        </button>
      </div>

      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <a href="/" className="text-sm font-semibold text-white">Home</a>
        <a href="/pages/ListAi" className="text-sm font-semibold text-white">
          Find AI
        </a>
        <a href="/pages/About" className="text-sm font-semibold text-white">
          About
        </a>
      </PopoverGroup>

      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/pages/Dashboard"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-sans rounded-full text-sm font-semibold px-10 py-3 me-36 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
