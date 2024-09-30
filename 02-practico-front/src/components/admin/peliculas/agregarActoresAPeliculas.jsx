import { useEffect, useState } from 'react';
import { fetchActoresDisponibles, agregarActoresAPelicula } from './peliculasAPI'; 
import { Form, Alert, Button, Image } from 'react-bootstrap'; 
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../NavMenu';

const AgregarActoresAPelicula = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [actores, setActores] = useState([]); 
    const [selectedActores, setSelectedActores] = useState({});
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const obtenerActores = async () => {
            try {
                const data = await fetchActoresDisponibles(id); 
                setActores(data);
            } catch  {
                setError('Error al obtener actores disponibles');
            }
        };

        obtenerActores();
    }, [id]);

    const handleActorSelect = (actorId) => {
        setSelectedActores((prevState) => ({
            ...prevState,
            [actorId]: prevState[actorId] ? { 
                ...prevState[actorId], 
                selected: !prevState[actorId].selected } : { selected: true, rol: '' }
        }));
    };

    const handleRoleChange = (actorId, role) => {
        setSelectedActores((prevState) => ({
            ...prevState,
            [actorId]: {
                ...prevState[actorId],
                rol: role
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actoresConRoles = Object.keys(selectedActores)
            .filter(actorId => selectedActores[actorId].selected)
            .map(actorId => ({
                id_reparto: actorId,
                rol: selectedActores[actorId].rol || 'Actor'
            }));

        if (actoresConRoles.length === 0) {
            setError('Debes seleccionar al menos un actor.');
            return;
        }

        try {
            await agregarActoresAPelicula(id, actoresConRoles);
            setSuccessMessage('Actores agregados exitosamente');
            setSelectedActores({});
            setTimeout(() => {
                navigate(`/admin/peliculas/${id}`);
            }, 2000);
        } catch {
            setError('Error al agregar actores');
        }
    };

    return (
        <>
            <Header />
            <div>
                <h1>Agregar Actores a la Película</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {Array.isArray(actores) && actores.map(actor => (
                        <div key={actor.id} className="actor-container" style={{ marginBottom: '20px' }}>
                            <Image
                                src={`http://localhost:3000${actor.imagen}`} 
                                alt={`${actor.nombre} ${actor.apellido}`}
                                rounded
                                style={{ width: '100px', height: '100px', marginRight: '15px' }} 
                            />
                            <Form.Check
                                type="checkbox"
                                label={`${actor.nombre} ${actor.apellido}`}
                                checked={selectedActores[actor.id]?.selected || false}
                                onChange={() => handleActorSelect(actor.id)}
                            />
                            {selectedActores[actor.id]?.selected && (
                                <Form.Select
                                    onChange={(e) => handleRoleChange(actor.id, e.target.value)}
                                    value={selectedActores[actor.id]?.rol || ''}
                                    style={{ marginTop: '5px' }}
                                >
                                    <option value="">Seleccionar tipo de actor</option>
                                    <option value="0">Actor</option>
                                    <option value="1">Director</option>
                                    <option value="2">Ambos</option>
                                </Form.Select>
                            )}
                        </div>
                    ))}
                    <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
                        Agregar Actores
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default AgregarActoresAPelicula;
