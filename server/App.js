import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './router/auth.js'
import cookieParser from 'cookie-parser';
const app = express();

import path from "path";


dotenv.config({ path: './config.env' });
app.use(express.json())
app.use(cookieParser());
app.use(auth);

const DB = process.env.DATABASE;
const PORT = process.env.PORT;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connection successfull') })
    .catch((error) => console.log(error.message));

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("client/build"))
// }

//static files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('*', function (req, res) {
    res.sendFile(paht.join(__dirname, "../client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})