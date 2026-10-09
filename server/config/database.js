import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async ()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected Successfully")
    } catch (error) {
        console.log("Database connection failed")
    }
}

export default connectDb