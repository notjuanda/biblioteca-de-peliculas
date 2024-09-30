import axios from "axios";

const API_URL = 'http://localhost:3000/reparto'; 

export const fetchActores = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createActor = async (actor) => {
    const response = await axios.post(API_URL, actor);
    return response.data;
};

export const updateActor = async (id, actor) => {
    const response = await axios.put(`${API_URL}/${id}`, actor);
    return response.data;
};

export const deleteActor = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
