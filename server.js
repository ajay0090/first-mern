const express = require('express');
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require("path")
const cookieParser = require('cookie-parser')
const auth = require('./router/auth.js')
const connectDb = require("./config/connectDb")

// config dot env file
dotenv.config({ path: './config.env' });

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(cors())
app.use(cookieParser());

//routes
app.use(auth);

// static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//listen server
// database call
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})