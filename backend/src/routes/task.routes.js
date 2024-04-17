const express = require('express');
const router = express.Router();

const { getTasks, getTask, addTask, completeTask, pauseTask } = require('../controller/task.controller');
const { verifyTokenHadler } = require('./handler/token.handler');

router.get('/getTasks',verifyTokenHadler, getTasks);
router.get('/getTask',verifyTokenHadler, getTask);
router.post('/addTask',verifyTokenHadler, addTask);
router.patch('/completeTask',verifyTokenHadler, completeTask);
router.patch('/pauseTask',verifyTokenHadler, pauseTask);

module.exports = router;