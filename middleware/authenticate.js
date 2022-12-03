const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');//.js
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const Authenticate = async (req, res, next) => {
    // Get token from header
    const token = req.cookies.jwtoken;

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, token: token });

        if (!rootUser) { throw new Error('User not found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}

module.exports = Authenticate;