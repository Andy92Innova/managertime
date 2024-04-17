require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.SERVER_PORT || 3001;
//middlewares
app.use(express.json());
app.use('/api', require('./routes'))
//Start app
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});


