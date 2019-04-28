const express = require('express')
const usuarioRouter = express()


const usuarioService = require('../services/usuarioService');
const loginService = require('../services/loginService');

const tokenService = require('../services/tokenService');


usuarioRouter.get('/all', (req, res) => {
    usuarioService.mostrar_todos()
        .then((TipoUsuarios) => {
            res.json(TipoUsuarios)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})


usuarioRouter.get('/tipoUsuarios', tokenService.validar_token, (req, res) => {

    usuarioService.tipos_usuarios()
        .then((TipoUsuarios) => {
            res.json(TipoUsuarios)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


usuarioRouter.get('/byPersona/:personaId', tokenService.validar_token, (req, res) => {

    var personaId = req.params.personaId

    usuarioService.usuario_byPersona(personaId)
        .then((usuario) => {
            res.json(usuario)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})



usuarioRouter.post('/new/:personaId/:tipoUsuarioId', tokenService.validar_token_admin, (req, res) => {

    var personaId = req.params.personaId
    var tipoUsuarioId = req.params.tipoUsuarioId


    usuarioService.crear_usuario(personaId, tipoUsuarioId)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

usuarioRouter.post('/login', (req, res) => {
    var credenciales = req.body.credenciales

    loginService.iniciar_sesion(credenciales)
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

module.exports = usuarioRouter