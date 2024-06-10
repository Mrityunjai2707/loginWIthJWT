
const authController = require('./../controllers/authController');
const express = require('express');
const router = express.Router();
router.post('/sigUp', authController.sigUp)
router.post('/login', authController.login)
router.get('/alltours',authController.protect,authController.getAllTours)
module.exports = router;
