const Student = require('./student.js');
const University = require('./university.js');

University.hasMany(Student);
Student.belongsTo(University);

module.exports = {
    University,
    Student
};