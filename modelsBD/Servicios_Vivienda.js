const { sequelize, Sequelize } = require('../config/sequelize')


const Servicios_viviendas = sequelize.define('servicios_vivienda', {

    usuarioId: {
        type: Sequelize.INTEGER
    },

    servicioId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'servicios',
            key: 'id'
        }
    },

    viviendaId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'viviendas',
            key: 'id'
        }
    },

    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }


}, {
    paranoid: true
})


module.exports = Servicios_viviendas