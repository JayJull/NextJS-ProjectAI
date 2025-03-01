"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useSearchParams } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if loginModal parameter is true
    const loginModal = searchParams.get('loginModal');
    if (loginModal === 'true') {
      setShowLoginModal(true);
    }
  }, [searchParams]);

  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/background/2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Navbar showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      {children}
      <Footer />
    </>
  );
};