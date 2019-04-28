const express  = require('express')
const formaDePagoRouter = express()


const formaDePagoService = require('../services/formaDePagoService');
const tokenService = require('../services/tokenService');


formaDePagoRouter.get('/all', tokenService.validar_token, (req, res)=>
{
    formaDePagoService.all()
    .then((formasDePago)=>
    {
        res.json(formasDePago)
    })
    .catch((err)=>
    {
        res.status(401).json(err)
    })
})


formaDePagoRouter.post('/new', tokenService.validar_token, (req, res)=>
{
    var formaPagoModel = req.body.formaPagoModel;
    var payload = tokenService.token_payload(req.headers['token'])
    formaPagoModel.usuarioId = payload.id

    formaDePagoService.new(formaPagoModel)
    .then((resp)=>
    {
        res.json(resp)
    })
    .catch((err)=>
    {
        res.status(401).json(err)
    })
});

formaDePagoRouter.post ('/update', tokenService.validar_token, (req, res)=>
{
    var formaPagoModel = req.body.formaPagoModel;
    var payload = tokenService.token_payload(req.headers['token'])
    formaPagoModel.usuarioId = payload.id

    formaDePagoService.update(formaPagoModel)
    .then((resp)=>
    {
        res.json(resp)
    })
    .catch((err)=>
    {
        res.status(401).json(err)
    })
});

formaDePagoRouter.post ('/delete', tokenService.validar_token, (req, res)=>
{
    var formaPagoModel = req.body.formaPagoModel;
    
    var payload = tokenService.token_payload(req.headers['token'])
    formaPagoModel.usuarioId = payload.id

    formaDePagoService.delete(formaPagoModel)
    .then((resp)=>
    {
        res.json(resp)
    })
    .catch((err)=>
    {
        res.status(401).json(err)
    })
});

module.exports = formaDePagoRouter