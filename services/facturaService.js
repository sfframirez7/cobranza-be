const BD = require('../modelsBD/BD');

const { sequelize, Sequelize } = require('../config/sequelize')

const Op = Sequelize.Op
let transaction;

var facturaService = {


    pagar: async function(IFactura) {
        try {
            var factura = await BD.Factura.findOne({ where: { id: IFactura.id } })

            if (!factura)
                throw 'No se ha encontrado ninguna factura'

            if (factura.Pagada && factura.FechaPago)
                throw 'La factura ya ha sido pagada'

            return BD.Factura.update({
                    Pagada: true,
                    FechaPago: Date.now(),
                    FormaPagoId: IFactura.FormaPagoId,
                    UsuarioRealizaCobroId: IFactura.UsuarioRealizaCobroId
                }, { where: { id: IFactura.id } })
                .then((result) => {
                    return { error: false, message: 'Petición ejecutada exitosamente' }
                })
                .catch((err) => {
                    throw { error: true, message: err }
                });
        } catch (error) {
            throw { error: true, message: error }
        }

    },



    generar_facturas_mensuales: async function(IFactura) {

        try {
            await validate_periodo(IFactura)

            var viviendas = await obtener_viviendas()


            viviendas.map(async viviendaId => {

                var total = await obtener_total_vivienda(viviendaId)

                IFactura.ViviendaId = viviendaId
                IFactura.Total = total


                var factura = await guardar_factura(IFactura)

                var servicios = await obtener_servicios_viviendas(viviendaId)

                servicios.forEach(async servicio => {

                    var factura_detalle = {
                        ServicioId: servicio.servicioId,
                        FacturaId: factura.id,
                        Valor: servicio.valor
                    }
                    await guardar_factura_detalle(factura_detalle)

                });

            })
            return { error: false, message: 'Pertición ejecutada exitosamente' }

        } catch (err) {
            throw err
        }
    },


    facturaById: function(facturaId) {
        return BD.Factura.findOne({
                where: { id: facturaId },
                paranoid: false,
                include: [{
                        model: BD.Vivienda,
                        attributes: ['id', 'personaId', 'Descripcion', 'Direccion'],
                        paranoid: false,
                        include: [{
                            model: BD.Persona,
                            attributes: ['id', 'NoIdentidad', 'Nombre', 'Apellido', 'Correo'],
                            paranoid: false
                        }],
                    },
                    {
                        model: BD.Factura_Detalle,
                        attributes: ['id', 'servicioId', 'valor'],
                        include: [{
                            model: BD.Servicio,
                            attributes: ['Descripcion'],
                            paranoid: false
                        }],

                    },
                    {
                        model: BD.Persona,
                        as: 'cajero',
                        attributes: ['id', 'NoIdentidad', 'Nombre', 'Apellido', 'Telefono', 'Celular', 'Correo']
                    }
                ]
            })
            .then((factura) => {
                return factura
            })
            .catch((err) => {
                console.log(err);
                throw { error: true, message: err }
            });

    },



    facturas_pednientes_vivienda: function(viviendaId) {
        return BD.Factura.findAll({
                raw: true,
                where: { viviendaId: viviendaId, Pagada: false },
                paranoid: false
            })
            .then((facturas) => {
                return facturas
            })
            .catch((err) => {
                throw { error: true, message: err }
            });

    },


    facturasBypersona: async function(personaId) {

        var persona = await BD.Usuario.findOne({ where: { id: personaId } })


        var viviendas = []
        var respuesta = await BD.Vivienda.findAll({
            attributes: ['id'],
            where: { personaId: persona.PersonaId },
            paranoid: false
        })

        respuesta.forEach(resp => {
            viviendas.push(resp.id)
        });



        return BD.Factura.findAll({
                where: { viviendaId: viviendas },
                order: [
                    ['Anio', 'DESC'],
                    ['Mes', 'DESC']
                ]
            })
            .then((facturas) => {
                return facturas
            })
            .catch((err) => {
                throw { error: true, message: err }
            });

    },



    facturas_periodos: function() {

        return BD.Factura.findAndCountAll({
                attributes: [
                    [Sequelize.literal('DISTINCT `Anio`'), 'Anio'], 'Mes', 'createdAt'
                ],
                paranoid: false,

                order: [
                    ['Anio', 'DESC'],
                    ['Mes', 'DESC']
                ]
            })
            .then((facturas) => {
                return facturas

            }).catch((err) => {
                throw { error: true, message: err }
            });
    },


    facturas_ByPeriodo: function(anio, mes) {

        return BD.Factura.findAll({
                where: { Anio: anio, Mes: mes },
                paranoid: false,
                include: [{
                    model: BD.Vivienda,
                    attributes: ['id', 'personaId'],
                    paranoid: false,
                    include: [{
                        model: BD.Persona,
                        attributes: ['id', 'Nombre', 'Apellido', 'Correo'],
                        paranoid: false,
                    }]
                }],
            })
            .then((facturas) => {
                return facturas

            }).catch((err) => {
                throw { error: true, message: err }
            });
    },


    facturas__pagadas_ByFecha: function(fechaDesde, fechaHasta) {

        return BD.Factura.findAll({
                where: {
                    FechaPago: {
                        [Op.between]: [fechaDesde, fechaHasta]
                    },
                    Pagada: 1,
                    Anulada: 0
                },
                paranoid: false,
                include: [{
                    model: BD.Vivienda,
                    attributes: ['id', 'personaId'],
                    paranoid: false,
                    include: [{
                        model: BD.Persona,
                        attributes: ['id', 'Nombre', 'Apellido', 'Correo'],
                        paranoid: false,
                    }]
                }],
            })
            .then((facturas) => {
                return facturas

            }).catch((err) => {
                throw { error: true, message: err }
            });
    },


    facturas__sinPagar_ByFecha: function(fechaDesde, fechaHasta) {

        return BD.Factura.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [fechaDesde, fechaHasta]
                    },
                    Pagada: 0
                },
                paranoid: false,
                include: [{
                    model: BD.Vivienda,
                    attributes: ['id', 'personaId'],
                    paranoid: false,
                    include: [{
                        model: BD.Persona,
                        attributes: ['id', 'Nombre', 'Apellido', 'Correo'],
                        paranoid: false,
                    }]
                }],
            })
            .then((facturas) => {
                return facturas

            }).catch((err) => {
                throw { error: true, message: err }
            });
    },



    facturas__todas_ByFecha: function(fechaDesde, fechaHasta) {

        return BD.Factura.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [fechaDesde, fechaHasta]
                    }
                },
                paranoid: false,
                include: [{
                    model: BD.Vivienda,
                    attributes: ['id', 'personaId'],
                    paranoid: false,
                    include: [{
                        model: BD.Persona,
                        attributes: ['id', 'Nombre', 'Apellido', 'Correo'],
                        paranoid: false,
                    }]
                }],
            })
            .then((facturas) => {
                return facturas

            }).catch((err) => {
                throw { error: true, message: err }
            });
    }






}

