const universityRouter = require('express').Router();
const db = require('../db');
const {University, Student} = require('../db/models/index.js');

// GET '/' =>  get all universities
universityRouter.get('/', (req, res, next) => {
    University.scope('getUniversitiesWithStudents').findAll({})
    .then((allUniversities) => {
        res.status(200).json(allUniversities);
    }).catch(next);
});


// GET '/:universityId' => get university by id
universityRouter.get('/:universityId', (req, res, next) => {
    University.findByPk(req.params.universityId)
    .then((university) => {
      if(!university){
        throw new Error('University does not exist with this id');
      }
      return university.reload(University.options.scopes.getUniversitiesWithStudents());
    })
    .then(university => {
      res.status(200).json(university);
    })
    .catch(next);
});

// POST '/' => create a new university
universityRouter.post('/', (req, res, next) => {
    University.create(req.body)
    .then(university => university.reload(University.options.scopes.getUniversitiesWithStudents()))
    .then(university => res.status(200).json(university))
    .catch(next);
});

// PUT '/:universityId' => edit the university by id
universityRouter.put('/:universityId', (req, res, next) => {
    University.findByPk(req.params.universityId)
    .then(university => {
      if(!university){
        throw new Error('University does not exist with this id');
      }
      return university.update(req.body)
    })
    .then(university => university.reload(University.options.scopes.getUniversitiesWithStudents()))
    .then(university => res.status(200).json(university))
    .catch(next);
});

// DELETE '/:universityId' => deletes the university by id
universityRouter.delete('/:universityId', (req, res, next) => {
    University.destroy({
      where: {
        id: req.params.universityId
      }
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(next);
});

module.exports = universityRouter;