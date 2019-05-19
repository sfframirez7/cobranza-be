const express = require('express')
const anuncioRouter = express()

const anuncioService = require('../services/anuncioService');
const tokenService = require('../services/tokenService');


anuncioRouter.get('/all', tokenService.validar_token, (req, res) => {

    anuncioService.anuncios()
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


anuncioRouter.post('/new', tokenService.validar_token_admin, (req, res) => {

    var anuncioModel = req.body.anuncio
    var data = tokenService.token_payload(req.headers['token'])
    anuncioModel.UsuarioId = data.payload.id

    anuncioService.nuevo(anuncioModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});





anuncioRouter.post('/eliminar/:anuncioId', tokenService.validar_token_admin, (req, res) => {

    var anuncioId = req.params.anuncioId
    var payload = tokenService.token_payload(req.headers['token'])
    console.log(payload);

    anuncioService.eliminar_anuncio(anuncioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});



module.exports = anuncioRouter