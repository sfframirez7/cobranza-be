const express = require('express')
const serviciosRouter = express()


const serviciosService = require('../services/serviciosService');
const tokenService = require('../services/tokenService');


serviciosRouter.get('/all', tokenService.validar_token, (req, res) => {

    serviciosService.all()
        .then((serviciosService) => {
            res.json(serviciosService)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

serviciosRouter.get('/eliminarServicioVivienda/:id', tokenService.validar_token_admin, (req, res) => {

    var id = req.params.id

    serviciosService.deleteServicioVivienda(id)
        .then((serviciosService) => {
            res.json(serviciosService)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})


serviciosRouter.post('/new', tokenService.validar_token_admin, (req, res) => {



    var servicioModel = req.body.servicio;
    var data = tokenService.token_payload(req.headers['token'])
    servicioModel.UsuarioCreaId = data.payload.id

    serviciosService.new(servicioModel)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});


serviciosRouter.post('/eliminar/:servicioId', tokenService.validar_token_admin, (req, res) => {



    var servicioId = req.params.servicioId;

    serviciosService.delete(servicioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});


module.exports = serviciosRouter