const express = require('express')
const visitaRouter = express()

const visitaService = require('../services/visitaService');
const tokenService = require('../services/tokenService');

visitaRouter.get('/all', tokenService.validar_token, (req, res) => {



    visitaService.visitas_del_dia()
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

visitaRouter.get('/misVisitas', tokenService.validar_token, (req, res) => {

    var data = tokenService.token_payload(req.headers['token'])
    var usuarioId = data.payload.id

    visitaService.visitas_ByPersona(usuarioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


visitaRouter.post('/new', tokenService.validar_token, (req, res) => {

    var visitaModel = req.body.visita
    var data = tokenService.token_payload(req.headers['token'])
    visitaModel.UsuarioId = data.payload.id

    visitaService.nueva(visitaModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


visitaRouter.post('/eliminar/:visitaId', tokenService.validar_token, (req, res) => {

    var visitaId = req.params.visitaId
    var data = tokenService.token_payload(req.headers['token'])
    var usuarioId = data.payload.id

    visitaService.eliminar_visita(visitaId, usuarioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});




module.exports = visitaRouter