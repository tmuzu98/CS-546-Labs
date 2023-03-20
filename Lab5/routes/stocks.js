const express = require('express');
const router = express.Router();
const data = require('../data');
const stocksData=data.stocks;

router.get('/:id', async (req, res) => {
    try {
      //console.log("Here");
      const stock = await stocksData.getStockById(req.params.id);
      //console.log("Here 33");
      res.json(stock);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: 'not found!' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const stocks = await stocksData.getStocks();
      res.json(stocks);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  
  module.exports = router;