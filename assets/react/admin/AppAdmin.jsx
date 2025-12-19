// src/admin/AppAdmin.jsx (Le contenu de la page /admin)
// Vous n'avez besoin que des composants de votre panneau admin
import ProductsList from "./ProductsList";
// Supprimez tous les imports de 'Login', 'useState', 'Router', etc.
import React, { useContext, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader";
/**
 * Composant principal du tableau de bord administrateur.
 * Ce composant est déjà protégé par <RequireAuth> dans App.jsx.
 */
export default function AppAdmin() {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // 2. Appel de la fonction de nettoyage
        logout();
        
        // 3. Redirection vers la page d'accueil ou de connexion
        navigate('/'); 
        // ou navigate('/login', { replace: true });
    };

    const handleSlide = () => {
        // 2. Appel de la fonction de nettoyage
        
        // 3. Redirection vers la page d'accueil ou de connexion
        navigate('/admin/slide'); 
        // ou navigate('/login', { replace: true });
    };

    const handleCreate = () => {
        // 2. Appel de la fonction de nettoyage
        
        // 3. Redirection vers la page d'accueil ou de connexion
        navigate('/admin/create'); 
        // ou navigate('/login', { replace: true });
    };
    // Si ce composant est rendu, c'est que l'utilisateur est Admin et connecté.
    
    return (
        <div className="admin-dashboard">
            <Helmet>
                    <title>Page d'administration - Tina Moteur</title>
                    <meta
                      name="description"
                      content="Tina Moteur pour toute question commerciale ou technique"
                    />
            </Helmet>
            <header className="d-flex justify-content-around align-items-center p-3 white">
                <SectionHeader
                title="Tableau de bord Administrateur"
                subtitle="Listes des produits"
                color={"#ffff"}
                />
                <div className="d-flex gap-3">
                    <button onClick={handleSlide} className="addButton">
                        Gerée les Slides
                    </button>
                    <button onClick={handleCreate} className="addButton">
                        Ajouter un Produit
                    </button>
                    <button onClick={handleLogout} className="logoutButton">
                        Déconnexion
                    </button>
                </div>
            </header>

            
            <ProductsList />
            {/* ... autres contenus ... */}
        </div>
    );
}