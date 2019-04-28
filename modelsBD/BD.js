const Tipo_usuario = require('./Tipo_usuario');
const Persona = require('./Persona');
const Usuario = require('./Usuario');
const Servicio = require('./Servicios');
const Forma_Pago = require('./Forma_Pago');
const Vivienda = require('./Vivienda');
const Variable_configuracion = require('./Variable_configuracion');
const Anuncio = require('./Anuncios');
const Log_Errores = require('./Log_errores');
const Factura_Detalle = require('./Factura_Detalle');
const Visitas = require('./Visitas');
const Motivos_anula = require('./Motivo_Anula');
const Factura = require('./Factura');
const Servicios_vivienda = require('./Servicios_Vivienda');
const Pantallas = require('./Pantallas');
const Acceso_pantalla = require('./Acceso_Pantalla');

const BD = {
    Tipo_usuario,
    Persona,
    Usuario,
    Servicio,
    Forma_Pago,
    Motivos_anula,
    Vivienda,
    Variable_configuracion,
    Anuncio,
    Log_Errores,
    Factura_Detalle,
    Visitas,
    Factura,
    Servicios_vivienda,
    Pantallas,
    Acceso_pantalla

}


BD.Tipo_usuario.sync()
BD.Persona.sync();
BD.Usuario.sync();
BD.Servicio.sync();
BD.Forma_Pago.sync();
BD.Motivos_anula.sync();
BD.Vivienda.sync();
BD.Variable_configuracion.sync();
BD.Anuncio.sync();
BD.Log_Errores.sync();
BD.Factura_Detalle.sync();
BD.Visitas.sync();
BD.Factura.sync();
BD.Servicios_vivienda.sync();
BD.Pantallas.sync();
BD.Acceso_pantalla.sync();

BD.Usuario.belongsTo(BD.Persona);
BD.Usuario.belongsTo(BD.Tipo_usuario);

// BD.Forma_Pago.hasOne(BD.Usuario);
BD.Motivos_anula.belongsTo(BD.Usuario);
BD.Vivienda.belongsTo(BD.Persona)
BD.Vivienda.belongsTo(BD.Persona);
// BD.Vivienda.hasMany(BD.Servicios_vivienda);
// BD.Servicio.hasMany(BD.Servicios_vivienda);
BD.Variable_configuracion.belongsTo(BD.Usuario);
BD.Anuncio.belongsTo(BD.Usuario);
BD.Log_Errores.belongsTo(BD.Usuario);
BD.Visitas.belongsTo(BD.Usuario);
BD.Factura_Detalle.belongsTo(BD.Servicio);

BD.Factura.hasMany(BD.Factura_Detalle);
BD.Factura.belongsTo(BD.Vivienda);
// BD.Factura.belongsTo(BD.Usuario);
BD.Factura.belongsTo(BD.Forma_Pago);
BD.Factura.belongsTo(BD.Motivos_anula);

BD.Factura.belongsTo(BD.Persona, {
    as: 'cajero',
    foreignKey: 'UsuarioRealizaCobroId',
    constraints: false
});

BD.Servicios_vivienda.belongsTo(BD.Servicio);
BD.Servicios_vivienda.belongsTo(BD.Vivienda);

BD.Acceso_pantalla.belongsTo(BD.Tipo_usuario)
BD.Acceso_pantalla.belongsTo(BD.Pantallas)

BD.Servicios_vivienda.belongsTo(BD.Vivienda)
BD.Vivienda.hasMany(BD.Servicios_vivienda)

BD.Servicios_vivienda.belongsTo(BD.Servicio)
BD.Servicio.hasMany(BD.Servicios_vivienda)




module.exports = BD