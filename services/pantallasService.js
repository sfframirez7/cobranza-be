const BD = require('../modelsBD/BD');


var pantallaService = {


    all: async function(tipoUsuarioId) {

        var accesoPantallas = await BD.Acceso_pantalla.findAll({
            where: { tipoUsuarioId: tipoUsuarioId },
            attributes: ['pantallaId'],
        })

        pantallas = []
        accesoPantallas.forEach(pantalla => {
            pantallas.push(pantalla.pantallaId)
        });


        return BD.Pantallas.findAll({
                where: { id: pantallas, Activo: true },
                attributes: ['Descripcion', 'Icono', 'Ruta'],
            })
            .then((pantallas) => {
                return pantallas
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },

    eliminar_visita: function(visitaId, usuarioId) {

        return BD.Visitas.destroy({
                where: { id: visitaId, usuarioId: usuarioId },
            })
            .then((visitas) => {
                return visitas
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },



    nueva: function(viviendaModel) {

        return BD.Vivienda.create({
                UsuarioAgregaId: viviendaModel.UsuarioId,
                Descripcion: viviendaModel.Descripcion,
                Direccion: viviendaModel.Direccion,
                UsuarioAgregaId: viviendaModel.UsuarioAgregaId,
                personaId: viviendaModel.personaId
            })
            .then((result) => {
                return result
            }).catch((err) => {
                throw { error: true, message: err }
            });


    }



}



module.exports = pantallaService