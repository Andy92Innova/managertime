require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 3000;
//middlewares
app.use(express.json());
app.use(cors());
app.use('/api', require('./src/routes'))
//Start app
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});


