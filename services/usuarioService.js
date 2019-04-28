const BD = require('../modelsBD/BD')
const loginService = require('./loginService');

var UsuarioService = {


    mostrar_todos: function() {
        return BD.Usuario.findAll({
                    raw: true,
                    include: [{
                            model: BD.Persona
                        },
                        {
                            model: BD.Tipo_usuario
                        }
                    ]
                }

            )
            .then((usuarios) => {
                return usuarios
            })
            .catch((error) => {
                return {
                    error: true,
                    message: error
                }
            })

    },


    usuario_byPersona: function(personaId) {
        return BD.Usuario.findOne({
                    where: { PersonaId: personaId },
                    attributes: ['id', 'PersonaId', 'Usuario', 'TipoUsuarioId'],
                    include: [{
                        model: BD.Tipo_usuario
                    }]
                }

            )
            .then((usuarios) => {
                return usuarios
            })
            .catch((error) => {
                return {
                    error: true,
                    message: error
                }
            })

    },


    tipos_usuarios: function() {
        return BD.Tipo_usuario.findAll()
            .then((tipoUsuarios) => {
                return tipoUsuarios
            }).catch((err) => {
                return {
                    error: true,
                    message: err
                }

            });
    },

    crear_usuario: async function(personaId, tipoUsuarioId) {

        var yaTieneUsuario = await BD.Usuario.findOne({ where: { PersonaId: personaId } })

        if (yaTieneUsuario)
            throw { error: true, message: 'Esta persona ya tiene un usuario' }

        var personaBD = await BD.Persona.findOne({ raw: true, where: { id: personaId } })

        return BD.Usuario.create({
            PersonaId: personaBD.id,
            Usuario: personaBD.NoIdentidad,
            Password: loginService.encrypt_password(personaBD.NoIdentidad),
            TipoUsuarioId: tipoUsuarioId,
            Activo: true
        })

        .then(() => {
                return {
                    error: false,
                    message: 'Petición ejecutada exitosamente'
                }
            })
            .catch((err) => {
                return {
                    error: true,
                    message: err
                }
            })
    }


}

async function usuario_mapper(personaId, tipoUsuarioId) {

    var personaBD = await BD.Persona.findOne({ raw: true, where: { id: personaId } })

    var newUsuario = {};
    newUsuario.PersonaId = personaId
    newUsuario.Usuario = personaBD.NoIdentidad
    newUsuario.Password = loginService.encrypt_password(personaBD.NoIdentidad);
    newUsuario.TipoUsuarioId = tipoUsuarioId
    newUsuario.Activo = true
    return newUsuario

}


module.exports = UsuarioService