import { useState, useEffect } from 'react';
import { createActor, updateActor, fetchActorById } from './repartoAPI'; 
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './AgregarActor.css';
import Header from '../NavMenu';

const CrearOEditarActor = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            const obtenerActor = async () => {
                try {
                    const actor = await fetchActorById(id);
                    setNombre(actor.nombre); 
                    setApellido(actor.apellido); 
                } catch {
                    setError('Error al cargar los datos del actor.');
                }
            };
            obtenerActor();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido) {
            setError('El nombre y apellido son obligatorios.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            if (id) {
                await updateActor(id, { nombre, apellido, imagen });
                setSuccessMessage('Actor actualizado exitosamente');
            } else {
                await createActor(formData);
                setSuccessMessage('Actor creado exitosamente');
            }

            navigate('/admin/actores');
        } catch {
            setError('Error al procesar la solicitud.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log('Tipo de archivo seleccionado:', file.type);
        }

        if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setImagen(file);
        } else {
            setError('Formato de imagen no válido. Solo se permiten archivos JPEG, PNG o WEBP.');
        }
    };

    return (
        <>
            <Header />
            <div className="crear-actor-container">
                <h1>{id ? 'Editar Actor' : 'Agregar Nuevo Actor'}</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="imagen">
                        <Form.Label>Subir Imagen</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
                        {id ? 'Actualizar Actor' : 'Crear Actor'}
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default CrearOEditarActor;
