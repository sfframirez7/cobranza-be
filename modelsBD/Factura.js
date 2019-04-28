const { sequelize, Sequelize } = require('../config/sequelize')

const BD = require('./BD');

const Factura = sequelize.define('factura', {

    // FacturaDetalleId : {
    //     type : Sequelize.STRING,
    //     allowNull : false
    // },


    ViviendaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    Anio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    Mes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    UsuarioGeneraId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    ISV: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    Otros: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    OtrosCargos: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    Descuento: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    SubTotal: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    Total: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.00
    },


    FechaVence: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },

    Pagada: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },


    FormaPagoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    FechaPago: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },


    UsuarioRealizaCobroId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'personas',
            key: 'id'
        }
    },


    Anulada: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },


    FechaAnulada: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },


    UsuarioAnulaId: {
        type: Sequelize.INTEGER
    },


    MotivoAnulaId: {
        type: Sequelize.INTEGER
    },


    ComentarioAnula: {
        type: Sequelize.STRING
    }



}, {
    paranoid: true
})


module.exports = Factura