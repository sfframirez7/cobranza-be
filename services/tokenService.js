const jwt = require('jsonwebtoken');

const pantallaService = require('./pantallasService');

var tokenService = {
    crear_token: async function(usuario) {

        if (!usuario)
            throw "Something went wrong"


        var tipoUsuarioId = usuario.TipoUsuarioId

        payload = {
            id: usuario.id,
            usuario: usuario.usuario,
            nombre: usuario.persona.Nombre + usuario.persona.Apellido,
            tipoUsuarioId,
            pantallas: await pantallaService.all(tipoUsuarioId)
        }

        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 2),
            payload
        }, 'sLa4gth3r!$th3B3stM3d!cin3');

        var decoded = jwt.decode(token);
        return token
    },


    validar_token: (req, res, next) => {

        var token = req.headers['token'];

        if (!token)
            throw 'Usuario no autenticado'


        jwt.verify(token, 'sLa4gth3r!$th3B3stM3d!cin3', function(err, decoded) {
            if (err) {
                throw 'Usuario no autenticado'
            }


            next();
        });
    },

    validar_token_admin: (req, res, next) => {

        var token = req.headers['token'];

        if (!token)
            throw 'Usuario no autenticado'

        jwt.verify(token, 'sLa4gth3r!$th3B3stM3d!cin3', function(err, decoded) {
            if (err) {
                throw 'Usuario no autenticado'
            }

            var data = tokenService.token_payload(token)
            var tipoUsuarioId = data.payload.tipoUsuarioId

            if (tipoUsuarioId != 1)
                throw 'Usuario sin privilegios para esta operación'


            next();
        });
    },

    token_payload: function(token) {

        var payload = jwt.decode(token)
        return payload
    }




}

module.exports = tokenService