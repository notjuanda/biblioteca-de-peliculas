module.exports = app => {
    const peliculaRepartoController = require("../controllers/pelicula_reparto.controller.js");
    let router = require("express").Router();

    router.post('/:peliculaId/actores', peliculaRepartoController.agregarActoresAPelicula);
    router.get('/:peliculaId/actores', peliculaRepartoController.listaActoresDisponibles);
    router.delete('/:peliculaId/actores/:actorId', peliculaRepartoController.eliminarActorDePelicula);

    app.use('/agregarActores', router);
}
