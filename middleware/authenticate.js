const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');//.js
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const Authenticate = async (req, res, next) => {
    try {
        // console.log('Hi i am authenticate.js')
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, token: token });

        if (!rootUser) { throw new Error('User not found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided")
        console.log(error)
    }
}

module.exports = Authenticate;