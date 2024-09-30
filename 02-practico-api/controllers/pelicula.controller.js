const db = require("../models");
const { enviarError500 } = require("../utils/peticion.utils");

exports.listaPeliculas = async (req, res) => {
    try {
        const peliculas = await db.Pelicula.findAll({
            order: [
                ['rt_clasificacion', 'DESC']
            ]
        });
        res.json(peliculas);
    } catch (error) {
        enviarError500(res, error);  
    }
};

exports.mostrarPeliculaPorID = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await db.Pelicula.findByPk(id, {
            include: [{
            model: db.Reparto,
            as: 'Repartos',
            through: { attributes: ['rol'] } 
            }]
        });
        
        if (!pelicula) {
            res.status(404).json({ msg: 'Pelicula no encontrada' });
            return;
        }

        res.json(pelicula);
    } catch (error) {
        enviarError500(res, error);
    }
};

exports.crearPelicula = async (req, res) => {
    try {
        const { nombre, sinopsis, fecha_lanzamiento, rt_clasificacion, trailer } = req.body;
        console.log("Datos recibidos para crear película:", {
            nombre,
            sinopsis,
            fecha_lanzamiento,
            rt_clasificacion,
            trailer,
        });
        const nuevaPelicula = await db.Pelicula.create({
            nombre,
            sinopsis,
            fecha_lanzamiento,
            rt_clasificacion,
            trailer
        });
        console.log("Película creada con ID:", nuevaPelicula.id);
        const imagenUrl = await subirImagenPelicula(req, nuevaPelicula.id);
        console.log("URL de imagen devuelta:", imagenUrl);
        if (imagenUrl) {
            await nuevaPelicula.update({ imagen: imagenUrl });
            console.log("Imagen actualizada en la película:", imagenUrl);
        }
        res.status(201).json({ msg: 'Película creada exitosamente', pelicula: nuevaPelicula });
    } catch (error) {
        console.error('Error al crear la película:', error);
        enviarError500(res, error);
    }
};

exports.actualizarPelicula = async (req, res) => {
    const id = req.params.id;
    const { nombre, sinopsis, fecha_lanzamiento, rt_clasificacion, trailer } = req.body;
    try {
        await db.Pelicula.update(
            { nombre, sinopsis, fecha_lanzamiento, rt_clasificacion, trailer },
            { where: { id: id } }
        );
        const imagenUrl = await subirImagenPelicula(req, id);
        if (imagenUrl) {
            await db.Pelicula.update({ imagen: imagenUrl }, { where: { id: id } });
        }
        res.json({ msg: 'Película actualizada exitosamente' });
    } catch (error) {
        enviarError500(res, error);
    }
};


exports.actualizarPelicula = async (req, res) => {
    const id = req.params.id;
    const { nombre, sinopsis, fecha_lanzamiento, rt_clasificacion, trailer } = req.body;
    try {
        await db.Pelicula.update(
            { nombre, sinopsis, fecha_lanzamiento, rt_clasificacion, trailer },
            { where: { id: id } }
        );
        const imagenUrl = await subirImagenPelicula(req, res, id);
        if (imagenUrl) {
            await db.Pelicula.update({ imagen: imagenUrl }, { where: { id: id } });
        }
        res.json({ msg: 'Película actualizada exitosamente' });
    } catch (error) {
        enviarError500(res, error);
    }
};

exports.eliminarPelicula = async (req, res) => {
    const id = req.params.id;
    try {
        await db.Pelicula.destroy({ where: { id: id } });
        res.json({ msg: 'Película eliminada exitosamente' });
    } catch (error) {
        enviarError500(res, error);
    }
}

const subirImagenPelicula = (req, idPelicula) => {
    return new Promise((resolve, reject) => {
        if (!req.files?.imagen) {
            console.log("No se recibió ninguna imagen."); 
            resolve(null); 
            return;
        }
        const imagen = req.files.imagen;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(imagen.mimetype)) {
            reject({ msg: 'Formato de imagen no válido, solo se permiten JPG, PNG o WEBP' });
            return;
        }
        const imagePath = __dirname + '/../public/images/peliculas/' + idPelicula + '.jpg';
        imagen.mv(imagePath, function (err) {
            if (err) {
                console.error("Error al mover la imagen:", err); 
                reject({ msg: 'Error al subir la imagen', error: err });
            } else {
                const imagenUrl = '/images/peliculas/' + idPelicula + '.jpg';
                console.log("Imagen subida correctamente, URL:", imagenUrl);
                resolve(imagenUrl); 
            }
        });
    });
};
