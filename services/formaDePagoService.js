
const BD = require('../modelsBD/BD');

var formaDePagoService ={

    all : function ()
    {
        return BD.Forma_Pago.findAll({raw : true})
        .then((formaPagos)=>
        {
            return formaPagos
        })
        .catch((error)=>
        {
            throw {
                    error : true,
                    message : error
                }
        })

    },

    new : async function(formaPagoModel )
        {

            if(!formaPagoModel)
            {
                throw {
                    error : true,
                    message : "No se han proporcionados datos"
                }
            }

            var newFormaPago = forma_pago_mapper(formaPagoModel)
            const formaPagoBD = BD.Forma_Pago.build( newFormaPago )
                return  await formaPagoBD.save()
                .then(()=>
                {
                    return {
                            error : false,
                            message : 'Petición ejecutada exitosamente'
                        }
                })
                .catch((err)=>
                {
                    throw {
                        error : true,
                        message : err
                    }
                })
        },

        update : async function(formaPagoModel )
        {

            if(!formaPagoModel)
            {
                throw {
                    error : true,
                    message : "No se han proporcionados datos"
                }
            }

            await BD.Forma_Pago.update(
                {
                    Activo : formaPagoModel.Activo
                },
                {where : { id : formaPagoModel.id}})

            .then((resp)=>
            {
                return {
                    error : false,
                    message : 'Petición ejecutada exitosamente'
                }
            })
            .catch((err)=>
            {
                throw {
                    error : true,
                    message : err
                }
            })

        },
        delete : function(formaPagoModel )
        {

            if(!formaPagoModel)
            {
                throw {
                    error : true,
                    message : "No se han proporcionados datos"
                }
            }

             return BD.Forma_Pago.destroy( {where : { id : formaPagoModel.id}} )
                
            .then((resp)=>
            {
                return {
                    error : false,
                    message : 'Petición ejecutada exitosamente'
                }
            })
            .catch((err)=>
            {
                throw {
                    error : true,
                    message : err
                }
            })

        }

}



function forma_pago_mapper(formaPagoModel)
{
    var newFormaPago = 
    {
        Descripcion : formaPagoModel.Descripcion,
        Activo : formaPagoModel.Activo,
        usuarioId : formaPagoModel.usuarioId
    }
    return newFormaPago
}

module.exports = formaDePagoService