const express = require('express');
const {insertSampleProducts} = require('../controllers/product-controller')

const router = express.Router();


router.post('/add', insertSampleProducts);
router.get('/stats', insertSampleProducts);

module.exports = router;