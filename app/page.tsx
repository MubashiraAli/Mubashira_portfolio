import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grain from "@/components/Grain";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Grain />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <BackToTop />
    </>
  );
}
