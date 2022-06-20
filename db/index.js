const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js');

const db = module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect
});

require('./models');

db.sync({force : true})
    .then((result) => {
        console.log('Connection established !');
    }).catch((err) => {
        console.log(err);
    });