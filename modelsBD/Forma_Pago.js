const {sequelize, Sequelize} = require('../config/sequelize')

const BD = require('./BD');

const Forma_Pago = sequelize.define('forma_pago',{
    
    Descripcion : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Activo : {
        type : Sequelize.BOOLEAN,
        defaultValue : 1
    },


    usuarioId:{
        type : Sequelize.INTEGER,
        allowNull: false
    }

},
{
    paranoid: true
},
{
    paranoid: true
})


module.exports = Forma_Pago