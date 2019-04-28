const {sequelize, Sequelize} = require('../config/sequelize')

const Tipo_usuario = sequelize.define('tipo_usuario', {
  
    Descripcion: {
        type:  Sequelize.STRING,
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



module.exports = Tipo_usuario