const db = require("../models");
const { enviarError500 } = require("../utils/peticion.utils");

exports.listaPeliculasPorActor = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await db.Reparto.findByPk(id, {
            include: [{
                model: db.Pelicula,
                as: 'Peliculas',
                through: { attributes: [] }
            }]
        });
        if (!actor) {
            res.status(404).json({ msg: 'Actor no encontrado' });
            return;
        }
        res.json(actor);
    } catch (error) {
        enviarError500(res, error);
    }
}

exports.listaActores = async (req, res) => {
    try {
        const actores = await db.Reparto.findAll({
            order: [
                ['nombre', 'ASC']
            ]
        });
        res.json(actores);
    } catch (error) {
        enviarError500(res, error);
    }
}

exports.listaActoresPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const actor = await db.Reparto.findByPk(id);
        if (!actor) {
            res.status(404).json({ msg: 'Actor no encontrado' });
            return;
        }
        res.json(actor);
    } catch (error) {
        enviarError500(res, error);
    }
}

exports.crearActor = async (req, res) => {
    try {
        const { nombre, apellido } = req.body; 
        const nuevoActor = await db.Reparto.create({
            nombre,
            apellido
        });
        const imagenUrl = await subirImagenActor(req, res, nuevoActor.id);
        if (imagenUrl) {
            await nuevoActor.update({ imagen: imagenUrl });
        }
        res.status(201).json({ msg: 'Actor creado exitosamente', actor: nuevoActor });
    } catch (error) {
        console.error('Error al crear el actor', error);
        enviarError500(res, error);
    }
};

exports.actualizarActor = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido } = req.body; 
    try {
        await db.Reparto.update(
            { nombre, apellido },
            { where: { id: id } }
        );
        const imagenUrl = await subirImagenActor(req, res, id);
        if (imagenUrl) {
            await db.Reparto.update({ imagen: imagenUrl }, { where: { id: id } });
        }
        res.json({ msg: 'Actor actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el actor', error);
        enviarError500(res, error);
    }
};

exports.eliminarActor = async (req, res) => {
    const id = req.params.id;
    try {
        const resultado = await db.Reparto.destroy({
            where: { id: id }
        });
        if (resultado == 0) {
            res.status(404).json({ msg: 'Actor no encontrado' });
            return;
        }
        res.json({ msg: 'Actor eliminado' });
    } catch (error) {
        enviarError500(res, error);
    }
}

const subirImagenActor = (req, res, idActor) => {
    return new Promise((resolve, reject) => {
        if (!req.files?.imagen) {
            resolve(null);
            return;
        }
        const imagen = req.files.imagen;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(imagen.mimetype)) {
            reject({ msg: 'Formato de imagen no válido, solo se permiten JPG, PNG o WEBP' });
            return;
        }
        const imagePath = __dirname + '/../public/images/repartos/' + idActor + '.jpg';
        imagen.mv(imagePath, function (err) {
            if (err) {
                reject({ msg: 'Error al subir la imagen', error: err });
            } else {
                const imagenUrl = '/images/repartos/' + idActor + '.jpg'; 
                resolve(imagenUrl);
            }
        });
    });
};
