const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData=data.poeple;

router.get('/:id', async (req, res) => {
    try {
      const people = await peopleData.getPersonById(req.params.id);
      res.json(people);
    } catch (e) {
      res.status(404).json({ message: 'People not found' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const peopleList = await peopleData.getPeople();
      res.json(peopleList);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  module.exports = router;