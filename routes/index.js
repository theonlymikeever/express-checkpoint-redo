'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;
let models = require('../models/todos')

router.get('/', (req, res, next) => {
  res.send(models.listPeople())
})

router.get('/:name/tasks', (req, res, next) => {
  let query = req.query.status
  let name = req.params.name
  if (models.listPeople().indexOf(name) > -1){
    //the list function will already check to see if
    //we're passing in a query
    res.send(models.list(name, query))
  } else {
    //error handling - case where person doesn't exist
    res.status(404)
    next()
  }
})

router.post('/:name/tasks', (req, res, next) => {
  let name = req.params.name
  let task = req.body
  let standardfields = ['content', 'complete']
  let fields = Object.keys(task)
  //check to ensure we're passed proper fields
  let correctFormat = fields.every((field) => {
    return standardfields.indexOf(field) > -1
  })
    //error handing for non-standard fields
  if (correctFormat) {
    res.status(201).json(models.add(name, task))
  } else {
    res.status(400).send(new Error("Bad Request"))
    next()
  }
})

router.put('/:name/tasks/:index', (req, res, next) => {
  let name = req.params.name
  let task = req.params.index
  res.json(models.complete(name, task))
})

router.delete('/:name/tasks/:index', (req, res, next) => {
  let name = req.params.name
  let task = req.params.index
  res.status(204).json(models.remove(name, task))
})
