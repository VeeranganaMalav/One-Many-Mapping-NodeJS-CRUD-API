var Sequelize = require('sequelize');
var db = require('../index.js');

module.exports = db.define('university', {
    universityName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    universityLocation : {
        type : Sequelize.STRING,
        allowNull : false
    }
}, {
    scopes : {
        getUniversitiesWithStudents : () => ({
            include : [
                {
                    model : db.model('student')
                }
            ]
        })
    }
}, {
    timestamps : false
});