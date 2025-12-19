import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        features: "",
        notice: "",
        categorie: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const currentToken = localStorage.getItem("jwt_token");

    const handleChange = e => setProduct({ ...product, [e.target.name]: e.target.value });
    const handleImage = e => setImageFile(e.target.files[0]);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!product.categorie || isNaN(parseInt(product.categorie))) {
            setError("L'ID Catégorie est requis et doit être un nombre.");
            setLoading(false);
            return;
        }

        try {
            if (!currentToken) throw new Error("Authentification manquante.");

            const formData = new FormData();
            formData.append("title", product.title);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("features", product.features);
            formData.append("notice", product.notice);
            formData.append("categorie", `/api/categories/${product.categorie}`);
            if (imageFile) formData.append("image", imageFile);

            const response = await fetch("http://localhost:8000/api/products", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    // ❌ Pas de Content-Type ici
                },
                body: formData,
            });

            if (!response.ok) {
                let content;
                try {
                    content = await response.json();
                } catch {
                    throw new Error(`Erreur serveur ${response.status}`);
                }

                let msg = content["hydra:description"] || content.detail || "Erreur inconnue";
                if (content.violations) {
                    msg += " : " + content.violations.map(v => `[${v.propertyPath}] ${v.message}`).join(" | ");
                }
                throw new Error(msg);
            }

            setSuccess(true);
            setProduct({ title: "", price: "", description: "", features: "", notice: "", categorie: "" });
            setImageFile(null);
            setTimeout(() => navigate("/admin"), 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="shadow-lg border-1">
                        <div className="card-header text-center text-white" style={{ backgroundColor: "var(--primary-accent)" }}>
                            <h4 className="mb-0">🆕 Ajouter un produit</h4>
                        </div>
                        <div className="card-body p-4">
                            {success && <div className="alert alert-success">✅ Produit ajouté avec succès !</div>}
                            {error && <div className="alert alert-danger">❌ <strong>Erreur :</strong> {error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Titre</label>
                                    <input type="text" name="title" className="form-control" value={product.title} onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Prix</label>
                                    <input type="number" step="0.01" name="price" className="form-control" value={product.price} onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea name="description" className="form-control" rows="3" value={product.description} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Caractéristiques</label>
                                    <textarea name="features" className="form-control" rows="3" value={product.features} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" name="image" className="form-control" accept="image/*" onChange={handleImage}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Notice</label>
                                    <input type="number" name="notice" className="form-control" value={product.notice} onChange={handleChange}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">ID Catégorie</label>
                                    <input type="number" name="categorie" className="form-control" placeholder="ex: 4" value={product.categorie} onChange={handleChange} required/>
                                </div>
                                <button type="submit" disabled={loading} className="btn w-100 text-white" style={{ backgroundColor: "var(--dark-brown)", border: "none" }}>
                                    {loading ? "Enregistrement..." : "Créer le produit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
