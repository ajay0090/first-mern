const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        console.log("Try to connect mongoose");
        const conn = await mongoose.connect('mongodb+srv://ajay0090:lBqN292Lqb77amJ5@cluster0.mtoebau.mongodb.net/?retryWrites=true&w=majority');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
module.exports = connectDb;