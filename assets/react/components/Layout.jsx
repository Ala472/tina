import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Composant de Mise en Page (Layout)
 * Il enveloppe le contenu de la page (passé via { children })
 * entre le Header et le Footer.
 */
export default function Layout({ children }) {
    return (
        <>
            <Header />

            {/* Le contenu spécifique de la page (Home, Admin, etc.) */}
                {children}

            <Footer />
        </> 
    );
}