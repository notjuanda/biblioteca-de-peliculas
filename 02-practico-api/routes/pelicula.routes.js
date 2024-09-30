module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pelicula.controller.js");

    router.get('/', controller.listaPeliculas);
    router.post('/', controller.crearPelicula);
    router.put('/:id', controller.actualizarPelicula);
    router.delete('/:id', controller.eliminarPelicula);
    router.get('/:id', controller.mostrarPeliculaPorID);

    app.use('/peliculas', router);
}