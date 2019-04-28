const { sequelize, Sequelize } = require('../config/sequelize')

const BD = require('./BD');

const Vivienda = sequelize.define('vivienda', {

    personaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    Descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },


    Direccion: {
        type: Sequelize.TEXT,
        allowNull: false
    },


    UsuarioAgregaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }


}, {
    paranoid: true
})



module.exports = Vivienda