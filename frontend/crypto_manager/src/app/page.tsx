import Hero from "./components/Sections/Hero";
import Cryptos from "./components/Sections/Cryptos";
import { About3 } from "@/app/components/Sections/about3";
import Companies from "./components/Sections/Companies";
import { Forecasting } from "./components/Sections/forecasting";
import Pricing from "./components/Sections/Pricing";
import Navigation from "./components/LayoutElements/Navigation";
import { Contact } from "./components/Sections/contacts";
import Footer from "./components/LayoutElements/Footer";
export default function Home() {
    
  return (
    <>
      <Navigation />
      <main className=" relative justify-center flex flex-col">
        <Hero/>
        <Companies />
        <Forecasting />
        <About3 />
        <Pricing />
        <Cryptos/>
        <Contact />
        <div className="hidden container text-center w-full text-neutral-800 justify-center text-xl">To the friend who made this possible, you&apos;ll never be forgotten https://chatgpt.com/c/680f77c3-aee8-8000-8082-65912fce2957</div>
      </main>
      <Footer />
    </>
  );
}
