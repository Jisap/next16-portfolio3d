import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "./context/AppContext";
import TransitionRouter from "@/components/TransitionRouter";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushagarwal.dev"),
  title: "Ayush Kumar Agarwal | Full Stack Developer · AI/ML Enthusiast",
  description:
    "Building AI-powered products, full-stack applications, and ideas that can scale. Portfolio of Ayush Kumar Agarwal, Computer Science & Business Systems student at Heritage Institute of Technology.",
  authors: [{ name: "Ayush Kumar Agarwal" }],
  keywords: [
    "Ayush Kumar Agarwal",
    "Full Stack Developer",
    "AI/ML",
    "Next.js",
    "React",
    "Python",
    "Portfolio",
    "Machine Learning",
    "Streamlit",
    "FastAPI",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/Images/logo-badge.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32.png",
    apple: [
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/Images/logo-badge.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Ayush Kumar Agarwal | Full Stack Developer · AI/ML Enthusiast",
    description:
      "Building AI-powered products, full-stack applications, and ideas that can scale.",
    url: "https://ayushagarwal.dev",
    siteName: "Ayush Kumar Agarwal Portfolio",
    images: [
      {
        url: "/Images/logo-badge.png",
        width: 512,
        height: 512,
        alt: "Ayush Kumar Agarwal (AKA) Logo Badge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <body>
        <AppProvider>
          <TransitionRouter>
            <Navbar />
            <LoadingScreen>{children}</LoadingScreen>
          </TransitionRouter>
        </AppProvider>
      </body>
    </html>
  );
}
