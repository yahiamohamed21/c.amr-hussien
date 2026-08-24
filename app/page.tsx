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
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { TopTrainer } from "@/components/sections/TopTrainer";
import { ClientFeedback } from "@/components/sections/ClientFeedback";

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
          <ClientFeedback />
          <Education />
          <Statistics />
          <TopTrainer />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
