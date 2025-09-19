import { Children } from "react";
import FooterComponent from "../components/organisms/footercomponent";
import HeaderComponent from "../components/molecules/HeaderComponent";
import ServicesCards from "../../components/molecules/cards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-center text-2xl font-bold">
        </h1>
        <ServicesCards></ServicesCards>
      </main>

      <FooterComponent />
    </div>
  );
}