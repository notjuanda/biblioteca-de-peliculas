import axios from "axios";

const API_URL = 'http://localhost:3000/peliculas';

export const fetchPeliculas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchPeliculaById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPelicula = async (pelicula) => {
    const response = await axios.post(API_URL, pelicula);
    return response.data;
};

export const updatePelicula = async (id, pelicula) => {
    const response = await axios.put(`${API_URL}/${id}`, pelicula);
    return response.data;
};

export const deletePelicula = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const fetchPeliculasPorActor = async (id) => {
    const response = await axios.get(`http://localhost:3000/reparto/${id}/peliculas`);
    console.log("Datos recibidos:", response);  
    return response.data;
};
