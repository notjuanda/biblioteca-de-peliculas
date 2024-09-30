import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPeliculasPorActor } from './peliculasAPI';  
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../NavMenu';
import './DetalleActor.css';  

const PeliculasPorActor = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerPeliculas = async () => {
            try {
                const data = await fetchPeliculasPorActor(id);
                console.log('Datos obtenidos del actor:', data); 
                setActor(data);
            } catch {
                setError('Error al cargar las películas del actor');
            }
        };

        obtenerPeliculas();
    }, [id]);

    if (!actor) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <>
            <Header />
            <Container className="peliculas-actor-container">
                {error && <p className="error-message">{error}</p>}
                <Row className="actor-info">
                    <Col md={4}>
                        <img 
                            src={`http://localhost:3000${actor.imagen}`} 
                            alt={`${actor.nombre} ${actor.apellido}`} 
                            className="actor-imagen"
                        />
                    </Col>
                    <Col md={8} className="actor-details">
                        <h1 className="actor-name">{actor.nombre} {actor.apellido}</h1>
                        <p className="actor-bio">Conocido por sus destacadas interpretaciones, {actor.nombre} ha participado en las siguientes películas:</p>
                    </Col>
                </Row>

                {/* Películas */}
                <h3 className="peliculas-header">Películas destacadas</h3>
                <Row className="peliculas-grid">
                    {actor.Peliculas && actor.Peliculas.length > 0 ? (
                        actor.Peliculas.map((pelicula) => (
                            <Col md={4} key={pelicula.id}>
                                <Card className="pelicula-card">
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://localhost:3000${pelicula.imagen}`} 
                                        alt={pelicula.nombre} 
                                    />
                                    <Card.Body>
                                        <Card.Title className="pelicula-titulo">{pelicula.nombre}</Card.Title>
                                        <Card.Text className="pelicula-detalles">
                                            <strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}<br />
                                            <strong>Puntuación:</strong> {pelicula.rt_clasificacion}%
                                        </Card.Text>
                                        <Button as={Link} to={`/peliculas/${pelicula.id}`} variant="info" className="ver-detalles-btn">
                                            Ver detalles
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="no-peliculas-msg">Este actor no tiene películas asociadas.</p>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default PeliculasPorActor;
