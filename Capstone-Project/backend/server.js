const express = require('express')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;


//This will be to be able to use the routes
const ServerRoutes = require('../backend/routes/ServerRoutes')

//This is so that we are able to communicate with the database
const mongoose = require('mongoose')

//This is the body parser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//This will allow us to use the routes
app.use('/api', ServerRoutes)

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is connected to db and listening on port ${PORT}`)
    })
})