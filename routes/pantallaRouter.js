const express = require('express')
const pantallasRouter = express()

const pantallaService = require('../services/pantallasService');

const tokenService = require('../services/tokenService');

pantallasRouter.get('/all', tokenService.validar_token, (req, res) => {


    pantallaService.all(2)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});




pantallasRouter.post('/new', tokenService.validar_token, (req, res) => {

    var viviendaModel = req.body.vivienda
    var payload = tokenService.token_payload(req.headers['token'])
    viviendaModel.UsuarioAgregaId = payload.id


    viviendaService.nueva(viviendaModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


pantallasRouter.post('/eliminar/:visitaId', tokenService.validar_token, (req, res) => {

    var visitaId = req.params.visitaId
    var payload = tokenService.token_payload(req.headers['token'])
    var usuarioId = payload.id

    viviendaService.eliminar_visita(visitaId, usuarioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});




module.exports = pantallasRouter