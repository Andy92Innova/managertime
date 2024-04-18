const express = require('express');
const router = express.Router();

//middlewares
router.get('/healthcheck', async (req,res)=>{
    return res.send({message: 'This api is ok'})
});

router.use('/security', require('./security.routes'));
router.use('/env', require('./environment.routes'));
router.use('/task', require('./task.routes'));

router.get('*', (req, res) => {
    res.status(404);
    res.send({error: 'Not found'});
});

module.exports = router;