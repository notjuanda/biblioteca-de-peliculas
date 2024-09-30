module.exports = (sequelize, Sequelize) => {
    const Pelicula_Reparto = sequelize.define("Pelicula_Reparto", {
        id_pelicula: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Peliculas', 
                key: 'id',
            }
        },
        id_reparto: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Repartos',
                key: 'id',
            }
        },
        rol: {
            type: Sequelize.INTEGER,
            validate: {
                isIn: [[0, 1, 2]] // 0: actor, 1: director, 2: ambos
            }
        }
    });

    return Pelicula_Reparto;
}
