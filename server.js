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

// database call
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json())
// app.use(cors())
app.use(cookieParser());

//routes
app.use(auth);

// DATABASE AND PORT
const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

// mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => { console.log('connection successfull') })
//     .catch((error) => console.log(error.message));

// static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//listen server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})