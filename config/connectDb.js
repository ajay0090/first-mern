import { connect } from 'mongoose';
const connectDb = async () => {
    try {
        const conn = await connect(process.env.DATABASE);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}
export default connectDb;