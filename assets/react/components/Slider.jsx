import React, { useEffect, useState } from "react";
import { getSlides } from "../services/slideService";
import Loader from "../components/Loader";

export default function Slider() {
    const [slides, setSlides] = useState([]);
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        getSlides().then(res => setSlides(res.data));
    }, []);

    const max = slides.length;

    useEffect(() => {
        if (!autoplay || max === 0) return;
        const interval = setInterval(() => {
            setActive(prev => (prev === max - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [autoplay, active, max]);

    const next = () => setActive(active === max - 1 ? 0 : active + 1);
    const prev = () => setActive(active === 0 ? max - 1 : active - 1);

    if (slides.length === 0) {
        return (
            <p>waiting</p>
        );
    }

    return (
        <section className="slider">
            <div
                className="wrapper"
                style={{
                    width: `${slides.length * 100}vw`,
                    transform: `translateX(-${active * 100}vw)`
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="each-slide"
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                        <div className="overlay"></div>
                        <div className="slide-text">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="arrow prev" onClick={prev}>❮</button>
            <button className="arrow next" onClick={next}>❯</button>

            <ul className="dots">
                {slides.map((_, index) => (
                    <li
                        key={index}
                        className={index === active ? "active" : ""}
                        onClick={() => setActive(index)}
                    ></li>
                ))}
            </ul>

            <button className="toggle-play" onClick={() => setAutoplay(!autoplay)}>
                {autoplay ? "⏸" : "▶"}
            </button>
        </section>
    );
}
