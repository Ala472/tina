// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    userRole: null,
    login: (token, roles) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    // Récupérer le token et le rôle du localStorage au chargement
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt_token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || null);

    const login = (token, roles) => { // ⬅️ AJOUTEZ 'roles' ici
        localStorage.setItem('jwt_token', token);
        
        // Assurez-vous que roles est un tableau avant d'accéder à l'index [0]
        if (Array.isArray(roles) && roles.length > 0) {
            localStorage.setItem('user_role', roles[0]); 
            setUserRole(roles[0]); 
        }
        
        setIsAuthenticated(true);
    };
    const logout = () => {
        // 1. Suppression du JWT et du Rôle du stockage local
        localStorage.removeItem('jwt_token'); 
        localStorage.removeItem('user_role');
        
        // 2. Mise à jour de l'état React
        setIsAuthenticated(false);
        setUserRole(null);
        
        // Optionnel : Nettoyage de l'entête Axios si vous l'utilisez
        // delete apiClient.defaults.headers.common['Authorization'];
    };

    const contextValue = {
        isAuthenticated,
        userRole,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};