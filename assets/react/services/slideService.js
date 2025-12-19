// src/services/slideService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/slides";

export const getSlides = () => axios.get(API_URL);
export const getSlide = (id) => axios.get(`${API_URL}/${id}`);
export const createSlide = (slide) => axios.post(API_URL, slide);
export const updateSlide = (id, slide) => axios.put(`${API_URL}/${id}`, slide);
export const deleteSlide = (id) => axios.delete(`${API_URL}/${id}`);
