module.exports = app => { 
    let router = require("express").Router();
    const controller = require("../controllers/reparto.controller.js");
    
    router.get('/:id/peliculas', controller.listaPeliculasPorActor);
    router.get('/:id', controller.listaActoresPorId);
    router.get('/', controller.listaActores);
    router.post('/', controller.crearActor);
    router.put('/:id', controller.actualizarActor);
    router.delete('/:id', controller.eliminarActor);

    app.use('/reparto', router);
}