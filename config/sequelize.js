const Sequelize = require('sequelize');
const sequelize = new Sequelize('cobranza', 'root', 'Viernes13', {
    host: '172.20.10.14',
    // host: '192.168.1.142',
    // host: '192.168.1.136',
    dialect: 'mysql',
    // port: 8889,
    operatorsAliases: false,
    // logging : false,

    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },

});

//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = { Sequelize, sequelize }