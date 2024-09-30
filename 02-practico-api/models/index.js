const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Pelicula = require("./pelicula.model")(sequelize, Sequelize);
db.Reparto = require("./reparto.model")(sequelize, Sequelize);
db.Pelicula_Reparto = require("./pelicula_reparto.model")(sequelize, Sequelize);

db.Pelicula.belongsToMany(db.Reparto, {
    through: db.Pelicula_Reparto,
    as: "Repartos",
    foreignKey: "id_pelicula",
});
db.Reparto.belongsToMany(db.Pelicula, {
    through: db.Pelicula_Reparto,
    as: "Peliculas",
    foreignKey: "id_reparto",
});

module.exports = db;
