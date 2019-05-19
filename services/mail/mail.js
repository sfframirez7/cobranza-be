const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fernando.ramire.hn@gmail.com',
        pass: 'Killzone3'
    }
})

var mailOptions = {
    from: 'fernando.ramire.hn@gmail.com',
    to: 'fernando.ramire@hotmail.com, saulr@banpais.hn',
    subject: 'Prueba desde Node',
    text: 'It works'
};

var MailService = {

    enviar: function() {
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Enviado : ", info);

            }
        })
    },

    transporter

}


module.exports = { MailService }