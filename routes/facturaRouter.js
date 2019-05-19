const express = require('express')
const facturaRouter = express()

var IFactura = require('../models/IFactura');

const facturaService = require('../services/facturaService');
const tokenService = require('../services/tokenService');


facturaRouter.post('/generar', tokenService.validar_token, (req, res) => {
    var data = tokenService.token_payload(req.headers['token'])

    var facturaModel = req.body.factura

    IFactura.UsuarioGeneraId = data.payload.id
    IFactura.Anio = facturaModel.Anio
    IFactura.Mes = facturaModel.Mes
    IFactura.FechaVence = facturaModel.FechaVence

    facturaService.generar_facturas_mensuales(IFactura)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})


facturaRouter.get('/pendientes/:viviendaId', tokenService.validar_token, (req, res) => {
    var viviendaId = req.params.viviendaId

    facturaService.facturas_pednientes_vivienda(viviendaId)
        .then((resp) => {
            res.json(resp)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/facturaById/:facturaId', tokenService.validar_token, (req, res) => {
    var facturaId = req.params.facturaId

    facturaService.facturaById(facturaId)
        .then((resp) => {
            res.json(resp)
        }).catch((err) => {
            res.status(400).json(err)
        });

});



facturaRouter.post('/pagar', tokenService.validar_token, (req, res) => {

    var data = tokenService.token_payload(req.headers['token'])

    var facturaModel = req.body.factura

    IFactura.UsuarioRealizaCobroId = data.payload.id
    IFactura.FormaPagoId = facturaModel.FormaPagoId
    IFactura.id = facturaModel.id

    facturaService.pagar(IFactura)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/misFacturas', tokenService.validar_token, (req, res) => {

    var data = tokenService.token_payload(req.headers['token'])

    var personaId = data.payload.id;


    facturaService.facturasBypersona(personaId)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/periodos', tokenService.validar_token, (req, res) => {


    facturaService.facturas_periodos()
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/ByPeriodo/:anio/:mes', tokenService.validar_token, (req, res) => {

    var anio = req.params.anio
    var mes = req.params.mes


    facturaService.facturas_ByPeriodo(anio, mes)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});

facturaRouter.get('/pagadas/:desde/:hasta', tokenService.validar_token_admin, (req, res) => {

    var fechaDesde = req.params.desde
    var fechaHasta = req.params.hasta

    console.log(fechaDesde, fechaHasta);

    facturaService.facturas__pagadas_ByFecha(fechaDesde, fechaHasta)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/sinPagar/:desde/:hasta', tokenService.validar_token_admin, (req, res) => {

    var fechaDesde = req.params.desde
    var fechaHasta = req.params.hasta

    console.log(fechaDesde, fechaHasta);

    facturaService.facturas__sinPagar_ByFecha(fechaDesde, fechaHasta)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


facturaRouter.get('/todas/:desde/:hasta', tokenService.validar_token_admin, (req, res) => {

    var fechaDesde = req.params.desde
    var fechaHasta = req.params.hasta

    console.log(fechaDesde, fechaHasta);

    facturaService.facturas__todas_ByFecha(fechaDesde, fechaHasta)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});



module.exports = facturaRouter