const express = require('express');
const router = express.Router();

const { getTasks, addTask, completeTask, changeStatusTask } = require('../controller/task.controller');

router.get('/getTasks', getTasks);
router.post('/addTask', addTask);
router.get('/completeTask', completeTask);
router.post('/changeStatusTask', changeStatusTask);

module.exports = router;