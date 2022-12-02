const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        console.log("Try to connect mongoose");
        const conn = await mongoose.connect(process.env.DATABASE, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB Connected: Happy`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
module.exports = connectDb;