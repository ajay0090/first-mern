const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = require('../models/userSchema.js');
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send(`Hi from the server auth!`)
// })

router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(404).json('All field must be filled');
    }
    try {
        const userExit = await mongoose.model('User').findOne({ email: email });

        if (userExit) {
            return res.status(422).json("Account already exit");
        } else if (password != cpassword) {
            return res.status(422).json("Password not same");
        } else {
            const user = new User({ name, email, phone, password, cpassword });
            //pre//
            await user.save();
            // console.log('I am auth from server! registration successful')
            res.status(201).json("Registration successful");
        }
    } catch (error) {
        console.log(error);
    }
});
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) { return res.status(404).json('All field must be filled'); }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const ismatch = await bcrypt.compare(password, userLogin.password);

            console.log('Here, i am genrating token');
            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!ismatch) {
                return res.status(400).json("Invalid credential");
            } else {
                res.status(201).json("SignIn Successful");
            }
        } else {
            return res.status(404).json("Invalid credential");
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', authenticate, (req, res) => {
    // console.log(`Hello I am about`)
    res.send(req.rootUser);
})
//contact
router.get('/getData', authenticate, (req, res) => {
    // console.log(`Hello I am contact`)
    res.send(req.rootUser);
})

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: 'please fill the contact form properly' })
        }
        const userContact = await User.findOne({ _id: req.userId });
        if (userContact) {
            const userMessage = await userContact.sendMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: 'successful' })
        }
    } catch (error) {
        console.log(error)
    }
});

//log out

router.get('/logout', (req, res) => {
    // console.log(`Hello I am log out`);
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('User log out');
})

module.exports = router;