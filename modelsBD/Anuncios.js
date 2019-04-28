const { sequelize, Sequelize } = require('../config/sequelize')

const BD = require('./BD');

const Anuncio = sequelize.define('anuncio', {

    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    Titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },


    Contenido: {
        type: Sequelize.TEXT,
        allowNull: false
    },


    FechaDesde: {
        type: Sequelize.DATE
    },


    FechaHasta: {
        type: Sequelize.DATE
    },


    Publicado: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },


    Activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }


}, {
    paranoid: true
})


module.exports = Anuncio