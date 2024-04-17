const express = require('express');
const router = express.Router();

const { getEnvironments, addEnvironment, deleteEnvironment } = require('../controller/environment.controller');

router.get('/getEnvironments', getEnvironments);
router.post('/addEnvironment', addEnvironment);
router.delete('/deleteEnvironment', deleteEnvironment);

module.exports = router;