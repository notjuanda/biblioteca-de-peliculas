import { useEffect, useState } from 'react';
import { fetchActores, deleteActor } from './repartoAPI'; 
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import './AdminActores.css';
import Header from '../NavMenu';

const AdminActores = () => {
    const [actores, setActores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const getActores = async () => {
            try {
                const data = await fetchActores();
                setActores(data);
            } catch {
                setError('Error al obtener la lista de actores.');
            } finally {
                setLoading(false);
            }
        };

        getActores();
    }, []);

    const handleEliminar = async (id) => {
        try {
            await deleteActor(id); 
            setActores(actores.filter(actor => actor.id !== id));
            setSuccessMessage('Actor eliminado con éxito.');
        } catch {
            setError('Error al eliminar el actor.');
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Header />
            <div className='admin-actores'>
                <h1>Administrar Actores</h1>
                <Button as={Link} to="/admin/actores/crear" className="mb-3">Agregar Actor</Button>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Row>
                    {actores.map(actor => (
                        <Col md={3} key={actor.id} className="actor-card">
                            <Card className="text-center card-custom">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:3000${actor.imagen}`}
                                    alt={`${actor.nombre} ${actor.apellido}`}
                                    className="actor-imagen"
                                />
                                <Card.Body>
                                    <Card.Title className="card-title">
                                        {`${actor.nombre} ${actor.apellido}`}
                                    </Card.Title>
                                    <div className="btn-container">
                                        <Button
                                            as={Link}
                                            to={`/admin/actores/editar/${actor.id}`}
                                            className="btn-editar"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleEliminar(actor.id)}
                                            className="btn-eliminar"
                                        >
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

export default AdminActores;
