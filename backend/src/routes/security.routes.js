const express = require('express');
const router = express.Router();

const { login, register, getUser, getUserProtected } = require('../controller/security.controller');
const { verifyTokenHadler } = require('./handler/token.handler');

router.post('/login', login );
router.post('/register', register);
router.get('/getUser', verifyTokenHadler, getUser)
router.get('/getUserP', verifyTokenHadler, getUserProtected)

module.exports = router;