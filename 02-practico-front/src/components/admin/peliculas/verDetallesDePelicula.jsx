import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPeliculaById, deleteActorDePelicula } from './peliculasAPI';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './VerDetallesDePelicula.css';
import Header from '../NavMenu';

const VerDetallesPelicula = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerPelicula = async () => {
            try {
                const data = await fetchPeliculaById(id);
                setPelicula(data);
            } catch {
                setError('Error al cargar los detalles de la película');
            }
        };

        obtenerPelicula();
    }, [id]);

    const handleEliminarActor = async (actorId) => {
        try {
            await deleteActorDePelicula(id, actorId);
            setPelicula({
                ...pelicula,
                Repartos: pelicula.Repartos.filter(actor => actor.id !== actorId),
            });
        } catch {
            setError('Error al eliminar actor de la película.');
        }
    };

    if (!pelicula) {
        return <div>Cargando...</div>;
    }

    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        return ampersandPosition !== -1
            ? videoId.substring(0, ampersandPosition)
            : videoId;
    };

    const obtenerRol = (rol) => {
        if (rol === 0) return '(Actor)';
        if (rol === 1) return '(Director)';
        if (rol === 2) return '(Actor y Director)';
        return '';
    };

    return (
        <>
            <Header />
            <Container className="detalles-pelicula-container">
                {error && <p className="error-message">{error}</p>}
                <Row>
                    <Col md={4}>
                        <img
                            src={`http://localhost:3000${pelicula.imagen}`}
                            alt={pelicula.nombre}
                            className="poster-pelicula"
                        />
                    </Col>
                    <Col md={8}>
                        <h1>{pelicula.nombre}</h1>
                        <p>
                            <strong>Fecha de lanzamiento:</strong>{' '}
                            {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Puntuación:</strong> {pelicula.rt_clasificacion}%
                        </p>
                        <p>
                            <strong>Sinopsis:</strong> {pelicula.sinopsis}
                        </p>
                    </Col>
                </Row>

                {pelicula.trailer && (
                    <Row className="trailer-section">
                        <Col>
                            <h3>Trailer</h3>
                            <iframe
                                width="100%"
                                height="400px"
                                src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(
                                    pelicula.trailer
                                )}`}
                                title="YouTube trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col>
                        <h3>Reparto principal</h3>
                        <div className="actores-grids">
                            {pelicula.Repartos.map((actor) => (
                                <div
                                    key={actor.id}
                                    className={`actor-cards ${
                                        actor.Pelicula_Reparto.rol === 1 || actor.Pelicula_Reparto.rol === 2 ? 'director-cards' : ''
                                    }`}
                                >
                                    <img
                                        src={`http://localhost:3000${actor.imagen}`}
                                        alt={`${actor.nombre} ${actor.apellido}`}
                                        className="actor-imagens"
                                    />
                                    <h5>
                                        {actor.nombre} {actor.apellido} {obtenerRol(actor.Pelicula_Reparto.rol)}
                                    </h5>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleEliminarActor(actor.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default VerDetallesPelicula;
