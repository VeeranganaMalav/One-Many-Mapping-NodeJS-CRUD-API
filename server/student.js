const studentRouter = require('express').Router();
const db = require('../db');
const {Student, University} = require('../db/models/index');

// GET '/' =>  get all students
studentRouter.get('/', (req, res, next) => {
  Student.scope('getStudentsWithUniversities').findAll({})
  .then(allStudents => res.status(200).json(allStudents))
  .catch(next);
});

// GET '/:studentId' => get student by id
studentRouter.get('/:studentId', (req, res, next) => {
  Student.findByPk(req.params.studentId)
  .then(student => {
    if(!student){
        throw new Error('Student does not exist with this id');
    }
    return student.reload(Student.options.scopes.getStudentsWithUniversities());
  })
  .then(student => res.status(200).json(student))
  .catch(next);
});

// POST '/' => create a new student
studentRouter.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(student => student.reload(Student.options.scopes.getStudentsWithUniversities()))
  .then(student => res.status(200).json(student))
  .catch(next);
});

// PUT '/:studentId' => edit the student by id
studentRouter.put('/:studentId', (req, res, next) => {
  Student.findByPk(req.params.studentId)
  .then(student => {
    if(!student){
        throw new Error('Student does not exist with this id');
    }
    return student.update(req.body);
  })
  .then(student => student.reload(Student.options.scopes.getStudentsWithUniversities()))
  .then(student => res.status(200).json(student))
  .catch(next);
});


// DELETE '/:studentId' => deletes the student by id
studentRouter.delete('/:studentId', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
  .then(() => {
    res.status(200).end();
  })
  .catch(next);
});

module.exports = studentRouter;