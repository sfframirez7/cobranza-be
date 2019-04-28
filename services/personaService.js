const BD = require('../modelsBD/BD');

var personaService = {

    mostrar_todos: function() {
        return BD.Persona.findAll({ raw: true })
            .then((personas) => {
                return personas
            })
            .catch((error) => {
                return {
                    error: true,
                    message: error
                }
            })

    },

    buscar_ById: function(personaId) {
        return BD.Persona.findOne({
                raw: true,
                where: { id: personaId }

            })
            .then((persona) => {
                return persona
            })
            .catch((error) => {
                return {
                    error: true,
                    message: error
                }
            })

    },

    crear_persona: async function(persona) {

        if (!persona) {
            throw {
                error: true,
                message: "No se han proporcionados datos"
            }
        }

        var newPersona = person_mapper(persona)
        return BD.Persona.create(newPersona)
            .then((persona) => {
                return persona
            })
            .catch((err) => {
                throw {
                    error: true,
                    message: err
                }
            })
    },

    viviendas_persona: function(personaId) {
        return BD.Vivienda.findAll({ where: { personaId } })
            .then((viviendas) => {
                return viviendas
            })
            .catch((err) => {
                throw {
                    error: true,
                    message: err
                }
            });

    },


    eliminar_persona: function(personaId) {

        return BD.Persona.destroy({ where: { id: personaId } })
            .then((persona) => {
                return persona
            })
            .catch((err) => {
                throw {
                    error: true,
                    message: err
                }
            });

    },




}




function person_mapper(persona) {
    var newPerson = {
        NoIdentidad: persona.NoIdentidad,
        Nombre: persona.Nombre,
        Apellido: persona.Apellido,
        Telefono: persona.Telefono,
        Celular: persona.Celular,
        Correo: persona.Correo,
        Direccion: persona.Direccion,
        Sexo: persona.Sexo,
        Activo: persona.Activo,
        UsuarioAgregaId: persona.UsuarioAgregaId
    }
    return newPerson
}

module.exports = personaService