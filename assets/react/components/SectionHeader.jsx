import { useTranslation } from "react-i18next";

export default function SectionHeader({
  title,
  subtitle,
  color,
  aos = "fade-right",
  delay = 100,
}) {
  const { t } = useTranslation();

  return (
    <section className="compact-contact-header" style={{backgroundColor: color}}>
      <div className="container">
        <h1 data-aos={aos}>{t(title)}</h1>

        {subtitle && (
          <p
            className="subtitle"
            data-aos={aos}
            data-aos-delay={delay}
          >
            {t(subtitle)}
          </p>
        )}
      </div>
    </section>
  );
}
