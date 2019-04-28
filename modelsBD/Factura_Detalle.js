const {sequelize, Sequelize} = require('../config/sequelize')

const BD = require('./BD');

const Factura_detalle = sequelize.define('factura_detalle',{

    FacturaId : {
        type :  Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'facturas',
            key : 'id'
        }
    },

    ServicioId: {
        type:  Sequelize.INTEGER,
        allowNull: false
    },


    
    Valor : {
        type : Sequelize.DECIMAL,
        allowNull : false
    }
    
},
{
    paranoid: true
})


module.exports = Factura_detalle