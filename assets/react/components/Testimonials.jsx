import React from "react";
import Title from "./Title";
export default function Testimonials({bgColor}) {
    return (
        <section class="testimonials-section" style={{ backgroundColor: bgColor }}>
            <div class="section-container">
            <Title 
                title="What Our Clients Say"
                description="Trusted by homeowners and businesses across Tunisia"
                bgColor={"#f4f3f1"}
            />

            <div class="testimonials-slider">
                <div class="testimonial-card">
                <div class="testimonial-content">
                    <div class="testimonial-rating">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    </div>
                    <blockquote>
                    "The Tina Mouteur automation system transformed our property's
                    security. The installation was quick and professional, and the
                    system has been flawless for over two years now."
                    </blockquote>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Mohamed Ali"
                        loading="lazy"
                    />
                    </div>
                    <div class="author-info">
                    <h4>Mohamed Ali</h4>
                    <p>Residential Client, Tunis</p>
                    </div>
                </div>
                </div>

                <div class="testimonial-card">
                <div class="testimonial-content">
                    <div class="testimonial-rating">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    </div>
                    <blockquote>
                    "As a business owner, reliability is crucial. Tina Mouteur's
                    commercial gate system has exceeded our expectations with its
                    durability and advanced features."
                    </blockquote>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Amira Ben Salah"
                        loading="lazy"
                    />
                    </div>
                    <div class="author-info">
                    <h4>Amira Ben Salah</h4>
                    <p>Business Client, Sousse</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}
