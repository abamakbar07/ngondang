const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
require("dotenv").config();
const port = process.env.PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Home')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!`)
})