import ServicesCards from "../components/molecules/cards";
import InitialSection from "../components/molecules/initialSection";
import HighlightedInfo from "../components/molecules/HighlightedInfo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <InitialSection />
      <section className="py-14 flex justify-center">
        <ServicesCards />
      </section>
      <HighlightedInfo />
    </div>
  );
}
