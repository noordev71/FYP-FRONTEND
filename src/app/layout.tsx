import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musannaf",
  description: "Your assistant is here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-track-rounded-full`}
    >
      <body className={`min-h-screen font-space-grotesk bg-dark`}>
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
