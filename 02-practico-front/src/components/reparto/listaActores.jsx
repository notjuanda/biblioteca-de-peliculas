import { useEffect, useState } from 'react';
import { fetchActores, deleteActor } from './repartoAPI'; 
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';

const ListaActores = () => {
    const [actores, setActores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getActores = async () => {
            try {
                const data = await fetchActores();
                setActores(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getActores();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteActor(id);
            setActores(actores.filter(actor => actor.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card>
            <Card.Body>
                <Card.Title>Lista de Actores</Card.Title>
                <ListGroup>
                    {actores.map(actor => (
                        <ListGroup.Item key={actor.id}>
                            <Link to={`/reparto/${actor.id}`}>{actor.nombre} {actor.apellido}</Link>
                            <Button variant="danger" onClick={() => handleDelete(actor.id)}>Eliminar</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ListaActores;
