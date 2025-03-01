"use client"

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  PopoverGroup,
  Dialog,
  Transition
} from "@headlessui/react";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import LoginPopUp from "@/app/components/LoginPopUp/Login";

interface NavbarProps {
  showLoginModal?: boolean;
  setShowLoginModal?: (show: boolean) => void;
}

const Navbar = ({ showLoginModal: initialShowLoginModal = false, setShowLoginModal: externalSetShowLoginModal }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setLocalShowLoginModal] = useState(initialShowLoginModal);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Use the external state setter if provided, otherwise use the local one
  const handleSetShowLoginModal = (value: boolean) => {
    if (externalSetShowLoginModal) {
      externalSetShowLoginModal(value);
    } else {
      setLocalShowLoginModal(value);
    }
  };
  
  
  useEffect(() => {
    setLocalShowLoginModal(initialShowLoginModal);
  }, [initialShowLoginModal]);
  
  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        // You can replace this with your actual check from cookies or localStorage
        const userId = document.cookie.includes('userId=');
        setIsLoggedIn(userId);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    
    checkLoginStatus();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    handleSetShowLoginModal(true);
  };

  const handleLogout = async () => {
    try {
      // Import dynamically to avoid server component issues
      const { logout } = await import('@/lib/data');
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // The actual showLoginModal value to use in the component
  const currentShowLoginModal = externalSetShowLoginModal ? initialShowLoginModal : showLoginModal;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 mx-auto flex items-center justify-between p-6 lg:px-8 z-50 ${
          scrolled ? "bg-blue-800 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">          
            <img alt="Logo" src="/AIfree.png" className="h-16 w-auto ml-4 lg:ml-20" />
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
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <a href="/pages/Dashboard"
                className="text-white bg-blue-700 hover:bg-blue-800 font-sans rounded-full text-sm font-semibold px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 font-sans text-sm font-semibold px-4 py-2 me-16"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                className="text-white hover:text-blue-200 font-sans text-sm font-semibold px-4 py-2"
              >
                Login
              </button>
              <a href="/pages/Dashboard"
                className="text-white bg-blue-700 hover:bg-blue-800 font-sans rounded-full text-sm font-semibold px-8 py-3 me-16 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Get Started
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenu} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setMobileMenu}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-lg sm:w-full">
                  <div className="bg-blue-800 p-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-white"
                      >
                        Menu
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-white hover:text-gray-300 focus:outline-none"
                        onClick={() => setMobileMenu(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4">
                      <a 
                        href="/" 
                        className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700"
                        onClick={() => setMobileMenu(false)}
                      >
                        Home
                      </a>
                      <a 
                        href="/pages/ListAi" 
                        className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700"
                        onClick={() => setMobileMenu(false)}
                      >
                        Find AI
                      </a>
                      <a 
                        href="/pages/About" 
                        className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700"
                        onClick={() => setMobileMenu(false)}
                      >
                        About
                      </a>
                    </div>
                    <div className="px-6 py-4">
                      {isLoggedIn ? (
                        <>
                          <a 
                            href="/pages/Dashboard" 
                            className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700"
                            onClick={() => setMobileMenu(false)}
                          >
                            Dashboard
                          </a>
                          <button 
                            onClick={() => {
                              handleLogout();
                              setMobileMenu(false);
                            }}
                            className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              setMobileMenu(false);
                              handleSetShowLoginModal(true);
                            }}
                            className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700 w-full text-left"
                          >
                            Login
                          </button>
                          <a 
                            href="/pages/Dashboard" 
                            className="block py-3 text-base font-medium text-gray-900 hover:text-blue-700"
                            onClick={() => setMobileMenu(false)}
                          >
                            Get Started
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Login Modal */}
      {currentShowLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-semibold">Login</h3>
              <button
                onClick={() => handleSetShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <LoginPopUp 
                onClose={() => handleSetShowLoginModal(false)} 
                onLoginSuccess={() => {
                  setIsLoggedIn(true);
                  handleSetShowLoginModal(false);

                  // Add redirect after successful login if returnUrl is present
                  const urlParams = new URLSearchParams(window.location.search);
                  const returnUrl = urlParams.get('returnUrl');
                  if (returnUrl) {
                    window.location.href = decodeURIComponent(returnUrl);
                  }
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;