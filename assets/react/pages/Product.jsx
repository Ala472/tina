import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductsList from "../admin/ProductsList";
import SectionHeader from "../components/SectionHeader";

export default function Product() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);


  return (
    <main id="main-content">
      <Helmet>
        <title>Listes des produits - Tina Moteur</title>
        <meta
          name="description"
          content="Listes des produits Tina Moteur pour toute question commerciale ou technique"
        />
      </Helmet>

      <SectionHeader
        title="Our Products"
        subtitle="Une question ? Notre équipe vous répond rapidement"
      />

      <ProductsList />
    </main>
  );
}
