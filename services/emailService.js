const nodeMailer = require('nodemailer');

var emailService = {

    enviar: function() {

        let transporter = nodeMailer.createTransport({
            // host: 'smtp.zoho.com',
            // port: 465,
            // secure: true, //true for 465 port, false for other ports
            // auth: {
            //     user: 'email@example.com',
            //     pass: 'password'
            // }
            service: 'gmail',
            auth: {
                user: 'fernando.ramire.hn@gmail.com',
                pass: 'Killzone3'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'fernando.ramire.hn@gmail.com', // sender address
            to: 'fernando.ramire.hn@gmail.com, fernando.ramire@hotmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ success: false })
            } else {
                res.status(200).send({ success: true });
            }
        });
    }

}


module.exports = emailService