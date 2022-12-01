const mongoose = require('mongoose');
const connectDb = async () => {
    console.log("error yha hai");
    try {
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
module.exports = connectDb;