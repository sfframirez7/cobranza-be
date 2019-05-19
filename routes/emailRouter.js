const express = require('express')
const emailRouter = express()

const nodeMailer = require('nodemailer');

const tokenService = require('../services/tokenService');
const BD = require('../modelsBD/BD');

const { sequelize, Sequelize } = require('../config/sequelize')

const Op = Sequelize.Op

emailRouter.post('/enviar', tokenService.validar_token_admin, async(req, res) => {

    var emailModel = req.body.email;

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fernando.ramire.hn@gmail.com',
            pass: 'Killzone3'
        }
    });

    var destinatarios = [];

    if (emailModel.NotificarPeriodoFacturado == true) {

        var periodo = emailModel.PeriodoSelected.split("-")
        var Anio = periodo[0];
        var Mes = periodo[1]


        if (!Anio || !Mes)
            res.status(400).json('No se ha encontrado el periodo')

        var respuestaBd = await BD.Factura.findAll({
            where: { Anio: Anio, Mes: Mes },
            paranoid: false,
            attributes: ['id', 'ViviendaId'],
            include: [{
                model: BD.Vivienda,
                attributes: ['id', 'personaId'],
                paranoid: false,
                include: [{
                    model: BD.Persona,
                    attributes: ['id', 'Nombre', 'Apellido', 'Correo'],
                    where: {
                        Correo: {
                            [Op.ne]: null,
                        }
                    },
                    paranoid: false,
                }]
            }],
        })


        respuestaBd.forEach(factura => {
            if (!factura.vivienda)
                return
            if (factura.vivienda.persona.Correo) {
                destinatarios.push(factura.vivienda.persona.Correo)
            }
        });

        if (destinatarios.length == 0) {
            res.status(400).json('No se han encontrado destinatarios')
            return
        }


    } else {
        var respuestaBd = await BD.Persona.findAll({
            attributes: ['id', 'Correo'],

            where: {
                Correo: {
                    [Op.ne]: null,
                }
            },
        })

        respuestaBd.forEach(persona => {

            if (persona.Correo)
                destinatarios.push(persona.Correo)
        });

    }
    console.log(destinatarios);

    destinatarios.forEach(destinatario => {

        let mailOptions = {
            from: 'fernando.ramire.hn@gmail.com',
            to: destinatario,
            subject: emailModel.Subject,
            html: emailModel.Body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                // res.status(400).send({ success: false })
            } else {
                console.log("info", info);
                // res.status(200).send({ success: true });
            }
        });

    });

    res.status(200).send({ success: true });





});

module.exports = emailRouter;