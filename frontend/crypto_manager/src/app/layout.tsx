import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Exo_2 } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/LayoutElements/Navigation";
import Footer from "./components/LayoutElements/Footer";


const inter = Inter({
  preload: false,
  subsets: ["latin"],
})

const orbitron = Orbitron({
  preload: false,
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const exo_2 = DM_Sans({
  preload: false,
  subsets: ["latin"],
  weight: ["100","200","300","400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-exo-2",
});

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
        className={`${exo_2.className} antialiased w-full bg-neutral-950 relative`}
      >
        <Navigation/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
