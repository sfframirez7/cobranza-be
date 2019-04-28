const express = require('express')
const viviendaRouter = express()

const viviendaService = require('../services/viviendaService');

const tokenService = require('../services/tokenService');

viviendaRouter.get('/all', tokenService.validar_token, (req, res) => {


    viviendaService.all()
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


viviendaRouter.get('/byId/:viviendaId', tokenService.validar_token, (req, res) => {


    var viviendaId = req.params.viviendaId

    viviendaService.byId(viviendaId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});



viviendaRouter.post('/new', tokenService.validar_token_admin, (req, res) => {

    var viviendaModel = req.body.vivienda
    var payload = tokenService.token_payload(req.headers['token'])
    console.log(payload);
    viviendaModel.UsuarioAgregaId = payload.payload.id
    console.log(viviendaModel);


    viviendaService.nueva(viviendaModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


viviendaRouter.post('/newViviendaServicio', tokenService.validar_token_admin, (req, res) => {

    var viviendaServicioModel = req.body.viviendaServicio
    var payload = tokenService.token_payload(req.headers['token'])

    viviendaServicioModel.usuarioId = payload.payload.id



    viviendaService.nueva_viviendaServicio(viviendaServicioModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


viviendaRouter.post('/eliminar/:viviendaId', tokenService.validar_token_admin, (req, res) => {

    var viviendaId = req.params.viviendaId

    viviendaService.eliminar_vivienda(viviendaId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});




module.exports = viviendaRouter