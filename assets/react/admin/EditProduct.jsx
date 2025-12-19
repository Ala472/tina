import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    features: "",
    notice: "",
    categorie: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* ===========================
     CHARGER LE PRODUIT
  ============================ */
  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          title: data.title ?? "",
          price: data.price ?? "",
          description: data.description ?? "",
          features: data.features ?? "",
          notice: data.notice ?? "",
          categorie: data.categorie?.id ?? "",
        });
      })
      .catch(() => setError("Impossible de charger le produit"));
  }, [id]);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImageFile(e.target.files[0]);
  }

  /* ===========================
     SUBMIT UNIQUE (MULTIPART)
  ============================ */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("features", product.features);
      formData.append("notice", product.notice);
      formData.append("categorie", `/api/categories/${product.categorie}`);

      // 🔥 image optionnelle
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`http://localhost:8000/api/products/${id}/edit`, {
        method: "POST", // 👈 IMPORTANT (pas PUT)
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("BACKEND ERROR:", text);

        if (res.status === 401) {
            localStorage.removeItem("jwt_token");
            throw new Error("Session expirée, reconnectez-vous");
        }

        throw new Error(text || "Erreur mise à jour produit");
        }

      setSuccess(true);
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

          <div className="shadow-lg border-0">
            <div
              className="card-header text-center text-white"
              style={{ backgroundColor: "var(--primary-accent)" }}
            >
              <h4>✏️ Modifier le produit</h4>
            </div>

            <div className="card-body p-4">

              {success && <div className="alert alert-success">✅ Produit mis à jour</div>}
              {error && <div className="alert alert-danger">❌ {error}</div>}

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  placeholder="Titre"
                  required
                />

                <input
                  className="form-control mb-3"
                  type="number"
                  step="0.01"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mb-3"
                  name="features"
                  value={product.features}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                <input
                  className="form-control mb-3"
                  type="number"
                  name="notice"
                  value={product.notice}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-4"
                  type="number"
                  name="categorie"
                  value={product.categorie}
                  onChange={handleChange}
                  required
                />

                <button
                  disabled={loading}
                  className="btn w-100 text-white"
                  style={{ backgroundColor: "var(--dark-brown)" }}
                >
                  {loading ? "Mise à jour..." : "Mettre à jour"}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
