const {sequelize, Sequelize} = require('../config/sequelize')

const BD = require('./BD');

const Log_Erroes = sequelize.define('log_errores', {

    UsuarioId:{
        type : Sequelize.INTEGER,
    },
    

    Descripcion :{
        type : Sequelize.TEXT
    },


    Pantalla :{
        type : Sequelize.TEXT
    },    


    Evento :{
        type : Sequelize.TEXT
    }

})


module.exports = Log_Erroes