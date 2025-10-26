import FooterComponent from "../components/organisms/footercomponent";
import ServicesCards from "../components/molecules/cards";
import InitialSection from "../components/molecules/initialSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <InitialSection/>

      <main className="flex-grow flex items-center justify-center">
        <ServicesCards />
      </main>

      <FooterComponent />
    </div>
  );
}