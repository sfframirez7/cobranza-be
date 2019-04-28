const {sequelize, Sequelize} = require('../config/sequelize')

const Variable_configuracion = sequelize.define('variable_configuracion',{

    Nombre : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Descripcion : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Valor : {
        type : Sequelize.STRING,
        allowNull : false
    },

    UsuarioAgregaId : {
        type : Sequelize.INTEGER,
        allowNull : false
    },


    Activo : {
        type : Sequelize.BOOLEAN,
        defaultValue : 1
    }


},
{
    paranoid: true
})



module.exports = Variable_configuracion