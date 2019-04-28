const { sequelize, Sequelize } = require('../config/sequelize')


const PantallasBD = sequelize.define('pantalla', {


    Descripcion: {
        type: Sequelize.STRING,
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


    Icono: {
        type: Sequelize.STRING
    },


    Ruta: {
        type: Sequelize.STRING
    },


    EsContenedor: {
        type: Sequelize.INTEGER
    },


    PadreId: {
        type: Sequelize.INTEGER,
        default: 0
    }






})

module.exports = PantallasBD