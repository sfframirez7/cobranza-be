const {Sequelize,sequelize} = require('../config/sequelize');

const Persona = sequelize.define('persona', {

    NoIdentidad : {
         type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate : {
             notEmpty : true,
            isNumeric : true
        }
    },


    Nombre : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Apellido : {
        type : Sequelize.STRING,
        allowNull : false
    },


    Telefono : {
        type : Sequelize.STRING,
        defaultValue : ''    
    },

    
    Celular : {
        type : Sequelize.STRING,
        validate : {
            isNumeric : true
        }
    },


    Correo : {
         type : Sequelize.STRING,
        validate : {
             isEmail : true
        }
    },


    Direccion : {
        type : Sequelize.TEXT,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },


    Sexo : {
        type : Sequelize.ENUM('F', 'M'),
        allowNull : false,
        validate : {
            notEmpty : true,
            len: [1]
        }
    },

    Activo : {
        type : Sequelize.BOOLEAN,
       defaultValue : 1
    },

   
    UsuarioAgregaId : {
            type : Sequelize.INTEGER,
            allowNull : false
    }


},
{
    paranoid: true
})


module.exports = Persona