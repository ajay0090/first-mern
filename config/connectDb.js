const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        console.log("Try to connect mongoose");
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
module.exports = connectDb;