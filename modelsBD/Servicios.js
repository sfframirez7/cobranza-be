const {sequelize, Sequelize} = require('../config/sequelize')

const BD = require('./BD');

const Servicio =  sequelize.define('servicio', {
    
    Descripcion: {
        type:  Sequelize.STRING,
        allowNull: false
    },


    Valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate : {
            isDecimal: true
        }    
    },


    Activo:{
        type : Sequelize.BOOLEAN,
        defaultValue : 1
    },


    UsuarioCreaId : {
        type : Sequelize.INTEGER,
        allowNull: false
    },


    usuarioEditaId : {
        type : Sequelize.INTEGER
    }


},
{
    paranoid: true
})



  module.exports = Servicio