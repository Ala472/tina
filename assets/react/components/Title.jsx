import React from "react";

export default function Title({ title, description, bgColor }) {
    return (
        <section
            className="features-section"
            aria-label="Our features"
            style={{ backgroundColor: bgColor }}
        >
            <div className="section-container">
                <h2 className="section-title">{title}</h2>
                <p className="section-description">{description}</p>
            </div>
        </section>
    );
}
