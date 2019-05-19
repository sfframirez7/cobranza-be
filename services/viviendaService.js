const BD = require('../modelsBD/BD');

const facturaService = require('./facturaService');


var viviendaService = {


    all: function() {

        return BD.Vivienda.findAll({

            })
            .then((vivienda) => {
                return vivienda
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },


    byId: function(viviendaId) {

        return BD.Vivienda.findOne({
                where: { id: viviendaId },
                include: [{
                    model: BD.Servicios_vivienda,
                    include: [{
                        model: BD.Servicio
                    }]
                }]

            })
            .then((vivienda) => {
                return vivienda
            }).catch((err) => {
                console.log(err);
                throw { error: true, message: err }
            });

    },

    eliminar_vivienda: async function(viviendaId) {

        var pagosPendientes = await facturaService.facturas_pednientes_vivienda(viviendaId)


        if (pagosPendientes && pagosPendientes.length > 0)
            throw { error: true, message: 'Esta vivienda tiene pagos pendientes' }

        return BD.Vivienda.destroy({
                where: { id: viviendaId },
            })
            .then((vivienda) => {
                return BD.Servicios_vivienda.destroy({
                        where: { viviendaId },
                    })
                    .then((result) => {
                        return vivienda

                    })
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },


    nueva_viviendaServicio: async function(viviendaServicioModel) {

        try {
            var resultado = await BD.Servicios_vivienda.findOne({
                where: {
                    servicioId: viviendaServicioModel.servicioId,
                    viviendaId: viviendaServicioModel.viviendaId
                }
            })

            if (resultado)
                throw "Este servicio ya se encuentra agregado "

        } catch (error) {
            console.log(error);
            throw error
        }

        var valorServicio = await BD.Servicio.findOne({
            raw: true,
            where: { id: viviendaServicioModel.servicioId },
            attributes: ['valor']
        })
        console.log(valorServicio.valor);

        return BD.Servicios_vivienda.create({
                usuarioId: viviendaServicioModel.usuarioId,
                servicioId: viviendaServicioModel.servicioId,
                viviendaId: viviendaServicioModel.viviendaId,
                valor: valorServicio.valor,
            })
            .then((servicioVivienda) => {
                return servicioVivienda
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },



    nueva: async function(viviendaModel) {

        return BD.Vivienda.create({
                UsuarioAgregaId: viviendaModel.UsuarioId,
                Descripcion: viviendaModel.Descripcion,
                Direccion: viviendaModel.Direccion,
                UsuarioAgregaId: viviendaModel.UsuarioAgregaId,
                personaId: viviendaModel.personaId
            })
            .then(async(vivienda) => {

                var servicios = await BD.Servicio.findAll({
                    where: { Activo: 1 },
                    attributes: ['id', 'Valor']
                })


                servicios.map(async servicio => {
                    await BD.Servicios_vivienda.create({
                        usuarioId: viviendaModel.UsuarioId,
                        servicioId: servicio.id,
                        viviendaId: vivienda.id,
                        valor: servicio.Valor
                    })


                })
                return vivienda

            })
            .catch((err) => {
                throw { error: true, message: err }
            });

    }

}



module.exports = viviendaService