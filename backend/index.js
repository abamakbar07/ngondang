const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes')

const app = express()
require("dotenv").config();
const port = process.env.PORT || 5000
const dbatlas = process.env.DBATLAS

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(
        dbatlas,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Atlas connection established successfully!');
});

app.use("/api/v1/", routes)

app.get('/', (req, res) => {
    res.send('Home')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!`)
})