import { Children } from "react";
import FooterComponent from "../../components/atoms/molecules/organisms/footercomponent";
import HeaderComponent from "../../components/atoms/molecules/organisms/headercomponent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />

      {/* Contenido principal (ocupa el espacio disponible) */}
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-center text-2xl font-bold">
        </h1>
      </main>

      <FooterComponent />
    </div>
  );
}