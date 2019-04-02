const express = require('express');

const UserCtrl = require('./user.controller');

const router = express.Router();

// users routes
router.post('/register',UserCtrl.register)
router.post('/login', UserCtrl.login);

module.exports = router;