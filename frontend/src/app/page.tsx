import { Hero } from "@/app/components/home/Hero";
import { Navbar } from "@/app/components/home/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
