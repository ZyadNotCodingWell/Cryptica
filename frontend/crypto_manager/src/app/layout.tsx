import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../app/LayoutElements/Navigation";
import Footer from "../app/LayoutElements/Footer";


const inter = Inter({
  preload: false,
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cryptica",
  description: "Advnced Crypto Forecasting Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased w-full justify-center  bg-neutral-200`}
      >
        <Navigation/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
