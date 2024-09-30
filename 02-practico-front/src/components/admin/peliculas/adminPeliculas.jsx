import { useEffect, useState } from 'react';
import { fetchPeliculas, deletePelicula } from './peliculasAPI';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import './AdminPeliculas.css';
import Header from '../NavMenu';

const AdminPeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const getPeliculas = async () => {
            try {
                const data = await fetchPeliculas();
                setPeliculas(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getPeliculas();
    }, []);

    const handleEliminar = async (id) => {
        try {
            await deletePelicula(id); 
            setPeliculas(peliculas.filter(pelicula => pelicula.id !== id));
            setSuccessMessage('Película eliminada con éxito');
        } catch {
            setError('Error al eliminar la película');
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">Error: {error}</Alert>;
    
    return (
        <>
            <Header />
            <div className='adminPeliculas'>
                <h1>Dashboard de Películas</h1>
                <Button as={Link} to="/admin/peliculas/crear" className="mb-3">Agregar Película</Button>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Row>
                    {peliculas.map(pelicula => (
                        <Col md={3} key={pelicula.id} className="pelicula-card">
                            <Card className="text-center card-custom">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3000${pelicula.imagen}`}
                                    alt={pelicula.nombre}
                                    className="pelicula-imagen"
                                />
                                <div className="rating-circle">
                                    {pelicula.rt_clasificacion}%
                                </div>
                                <Card.Body>
                                    <Card.Title className="card-title">
                                        <Link to={`/admin/peliculas/${pelicula.id}`} className="link-title">{pelicula.nombre}</Link>
                                    </Card.Title>
                                    <Card.Text className="release-date">
                                        Fecha de Lanzamiento: {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                                    </Card.Text>
                                    <div className="btn-container">
                                        <Button
                                            as={Link}
                                            to={`/admin/peliculas/editar/${pelicula.id}`}
                                            className="btn-editar"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            as={Link}
                                            to={`/admin/agregarActores/${pelicula.id}/actores`} 
                                            className="btn-editar"
                                        >
                                            Agregar Actores
                                        </Button>
                                        <Button variant="danger" onClick={() => handleEliminar(pelicula.id)} className="btn-eliminar">
                                            Eliminar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default AdminPeliculas;
