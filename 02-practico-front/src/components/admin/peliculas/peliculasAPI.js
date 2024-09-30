import axios from "axios";

const API_URL = 'http://localhost:3000/peliculas';

export const fetchPeliculas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchPeliculaById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export const createPelicula = async (peliculaData) => {
    const formData = new FormData();
    
    formData.append('nombre', peliculaData.nombre);
    formData.append('sinopsis', peliculaData.sinopsis);
    formData.append('fecha_lanzamiento', peliculaData.fecha_lanzamiento);
    formData.append('rt_clasificacion', peliculaData.rt_clasificacion);
    formData.append('trailer', peliculaData.trailer);
    formData.append('imagen', peliculaData.imagen); 
    const response = await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updatePelicula = async (id, peliculaData) => {
    const formData = new FormData();
    
    formData.append('nombre', peliculaData.nombre);
    formData.append('sinopsis', peliculaData.sinopsis);
    formData.append('fecha_lanzamiento', peliculaData.fecha_lanzamiento);
    formData.append('rt_clasificacion', peliculaData.rt_clasificacion);
    formData.append('trailer', peliculaData.trailer);
    
    if (peliculaData.imagen) { 
        formData.append('imagen', peliculaData.imagen);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deletePelicula = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const fetchActoresDisponibles = async (peliculaId) => {
    const response = await axios.get(`http://localhost:3000/agregarActores/${peliculaId}/actores`);
    return response.data;
};

export const agregarActoresAPelicula = async (peliculaId, actores) => {
    const response = await axios.post(`http://localhost:3000/agregarActores/${peliculaId}/actores`, { actores });
    return response.data;
};

export const deleteActorDePelicula = async (peliculaId, actorId) => {
    const response = await axios.delete(`http://localhost:3000/agregarActores/${peliculaId}/actores/${actorId}`);
    return response.data;
}

