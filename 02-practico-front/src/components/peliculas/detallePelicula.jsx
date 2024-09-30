import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPeliculaById, fetchPeliculasPorActor } from './peliculasAPI';  
import { Container, Row, Col } from 'react-bootstrap';
import './DetallePelicula.css';
import Header from '../NavMenu';

const VerDetallesPeliculaUsuario = () => {
    const { id } = useParams();  // Obtener el ID de la película desde los parámetros de la URL
    const [pelicula, setPelicula] = useState(null);
    const [error, setError] = useState(null);
    const [peliculasPorActor, setPeliculasPorActor] = useState({});

    // Obtener detalles de la película
    useEffect(() => {
        const obtenerPelicula = async () => {
            try {
                const data = await fetchPeliculaById(id);
                setPelicula(data);

                // Cargar las películas de los actores asociados solo si no están en caché
                const peliculasDeActores = await Promise.all(
                    data.Repartos.map(async (actor) => {
                        if (!peliculasPorActor[actor.id]) {
                            const peliculas = await fetchPeliculasPorActor(actor.id);
                            return { id: actor.id, peliculas: peliculas.Peliculas };
                        }
                        return null;
                    })
                );

                // Actualizar el estado solo con los actores que no estaban en caché
                const newPeliculasActorMap = peliculasDeActores.reduce((acc, result) => {
                    if (result) {
                        acc[result.id] = result.peliculas;
                    }
                    return acc;
                }, {});

                setPeliculasPorActor(prevState => ({ ...prevState, ...newPeliculasActorMap }));

            } catch {
                setError('Error al cargar los detalles de la película');
            }
        };

        obtenerPelicula();
    }, [id, peliculasPorActor]);

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
                                    {/* Link al detalle del actor y sus películas */}
                                    <Link to={`/actores/${actor.id}/peliculas`} className="ver-peliculas-link">
                                        Ver películas de {actor.nombre} {actor.apellido}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
    
};

export default VerDetallesPeliculaUsuario;
