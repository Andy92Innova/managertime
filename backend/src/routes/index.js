const express = require('express');
const router = express.Router();

//middlewares
router.use('/env', require('./environment.routes'));
router.use('/task', require('./task.routes'));

router.get('*', (req, res) => {
    res.status(404);
    res.send({error: 'Not found'});
});

module.exports = router;