// src/App.jsx (Version corrigée)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact"
import AppAdmin from "./admin/AppAdmin";
import CreateProduct from "./admin/CreateProduct";
import RequireAuth from "./router/RequireAuth";
import Layout from "./components/Layout";

// ➡️ AJOUTEZ CET IMPORT : Le fournisseur du contexte d'authentification
import { AuthProvider } from "./context/AuthContext"; 
import Product from "./pages/Product";
import EditProduct from "./admin/EditProduct";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import SlideAdmin from "./admin/SlideAdmin";


export default function App() {

    useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out",
      });
    }, []);
    return (
        <Router>
            {/* ➡️ CORRECTION : Enveloppez toutes les Routes dans l'AuthProvider. */}
            {/* C'est ce qui rend les fonctions 'login', 'logout', 'isAuthenticated', etc., disponibles via useContext. */}
            <AuthProvider> 
                <Routes>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/admin" 
                        element={
                            <RequireAuth requiredRole="ROLE_ADMIN">
                              <Layout>
                                <AppAdmin />
                              </Layout>
                            </RequireAuth>
                        } 
                    />
                    <Route 
                        path="/product" 
                        element={
                              <Layout>
                                <Product />
                              </Layout>
                        } 
                    />
                    <Route 
                        path="/admin/create" 
                        element={
                            <RequireAuth requiredRole="ROLE_ADMIN">
                              <Layout>
                                <CreateProduct />
                              </Layout>
                            </RequireAuth>
                        } 
                    />
                    <Route 
                        path="/admin/slide" 
                        element={
                            <RequireAuth requiredRole="ROLE_ADMIN">
                              <Layout>
                                <SlideAdmin />
                              </Layout>
                            </RequireAuth>
                        } 
                    />
                    

                    <Route 
                        path="/admin/edit/:id" 
                        element={
                            <RequireAuth requiredRole="ROLE_ADMIN">
                              <Layout>
                                <EditProduct />
                              </Layout>
                            </RequireAuth>
                        } 
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}