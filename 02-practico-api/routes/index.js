module.exports = app => {
    require('./pelicula.routes')(app);
    require('./reparto.routes')(app);
    require('./pelicula_reparto.routes')(app);
}