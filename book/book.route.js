const express = require('express');

const bookCtrl = require('./book.controller');

const router = express.Router();

// books routes
router.post('/', bookCtrl.create);
router.get('/',bookCtrl.find)


module.exports = router;