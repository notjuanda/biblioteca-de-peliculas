const db = require("../models");
const { Op } = require("sequelize"); // Importa Op de sequelize
const { enviarError500 } = require("../utils/peticion.utils");

exports.agregarActoresAPelicula = async (req, res) => {
    const { peliculaId } = req.params;
    const { actores } = req.body;
    try {
        const pelicula = await db.Pelicula.findByPk(peliculaId);
        if (!pelicula) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        if (actores && actores.length > 0) {
            for (const actor of actores) {
                const { id_reparto, rol } = actor; 
                await pelicula.addRepartos(id_reparto, { through: { rol } });
            }
        }

        res.json({ msg: 'Actores añadidos a la película exitosamente' });
    } catch (error) {
        enviarError500(res, error);
    }
};

exports.listaActoresDisponibles = async (req, res) => {
    const { peliculaId } = req.params;

    try {
        const pelicula = await db.Pelicula.findByPk(peliculaId);
        if (!pelicula) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        const actoresAsociados = await pelicula.getRepartos({ attributes: ['id'] });
        const actoresAsociadosIds = actoresAsociados.map(actor => actor.id);

        // Usar Op.not para excluir los actores ya asociados a la película
        const actoresDisponibles = await db.Reparto.findAll({
            where: {
                id: {
                    [Op.not]: actoresAsociadosIds
                }
            },
            order: [['nombre', 'ASC']]
        });

        res.json(actoresDisponibles);
    } catch (error) {
        enviarError500(res, error);
    }
};

exports.eliminarActorDePelicula = async (req, res) => {
    const { peliculaId, actorId } = req.params;

    try {
        const pelicula = await db.Pelicula.findByPk(peliculaId);
        if (!pelicula) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        await pelicula.removeReparto(actorId);

        res.json({ msg: 'Actor eliminado de la película exitosamente' });
    } catch (error) {
        enviarError500(res, error);
    }
};