async function guardar_factura_detalle(factura_detalle) {
    try {
        await BD.Factura_Detalle.create(factura_detalle)

    } catch (error) {
        console.log(error);
        throw error
    }


}

async function obtener_servicios_viviendas(viviendaId) {
    try {
        var servicios = await BD.Servicios_vivienda.findAll({ attributes: ['servicioId', 'valor'], where: { viviendaId: viviendaId } })
        return servicios
    } catch (error) {
        throw error
    }


}

async function guardar_factura(IFactura) {
    try {
        var newFactura = factura_mapper(IFactura)
        const facturaBD = await BD.Factura.create(newFactura)
            // var factura = await facturaBD.save()
        return facturaBD
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function validate_periodo(IFactura) {
    try {
        var resultado = await BD.Factura.findOne({ where: { Anio: IFactura.Anio, [Op.and]: [{ Mes: IFactura.Mes }] } })

        if (resultado)
            throw "Ya se ha registrado una carga de factura para este mes y año "

    } catch (error) {
        console.log(error);
        throw error
    }

}

async function obtener_viviendas() {

    try {
        var viviendas = []
        var respuesta = await BD.Servicios_vivienda.findAll({
            attributes: ['viviendaId'],
            order: [
                ['viviendaId', 'ASC']
            ],
            group: ['viviendaId']
        })
        respuesta.forEach(resp => {
            viviendas.push(resp.viviendaId)
        });
        return viviendas
    } catch (error) {
        throw error
    }



}

async function obtener_total_vivienda(viviendaId) {
    try {
        var total = await BD.Servicios_vivienda.sum('valor', { where: { viviendaId: viviendaId } })
        return total
    } catch (error) {
        throw error
    }


}


function factura_mapper(IFactura) {
    var newFactura = {

        ViviendaId: IFactura.ViviendaId,
        Anio: IFactura.Anio,
        Mes: IFactura.Mes,
        UsuarioGeneraId: IFactura.UsuarioGeneraId,
        ISV: IFactura.ISV,
        Otros: IFactura.Otros,
        OtrosCargos: IFactura.OtrosCargos,
        Descuento: IFactura.Descuento,
        SubTotal: IFactura.SubTotal,
        Total: IFactura.Total,
        FechaVence: IFactura.FechaVence,
        Pagada: IFactura.Pagada,
        FormaPagoId: IFactura.FormaPagoId,
        FechaPago: IFactura.FechaPago,
        UsuarioRealizaCobroId: 0,
        Anulada: IFactura.Anulada,
        FechaAnulada: IFactura.FechaAnulada,
        UsuarioAnulaId: IFactura.UsuarioAnulaId,
        MotivoAnulaId: IFactura.MotivoAnulaId,
        ComentarioAnula: IFactura.ComentarioAnula,
    }

    return newFactura
}


module.exports = facturaService