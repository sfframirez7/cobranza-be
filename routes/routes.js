const express = require('express')
var bodyParser = require('body-parser')

const routes = express()


const personaRouter = require('./personaRouter');
const tipoUsuarioiRouter = require('./tipoUsuraioRouter');
const usuarioRouter = require('./usuarioRouter');
const formaPagoRouter = require('./formaDePagoRouter');
const servicioRouter = require('./serviciosRouter');
const facturaRouter = require('./facturaRouter');
const visitaRouter = require('./visitaRouter');
const anuncioRouter = require('./anunciosRouter');
const viviendaRouter = require('./viviendaRouter');
const pantallaRouter = require('./pantallaRouter');
const emailaRouter = require('./emailRouter');



routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use('/persona', personaRouter)
routes.use('/tipoUsuario', tipoUsuarioiRouter)
routes.use('/usuario', usuarioRouter)
routes.use('/formaPago', formaPagoRouter)
routes.use('/servicios', servicioRouter)
routes.use('/factura', facturaRouter)
routes.use('/visita', visitaRouter)
routes.use('/anuncios', anuncioRouter)
routes.use('/vivienda', viviendaRouter)
routes.use('/pantalla', pantallaRouter)
routes.use('/email', emailaRouter)

module.exports = routes