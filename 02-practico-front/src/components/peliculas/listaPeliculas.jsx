import { useEffect, useState } from 'react';
import { fetchPeliculas } from './peliculasAPI';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './ListaPeliculas.css';

const ListaPeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    return (
        <div className='peliculas-container'>
            <h1>Películas</h1>
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
                                    <Link to={`/peliculas/${pelicula.id}`} className="link-title">{pelicula.nombre}</Link>
                                </Card.Title>
                                <Card.Text className="release-date">
                                    Fecha de Lanzamiento: {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ListaPeliculas;
