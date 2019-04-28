const express  = require('express')
const routes  = require('./routes/routes')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
  });

app.use("/", routes)


app.listen(3000, ()=>
    {
        console.log(`Running at port ${3000}`);
    }
)

