import React, { useEffect, useState } from "react";
import { getSlides, createSlide, updateSlide, deleteSlide } from "../services/slideService";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";

export default function SlideAdmin() {
    const [slides, setSlides] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", imageUrl: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = () => {
        getSlides().then(res => setSlides(res.data));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateSlide(editId, form);
        } else {
            await createSlide(form);
        }
        setForm({ title: "", description: "", imageUrl: "" });
        setEditId(null);
        fetchSlides();
    };

    const handleEdit = (slide) => {
        setForm({ title: slide.title, description: slide.description, imageUrl: slide.imageUrl });
        setEditId(slide.id);
    };

    const handleDelete = async (id) => {
        await deleteSlide(id);
        fetchSlides();
    };

    return (
        <>
            <SectionHeader
                    title="Gestion des slides"
                    subtitle="Une question ? Notre équipe vous répond rapidement"
            />
            <div className="p-5">
                <div className="card-body">
                
                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="row g-3 mb-4">
                    <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Titre"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    </div>
                    <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />
                    </div>
                    <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL image"
                        value={form.imageUrl}
                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                        required
                    />
                    </div>
                    <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">
                        {editId ? "Modifier" : "Ajouter"}
                    </button>
                    </div>
                </form>

                {/* Liste des slides */}
                <div className="list-group">
                    {slides.map(slide => (
                    <div key={slide.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
                        <div className="me-3">
                        <h5>{slide.title}</h5>
                        <p className="mb-1">{slide.description}</p>
                        <img src={slide.imageUrl} alt={slide.title} className="img-thumbnail" style={{ maxWidth: '150px' }} />
                        </div>
                        <div className="btn-group mt-2 mt-md-0">
                        <button className="btn btn-warning" onClick={() => handleEdit(slide)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(slide.id)}>Delete</button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </>

    );
}
