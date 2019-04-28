const { sequelize, Sequelize } = require('../config/sequelize')

const AccesosPantallasBD = sequelize.define('AccesosPantallas', {


    pantallaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    tipoUsuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    Activo: {
        type: Sequelize.BOOLEAN,
        default: true
    },


    UsuarioCreaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },




})

module.exports = AccesosPantallasBD