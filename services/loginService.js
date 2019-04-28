const bcrypt = require('bcrypt');
const BD = require('../modelsBD/BD');
const tokenService = require('./tokenService');

var loginService = {
    iniciar_sesion: async function(credenciales) {
        if (!credenciales) {
            throw {
                error: true,
                message: "No se han recibido las credenciales"
            }
        }

        try {

            var usuario = credenciales.Usuario
            var password = credenciales.Password

            usuario = await BD.Usuario.findOne({
                // raw: true,
                where: { Usuario: usuario },
                attributes: ['id', 'usuario', 'PersonaId', 'Password', 'TipoUsuarioId', 'Activo'],
                include: [{
                        model: BD.Persona,
                        attributes: ['id', 'Nombre', 'Apellido']
                    },
                    {
                        model: BD.Tipo_usuario,
                        attributes: ['id', 'Descripcion']
                    }
                ]
            });

            console.log(usuario);

            if (!usuario) {
                throw { error: true, message: "Credenciales incorrectas" }
            }

            if (!usuario.Activo) {
                throw { error: true, message: "Usuario inactivo" }
            }

            var passwordValido = loginService.compare_password(password, usuario.Password)

            if (passwordValido === true) {
                var token = tokenService.crear_token(usuario)
                return token

            } else
                throw { error: true, message: "Credenciales incorrectas" }

        } catch (error) {
            console.log(error);
            throw { error: true, message: error }
        }


    },

    encrypt_password: function(password) {
        var salt = bcrypt.genSaltSync(10);
        var Password = bcrypt.hashSync(password, salt);
        return Password
    },


    compare_password: function(password, passwordBD) {
        var PasswordOk = bcrypt.compareSync(password, passwordBD);
        return PasswordOk

    }


}

module.exports = loginService