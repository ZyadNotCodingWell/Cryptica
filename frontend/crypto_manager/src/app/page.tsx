import Hero from "./Sections/Hero";
import Cryptos from "./Sections/Cryptos";
import Numbers from "./Sections/Numbers";
export default function Home() {
    
  return (
    <main className="px-24 relative py-16 justify-center gap-36 flex flex-col">
      <Hero/>
      <Numbers/>
      <Cryptos/>
    </main>
  );
}
