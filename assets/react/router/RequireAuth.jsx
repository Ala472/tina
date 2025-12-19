import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Assurez-vous d'importer votre contexte d'authentification
// qui contient le token et le rôle de l'utilisateur.
import { AuthContext } from '../context/AuthContext'; 

/**
 * Composant de Route Protégée (RequireAuth)
 * * Il vérifie si l'utilisateur est authentifié et possède le rôle requis (ROLE_ADMIN).
 * Si c'est le cas, il rend les composants enfants (les routes protégées).
 * Sinon, il redirige l'utilisateur vers la page de connexion.
 *
 * @param {object} props - Les props passées au composant.
 * @param {React.ReactNode} props.children - Les composants enfants (AppAdmin dans votre cas).
 * @param {string} [props.requiredRole='ROLE_ADMIN'] - Le rôle minimum requis pour accéder à la route.
 */
export default function RequireAuth({ children, requiredRole = 'ROLE_ADMIN' }) {
    // 1. Récupération des informations d'authentification
    // Le AuthContext doit fournir :
    // - isAuthenticated : booléen
    // - userRole : chaîne de caractères (ex: 'ROLE_ADMIN', 'ROLE_USER')
    const { isAuthenticated, userRole } = useContext(AuthContext); 
    
    // 2. Obtention de la localisation actuelle (pour pouvoir rediriger après connexion)
    const location = useLocation();

    // --- LOGIQUE DE VÉRIFICATION ---

    // Option 1: Vérification simple (Est-il connecté ?)
    if (!isAuthenticated) {
        // L'utilisateur n'est pas connecté. 
        // Redirection vers /login, en passant l'état 'from' pour revenir ici après succès.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Option 2: Vérification des rôles (Est-ce un Admin ?)
    // Ceci est crucial pour la page /admin
    if (userRole !== requiredRole) {
        // L'utilisateur est connecté, mais n'a pas le rôle requis.
        // On pourrait rediriger vers la page d'accueil ou afficher un message d'erreur 403.
        console.error(`Accès refusé. Rôle requis: ${requiredRole}, Rôle actuel: ${userRole}`);
        
        // Redirection vers la page d'accueil (ou une page 403 customisée)
        return <Navigate to="/" replace />;
    }

    // 3. Si toutes les conditions sont remplies (connecté + bon rôle), 
    // on rend les composants enfants (ici, <AppAdmin />).
    return children;
}