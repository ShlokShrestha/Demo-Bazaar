import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Demo Bazaar, a modern demo eCommerce marketplace built with Next.js.",
  keywords: [
    "Bazaar ecommerce",
    "online marketplace",
    "Next.js ecommerce demo",
    "modern ecommerce website",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us - Demo Bazaar",
    description:
      "Demo Bazaar is a modern demo eCommerce marketplace built with Next.js.",
    images: [
      {
        url: "/og/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Demo Bazaar eCommerce Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/about-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const AboutPage = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About Bazaar</h1>

      <p className="mb-4 text-gray-700">
        Bazaar is a modern eCommerce marketplace designed to connect buyers with
        trusted sellers in a vibrant online bazaar experience. Our platform
        brings together a wide range of products—including fashion, electronics,
        home essentials, and daily needs—at competitive prices.
      </p>

      <p className="mb-4 text-gray-700">
        Built with performance and usability in mind, Bazaar focuses on fast
        browsing, secure payments, and a seamless shopping journey. This demo
        project showcases real-world marketplace features using modern web
        technologies like Next.js.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Bazaar?</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Wide variety of products from multiple vendors</li>
        <li>User-friendly and responsive design</li>
        <li>Secure and smooth shopping experience</li>
        <li>Built with modern, scalable technologies</li>
      </ul>
    </section>
  );
};

export default AboutPage;
