
import { createRoot } from "react-dom/client";
 // Import the main App component
import "./styles/slider.css";      // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/app.css"; 
import App from "./app";  
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")).render(
    <HelmetProvider>
    <App />
  </HelmetProvider>
);
