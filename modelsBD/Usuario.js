const {sequelize, Sequelize} = require('../config/sequelize')


const Usuario = sequelize.define('usuario', {

    PersonaId : {
        type : Sequelize.INTEGER,
        unique : true ,
        allowNull : false
    },


    Usuario : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },


    Password : {
        type : Sequelize.STRING,
        allowNull : false
    },


    TipoUsuarioId:{
        type : Sequelize.INTEGER,
        allowNull: false
    },


    Activo : {
        type : Sequelize.BOOLEAN,
        defaultValue : 1
    }


},
{
    paranoid: true
})

Usuario.sync()


module.exports = Usuario