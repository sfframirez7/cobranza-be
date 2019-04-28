const express  = require('express')
const userRouter = express()


const {UserService}  = require('../services/userService') 
const tokenService = require('../services/tokenService')
const {MailService} = require('../services/mail/mail')
const {pdfService} = require('../services/pdf/pdf')



userRouter.get('/', (req, res)=>
{
    res.send("users")
})

userRouter.get('/buscar/:id', (req, res)=>
{
    var userId = req.params.id;
    console.log(userId);

    UserService.show_user(userId).then((user)=>
    {
        res.json(user)
    })
    .catch((err)=>
    {
        res.json(err)
    })
})


userRouter.get('/login', tokenService.validar_token, (req, res)=>
{
    res.send( tokenService.crear_token())
})

userRouter.get('/all',  (req, res)=>
{
   UserService.show_users()
    .then((resp) =>
    {
        res.json(resp)
    })
    .catch((err)=>
    {
        console.log("err");
        res.json(err)
    })
})


userRouter.get('/create', (req, res)=>
{
   UserService.create_user()

   .then((resp)=>
   {
       console.log(resp);
       res.json({resp})
   })
   .catch((err)=>
   {
       res.json({respuesta: err})
   })
   
})


userRouter.get("/sendEmail", (req, res)=>
{
    var mailOptions ={
        from : 'fernando.ramire.hn@gmail.com',
        to : 'fernando.ramire@hotmail.com, saulr@banpais.hn',
        subject : 'Prueba desde Node',
        text: 'It works'
    };

    MailService.transporter.sendMail(mailOptions
        , (err, info)=>
          {
              if(err)
              {
                  console.log(err);
                  res.json(err)
              }
              else
              {
                  console.log("Enviado : ", info);
                  res.json(info)
              }
          })
})

userRouter.get("/createPdf", (req, res)=>
{
    pdfService.createPdf();
    res.sendFile('C:\\Users\\saulr\\Documents\\Proyectos\\Otros\\Npm2\\salida.pdf')
})

module.exports = userRouter