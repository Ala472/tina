import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import { jwtDecode } from "jwt-decode"; // Import pour décoder le token
// Assurez-vous que le chemin est correct pour votre AuthContext
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    // 1. Récupération de la fonction 'login' du contexte
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate(); // Hook de navigation

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/login_check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); 
                if (response.status === 401) {
                    setError("Email ou mot de passe incorrect.");
                } else if (errorData.message) {
                    setError(`Erreur du serveur : ${errorData.message}`);
                } else {
                    setError(`Erreur de connexion : statut ${response.status}`);
                }
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            
            if (data.token) {
                const token = data.token;
                console.log("Token reçu :", token);
                
                // --- NOUVELLE LOGIQUE CRUCIALE ---
                // 1. Décoder le token pour extraire les rôles et le username
                const decodedToken = jwtDecode(token);
                const roles = decodedToken.roles || ['ROLE_USER']; // Assurez-vous que les rôles sont là
                
                // 2. Appeler la fonction 'login' du contexte pour sauver le token ET les rôles
                // J'utilise une fonction login qui prend le token et les rôles (voir AuthContext)
                login(token, roles); 
                
                // 3. Rediriger vers la page d'administration après succès
                navigate("/admin", { replace: true });

            } else {
                setError("Réponse du serveur inattendue : token manquant.");
            }
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            setError("Problème de connexion au serveur (réseau ou CORS).");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🔐 Admin Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                        disabled={isLoading} // Désactiver les champs pendant le chargement
                    />

                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                        disabled={isLoading} // Désactiver les champs pendant le chargement
                    />

                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f1f2f6",
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#0984e3",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.3s", // Ajout de transition pour un meilleur UX
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: "10px",
    },
};