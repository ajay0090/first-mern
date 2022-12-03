const mongoose = require('mongoose');
const db = process.env.DATABASE;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("💾  ✔ MongoDB connected");
    } catch (err) {
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }
}
module.exports = connectDB;