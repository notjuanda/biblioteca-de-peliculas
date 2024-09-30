import axios from "axios";

const API_URL = 'http://localhost:3000/reparto'; 

export const fetchActores = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createActor = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en la creación del actor:', error);
        throw error;
    }
};

export const updateActor = async (id, actorData) => {
    try {
        const formData = new FormData();
        formData.append('nombre', actorData.nombre || '');  
        formData.append('apellido', actorData.apellido || ''); 

        if (actorData.imagen) {
            formData.append('imagen', actorData.imagen);  
        }
        console.log("FormData enviado:", {
            nombre: actorData.nombre,
            apellido: actorData.apellido,
            imagen: actorData.imagen ? actorData.imagen.name : 'Sin imagen'
        });

        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el actor:', error);
        throw error;
    }
};

export const deleteActor = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const fetchPeliculasPorActor = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/peliculas`);
    return response.data;
};

export const fetchActorById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

