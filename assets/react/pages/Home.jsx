import ProductsList from "../admin/ProductsList";
import Slider from "../components/Slider"; // 👉 importe ton Slider
import Testimonials from "../components/Testimonials";
import Title from "../components/Title";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <main id="slider">
            <Helmet>
                <title>Page d'accueil - Tina Moteur</title>
                <meta
                    name="description"
                    content="Tina Moteur pour toute question commerciale ou technique"
                />
            </Helmet>
            <Slider />   {/* 👉 Appel du composant Slider */}
            <Title 
                title="Why Choose Tina Moteur"
                description="Innovative solutions designed for reliability and performance"
                bgColor="#ffff"
            />
            <Testimonials
                bgColor="#f4f3f1"
            />
        </main>
    );
} 
