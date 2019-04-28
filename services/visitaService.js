const BD = require('../modelsBD/BD');


var visitaService = {


    visitas_ByPersona: function(usuarioId) {

        return BD.Visitas.findAll({
                where: { usuarioId: usuarioId },
                include: [{
                    model: BD.Usuario,
                    attributes: ['id'],
                    include: [{
                        model: BD.Persona,
                        attributes: ['Nombre', 'Apellido', 'Direccion']
                    }]
                }],
                order: [
                    // will return `username` DESC
                    ['createdAt', 'DESC']
                ]
            })
            .then((visitas) => {
                return visitas
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


    visitas_del_dia: function() {

        return BD.Visitas.findAll({
                where: { Fecha_visita: fecha_actual() },
                include: [{
                    model: BD.Usuario,
                    attributes: ['id'],
                    include: [{
                        model: BD.Persona,
                        attributes: ['Nombre', 'Apellido', 'Direccion']
                    }]
                }],
                order: [
                    // will return `username` DESC
                    ['createdAt', 'DESC']
                ]
            })
            .then((visitas) => {
                return visitas
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },


    nueva: function(visitaModel) {

        try {

            var hoy = new Date(fecha_actual())
            var fechaVisita = new Date(visitaModel.Fecha_visita)

            if (fechaVisita < hoy) {
                throw 'La fecha de visita debe ser mayor o igual que la fecha actual'
            }

            return BD.Visitas.create({
                    usuarioId: visitaModel.UsuarioId,
                    NombreVisitante: visitaModel.NombreVisitante,
                    Descripcion: visitaModel.Descripcion,
                    Fecha_visita: visitaModel.Fecha_visita,
                    Hora_estimada_visita: visitaModel.Hora_estimada_visital
                })
                .then((result) => {
                    return result
                }).catch((err) => {
                    throw { error: true, message: err }
                });

        } catch (error) {
            throw { error: true, message: error }
        }

    }



}


function fecha_actual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    return today
}

module.exports = visitaService