module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("Pelicula", {
        nombre: {
            type: Sequelize.STRING
        },
        sinopsis:{
            type: Sequelize.TEXT
        },
        imagen: {
            type: Sequelize.STRING
        },
        fecha_lanzamiento: {
            type: Sequelize.DATE
        },
        rt_clasificacion: {
            type: Sequelize.INTEGER
        },
        trailer: {
            type: Sequelize.STRING
        },
    });
    return Pelicula;
}