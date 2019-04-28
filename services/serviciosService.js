const BD = require('../modelsBD/BD');

var serviciosService = {

    all: function() {
        return BD.Servicio.findAll({ raw: true })
            .then((servicios) => {
                return servicios
            })
            .catch((error) => {
                throw {
                    error: true,
                    message: error
                }
            })

    },

    new: async function(servicioModel) {

        try {


            if (!servicioModel) {
                throw {
                    error: true,
                    message: "No se han proporcionados datos"
                }
            }

            var newServicio = servicio_mapper(servicioModel)
            var servicioBD = await BD.Servicio.create(newServicio)

            if (servicioModel.TodosLosClientes && servicioModel.TodosLosClientes) {
                console.log(servicioBD.id);

                var viviendasList = []

                var viviendas = await BD.Vivienda.findAll({
                    where: { Activo: 1 },
                    attributes: ['id']
                })

                viviendas.map(async viviendaId => {
                    viviendasList.push(viviendaId.id)
                })

                viviendasList.map(async viviendaId => {
                    await BD.Servicios_vivienda.create({
                        usuarioId: newServicio.UsuarioCreaId,
                        servicioId: servicioBD.id,
                        viviendaId: viviendaId,
                        valor: servicioBD.Valor
                    })

                })
                return servicioBD
            } else {

                return servicioBD
            }


        } catch (error) {
            console.log(error);
            throw { error: true, message: error }
        }
    },

    update: async function(formaPagoModel) {

        if (!formaPagoModel) {
            throw {
                error: true,
                message: "No se han proporcionados datos"
            }
        }

        await BD.Forma_Pago.update({
            Activo: formaPagoModel.Activo
        }, { where: { id: formaPagoModel.id } })

        .then((resp) => {
                return {
                    error: false,
                    message: 'Petición ejecutada exitosamente'
                }
            })
            .catch((err) => {
                throw {
                    error: true,
                    message: err
                }
            })

    },


    delete: function(servicioId) {


        return BD.Servicio.destroy({ where: { id: servicioId } })

        .then(() => {

                return BD.Servicios_vivienda.destroy({ where: { servicioId: servicioId } })
                    .then(() => {
                        return {
                            error: false,
                            message: 'Petición ejecutada exitosamente'
                        }
                    })

            })
            .catch((err) => {
                throw {
                    error: true,
                    message: err
                }
            })

    },


    deleteServicioVivienda: function(id) {


        return BD.Servicios_vivienda.destroy({ where: { id } })

        .then(() => {

                return { error: false, message: 'Petición ejecutada exitosamente' }

            })
            .catch((err) => {
                throw { error: true, message: err }
            })

    }


}



function servicio_mapper(servicioModel) {
    var newServicio = {
        Descripcion: servicioModel.Descripcion,
        Activo: servicioModel.Activo,
        usuarioId: servicioModel.UsuarioCreaId,
        Valor: servicioModel.Valor,
        UsuarioCreaId: servicioModel.UsuarioCreaId
    }
    return newServicio
}

module.exports = serviciosService