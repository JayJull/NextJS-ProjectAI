import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['storage.googleapis.com', 'blob.cloudcomputing.id'], // Add the domain here
  },
};

export default nextConfig;
