const express = require('express')


const router = express.Router();
const CtrlAdmin = require('./admin.controller')


// router.post('/admin/register', CtrlAdmin.registerAdmin);
// router.post('/admin/login', CtrlAdmin.loginAdmin);
router.post('/book',CtrlAdmin.postBook);

module.exports = router;

