const { sequelize, Sequelize } = require('../config/sequelize')


const Visitas = sequelize.define('visita', {

    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    NombreVisitante: {
        type: Sequelize.STRING,
        allowNull: false
    },


    Descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
    },


    Fecha_visita: {
        type: Sequelize.DATE,
        allowNull: false
    },


    Hora_estimada_visita: {
        type: Sequelize.DATE
    }


}, {
    paranoid: true
})


function fecha_actual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    return today
}


module.exports = Visitas