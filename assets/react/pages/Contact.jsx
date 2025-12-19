import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

import SectionHeader from "../components/SectionHeader";

export default function Contact() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: envoyer le formulaire (API / email)
    console.log("Form submitted");
  };

  return (
    <main id="main-content">
      <Helmet>
        <title>Contact - Tina Moteur</title>
        <meta
          name="description"
          content="Contactez Tina Moteur pour toute question commerciale ou technique"
        />
      </Helmet>

      <SectionHeader
        title="Nous contacter"
        subtitle="Une question ? Notre équipe vous répond rapidement"
      />

      <section className="contact-info-section">
        <div className="section-container">
          <div className="contact-grid">
            {/* LEFT SIDE */}
            <div className="contact-details" data-aos="fade-right">
              <h2 className="section-title">Tina Moteur</h2>
              <p className="section-description">
                Assistance et Services 7/7
              </p>

              <div className="contact-method">
                <h3>Service Commercial</h3>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:commercial@kpa.tn">
                    commercial@kpa.tn
                  </a>
                </p>
              </div>

              <div className="contact-method">
                <h3>Service Technique</h3>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:technique@kpa.tn">
                    technique@kpa.tn
                  </a>
                </p>
              </div>

              <div className="contact-method">
                <h3>Plus d&apos;Informations</h3>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@kpa.tn">info@kpa.tn</a>
                </p>
                <p>
                  <strong>Adresse:</strong> 153, Av. 18 Janvier, 153B – Sidi
                  Hassine 1095
                </p>
              </div>

              <div className="contact-note">
                <p>
                  Merci pour votre visite. Parlez du site à vos ami(e)s,
                  cela nous aide à gagner de nouveaux amis.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="contact-form-container" data-aos="fade-left">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="form-title">ENVOYER UN MESSAGE</h2>

                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Objet</label>
                  <input type="text" id="subject" name="subject" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  ENVOYER UN MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
