const BD = require('../modelsBD/BD');

const { Sequelize } = require('../config/sequelize')
const Op = Sequelize.Op


var anuncioService = {


    anuncios: function() {

        return BD.Anuncio.findAll({
                // where: {
                //     FechaDesde: {
                //         [Op.or]: {
                //             [Op.gte]: new Date(fecha_actual()),
                //             [Op.lte]: new Date(fecha_actual())

                //         }
                //     },
                //     FechaHasta: {
                //         [Op.or]: {
                //             [Op.gte]: new Date(fecha_actual()),
                //             [Op.lte]: new Date(fecha_actual())

                //         },
                //     }
                // },
                order: [
                    // will return `username` DESC
                    ['createdAt', 'DESC']
                ]
            })
            .then((anuncios) => {
                return anuncios
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },

    eliminar_anuncio: function(anuncioId) {

        return BD.Anuncio.destroy({
                where: { id: anuncioId },
            })
            .then((visitas) => {
                return visitas
            }).catch((err) => {
                throw { error: true, message: err }
            });

    },


    nuevo: function(anuncioModel) {

        try {

            return BD.Anuncio.create({
                    usuarioId: anuncioModel.UsuarioId,
                    Titulo: anuncioModel.Titulo,
                    Contenido: anuncioModel.Contenido,
                    FechaDesde: fecha_actual(),
                    FechaHasta: fecha_actual(),
                    Publicado: anuncioModel.Publicado,
                    Activo: anuncioModel.Activo,
                })
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err);
                    throw { error: true, message: err }
                });

        } catch (error) {
            console.log(error);
            throw { error: true, message: error }
        }

    }



}


function fecha_actual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    return today
}



module.exports = anuncioService