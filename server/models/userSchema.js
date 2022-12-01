import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config({ path: './config.env' });


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    token: {
        type: String
    }
})

//hashing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // console.log('Hi, from pre');
        this.password = await bcrypt.hash(this.password, 2);
        this.cpassword = await bcrypt.hash(this.cpassword, 2);
    }
    next();
});

//generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        let tokenId = jsonwebtoken.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = tokenId;
        await this.save();
        return tokenId;
    } catch (error) {
        console.log(error);
    }
}
//store message
userSchema.methods.sendMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('USER', userSchema);

export default User;
