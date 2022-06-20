const api = require('express').Router();
const db = require('../db');

api.use('/students', require('./student'));
api.use('/universities', require('./university'));

module.exports = api