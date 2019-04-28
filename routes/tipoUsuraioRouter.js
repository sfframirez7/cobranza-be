const express  = require('express')
const tipoUsuariRouter = express()


const tipoUsuarioService = require('../services/tipoUsuarioService');


tipoUsuariRouter.get('/all', (req, res)=>
{
    tipoUsuarioService.mostrar_todos()
    .then((TipoUsuarios)=>
    {
        res.json(TipoUsuarios)
    })
    .catch((error)=>
    {
        res.send(error)
    })
})


tipoUsuariRouter.post('/new', (req, res)=>
{
    var tipoUsuario = req.body.tipoUsuario;

    tipoUsuarioService.crear_tipo_usuario(tipoUsuario)
    .then((resp)=>
    {
        res.json(resp)
    })
    .catch((err)=>
    {
        res.status(400).json(err)
    })
})

module.exports = tipoUsuariRouter