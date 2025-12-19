import React, { useEffect, useState, useContext } from "react";
// ➡️ Importez votre contexte d'authentification
import { AuthContext } from "../context/AuthContext"; 
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

import "../sass/main.scss";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ➡️ 1. Utiliser le contexte pour vérifier l'état
    const { isAuthenticated } = useContext(AuthContext); 
   
   const handleEdit = async (id) => {
        navigate(`/admin/edit/${id}`);
    }; 
   const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${currentToken}`,
        },
        });

        if (res.status === 401) {
            localStorage.removeItem("jwt_token");
            navigate("/login");
            throw new Error("Session expirée, reconnectez-vous");
        }
        if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
        }

        // Mise à jour immédiate de la liste
        setProducts(prev => prev.filter(product => product.id !== id));

    } catch (err) {
        alert(err.message);
    }
    };
 
    // ➡️ 2. Le token est lu à chaque rendu
  const currentToken = localStorage.getItem("jwt_token");

    useEffect(() => {
        setLoading(true);

      /*  if (!isAuthenticated || !currentToken) {
            console.log("ProductsList: Requête API ignorée car l'authentification est en cours ou token manquant.");
            setLoading(false);
            return;
        }*/

        setError(null);

        fetch("http://localhost:8000/api/products", {})
            .then(res => {
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        throw new Error("Session expirée ou accès non autorisé.");
                    }
                    throw new Error(`Erreur HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProducts(data["hydra:member"] || []);
                console.log("Products chargés.");
            })
            .catch(err => {
                console.error("Erreur de chargement des produits:", err);
                setError(err.message);
            })
            .finally(() => setLoading(false));

    }, [isAuthenticated, currentToken]);

    // Affichage des états
    if (loading) {
        return <div style={{ padding: 20 }}><Loader /></div>;
    }

    if (error) {
        return <div style={{ padding: 20, color: 'red' }}>Erreur : {error}</div>;
    }
    
    const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };
    // Reste du rendu...
    return (
        <>  
            <section className="product">
                <div className="container">
               
                <div className="grid">
                    {products.map((product) => (
                    <div className="card" key={product.id}>
                        <div className="product-tilt-effect">
                            {isAuthenticated && (
                                <div className="d-flex gap-2 position-absolute top-0 end-0 m-3">
                                
                                {/* Supprimer */}
                                <button
                                    className="action-btn btn-delete"
                                    title="Supprimer"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <svg fill="#ffffff" width="20" height="20" viewBox="0 0 48 48">
                                    <path d="M20.5 4A1.5 1.5 0 0 0 19.07 6H14.64c-1.84 0-3.55.92-4.58 2.45L7.7 12H7.5a1.5 1.5 0 1 0 0 3h33a1.5 1.5 0 1 0 0-3h-.2l-2.37-3.55C36.91 6.92 35.2 6 33.36 6h-4.43A1.5 1.5 0 0 0 27.5 4h-7zM9 18l2.15 20.1C11.43 40.89 13.78 43 16.6 43h14.8c2.82 0 5.17-2.11 5.45-4.9L39 18H9z" />
                                    </svg>
                                </button>

                                {/* Modifier */}
                                <button
                                    className="action-btn btn-edit"
                                    title="Modifier"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    <svg fill="#ffffff" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M19.88 7L11 15.83 7 17l1.17-4 8.88-8.88A2.1 2.1 0 1 1 19.88 7z" />
                                    <path d="M3 21h18" />
                                    </svg>
                                </button>

                                </div>
                            )}
                            <div className="product-image">
                                <img
                                src={`http://localhost:8000/uploads/products/${product.image}`}
                                alt={product.title}
                                />
                            </div>
                        </div>
                        
                        <div className="product-info">
                        
                            <h2 
                                className="product-title"
                                title={product.title.length >= 50 ? product.title : null}
                            >{Truncate(product.title, 55)}</h2>

                            <div 
                                className="product-category"
                                title={product.categorie.title.length >= 50 ? product.categorie.title : null}                            
                            >{Truncate(product.categorie.title, 55)}</div>
                            
                            <div className="product-description">
                                <p>{Truncate(product.description, 55)}</p>
                            </div>
                         

                            <div className="product-bottom">
                                <div className="product-price">
                                    <span className="price-was">
                                        {(product.price / 1.2).toFixed(2)} DT
                                    </span>
                                    <span className="price-now">{product.price} DT</span>
                                </div>
                                <button className="product-button">
                                    <span className="button-text">Contactez nous</span>
                                    <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                </button>
                                


                                
                            </div>
                            <div class="product-meta">
                                <div class="product-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="0.5">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <span class="rating-count">128 Reviews</span>
                                </div>
                                <div class="product-stock">In Stock</div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </section>
            </>
    );
}