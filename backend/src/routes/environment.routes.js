const express = require('express');
const router = express.Router();
const { verifyTokenHadler } = require('./handler/token.handler')

const { 
    getEnvironments, 
    addEnvironment,
    deleteEnvironment, 
    finishDayEnvironment
} = require('../controller/environment.controller');

router.get('/getEnvironments', verifyTokenHadler, getEnvironments);
router.post('/addEnvironment', verifyTokenHadler, addEnvironment);
router.patch('/deleteEnvironment',verifyTokenHadler, deleteEnvironment);
router.patch('/finishDayEnvironment',verifyTokenHadler, finishDayEnvironment);

module.exports = router;