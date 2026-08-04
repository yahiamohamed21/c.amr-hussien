import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Statistics } from "@/components/Statistics";
import { About } from "@/components/About";
import { InjuryExpert } from "@/components/InjuryExpert";
import { QuoteDivider } from "@/components/QuoteDivider";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Philosophy } from "@/components/Philosophy";
import { Results } from "@/components/Results";
import { Accreditations } from "@/components/Accreditations";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Statistics />
        <About />
        <InjuryExpert />
        <QuoteDivider />
        <Services />
        <Process />
        <Philosophy />
        <Results />
        <Accreditations />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
