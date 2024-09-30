import { useEffect, useState } from 'react';
import { createPelicula, updatePelicula, fetchPeliculaById } from './peliculasAPI';
import { Button, Form, Alert, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './AgregarPelicula.css';
import Header from '../NavMenu';

const AgregarPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [rtClasificacion, setRtClasificacion] = useState('');
    const [trailer, setTrailer] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenActual, setImagenActual] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            const obtenerPelicula = async () => {
                try {
                    const peliculaData = await fetchPeliculaById(id);
                    setNombre(peliculaData.nombre || '');
                    setSinopsis(peliculaData.sinopsis || '');
                    setFechaLanzamiento(peliculaData.fecha_lanzamiento ? peliculaData.fecha_lanzamiento.split('T')[0] : '');
                    setRtClasificacion(peliculaData.rt_clasificacion || '');
                    setTrailer(peliculaData.trailer || '');
                    setImagenActual(peliculaData.imagen);
                } catch (error) {
                    console.error("Error al obtener la película:", error);
                }
            };

            obtenerPelicula();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rtClasificacion < 1 || rtClasificacion > 100) {
            setError('La puntuación debe estar entre 1 y 100.');
            return;
        }

        const peliculaData = {
            nombre,
            sinopsis,
            fecha_lanzamiento: fechaLanzamiento,
            rt_clasificacion: rtClasificacion,
            trailer,
            imagen: imagen || imagenActual 
        };

        try {
            if (id) {
                await updatePelicula(id, peliculaData);
                setSuccessMessage('Película actualizada exitosamente');
            } else {
                await createPelicula(peliculaData);
                setSuccessMessage('Película creada exitosamente');
            }
            
            navigate('/admin');
            window.location.reload();
            setNombre('');
            setSinopsis('');
            setFechaLanzamiento('');
            setRtClasificacion('');
            setTrailer('');
            setImagen(null);
            setImagenActual('');
        } catch {
            setError('Error al guardar la película');
        }
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    return (
        <>
            <Header />
            <h1>{id ? 'Editar Película' : 'Agregar Película'}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="sinopsis">
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control as="textarea" rows={3} value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="fechaLanzamiento">
                    <Form.Label>Fecha de Lanzamiento</Form.Label>
                    <Form.Control type="date" value={fechaLanzamiento} onChange={(e) => setFechaLanzamiento(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="rtClasificacion">
                    <Form.Label>Puntuación</Form.Label>
                    <Form.Control type="number" value={rtClasificacion} onChange={(e) => setRtClasificacion(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="trailer">
                    <Form.Label>Trailer</Form.Label>
                    <Form.Control type="text" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="imagen">
                    <Form.Label>Seleccionar Imagen</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                {imagenActual && (
                    <div>
                        <Form.Label>Imagen Actual</Form.Label>
                        <Image src={`http://localhost:3000${imagenActual}`} alt="Imagen actual" thumbnail />
                    </div>
                )}
                <Button variant="primary" type="submit">{id ? 'Actualizar Película' : 'Agregar Película'}</Button>
            </Form>
        </>
    );
};

export default AgregarPelicula;
