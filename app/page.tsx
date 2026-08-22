import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Statistics } from "@/components/sections/Statistics";
import { About } from "@/components/sections/About";
import { InjuryExpert } from "@/components/sections/InjuryExpert";
import { QuoteDivider } from "@/components/sections/QuoteDivider";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Philosophy } from "@/components/sections/Philosophy";
import { Results } from "@/components/sections/Results";
import { Accreditations } from "@/components/sections/Accreditations";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="relative z-20 bg-background flex flex-col">
          <Philosophy />
          <About />
          <Mission />
          <InjuryExpert />
          <QuoteDivider />
          <Process />
          <Services />
          <Results />
          <Accreditations />
          <Education />
          <Statistics />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
