module.exports = (sequelize, Sequelize) => {
    const Reparto = sequelize.define("Reparto", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        imagen: {
            type: Sequelize.STRING
        }
    });
    return Reparto;
}