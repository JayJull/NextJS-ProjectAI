import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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

      <Navbar />
      {children}
      <Footer />
    </>
  );
};
