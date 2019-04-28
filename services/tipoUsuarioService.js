
const {Sequelize} = require('../config/sequelize')
const Op = Sequelize.Op

const BD = require('../modelsBD/BD')


var tipoUsuarioService = {
    
    
    mostrar_todos : function()
    {
        return BD.Tipo_usuario.findAll({raw : true})
        .then((TipoUsuarios)=>
        {
            return TipoUsuarios
        })
        .catch((error)=>
        {
            return {
                    error : true,
                    message : error
                }
        })

    },

    crear_tipo_usuario : async function(tipoUsuario )
    {
        const tipoUsuarioBD = BD.Tipo_usuario.build( 
            {
                Descripcion : tipoUsuario.Descripcion,
                Activo : tipoUsuario.Activo
            }  )
            return await tipoUsuarioBD.save()
            .then(()=>
            {
                return {
                        error : false,
                        message : 'Petición ejecutada exitosamente'
                    }
            })
            .catch((err)=>
            {
                return {
                    error : true,
                    message : err
                }
            })
    }



}


module.exports = tipoUsuarioService