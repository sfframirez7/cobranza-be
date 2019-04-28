const express = require('express')
const personaRouter = express()

const tokenService = require('../services/tokenService');
const personaService = require('../services/personaService.js');

personaRouter.get('/all', tokenService.validar_token, (req, res) => {
    personaService.mostrar_todos()
        .then((personas) => {
            res.json(personas)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

personaRouter.get('/datosGenerales/:personaId', tokenService.validar_token, (req, res) => {
    var personaId = req.params.personaId

    personaService.buscar_ById(personaId)
        .then((personas) => {
            res.json(personas)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})


personaRouter.post('/new', tokenService.validar_token_admin, (req, res) => {
    var persona = req.body.persona;

    var data = tokenService.token_payload(req.headers['token'])
    persona.UsuarioAgregaId = data.payload.id;

    personaService.crear_persona(persona)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
});


personaRouter.get('/viviendas/:personaId', tokenService.validar_token, (req, res) => {
    var personaId = req.params.personaId

    personaService.viviendas_persona(personaId)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});


personaRouter.get('/eliminar/:personaId', tokenService.validar_token_admin, (req, res) => {

    var personaId = req.params.personaId

    personaService.eliminar_persona(personaId)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });

});





personaRouter.all('/*', (req, res) => {
    console.log("object");
    res.json("it works")
})

module.exports = personaRouter