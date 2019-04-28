const {sequelize, Sequelize} = require('../config/sequelize')

const Motivo_anula = sequelize.define('motivo_anula', {
  
    Descripcion : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Activo : {
        type : Sequelize.BOOLEAN,
        defaultValue : 1
    },


    UsuarioId:{
        type : Sequelize.INTEGER,
        allowNull: false
    }

},
{
    paranoid: true
})


module.exports = Motivo_anula