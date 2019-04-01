const express = require('express');

const UserCtrl = require('./user.controller');

const router = express.Router();

// users routes
router.post('/register',UserCtrl.register)
router.post('/login', UserCtrl.login);
router.get('/book', UserCtrl.list)

module.exports = router;