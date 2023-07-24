import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
// const URL = `mongodb+srv://${username}:${password}@blogapp.jm77a8i.mongodb.net/?retryWrites=true&w=majority`

const Connection = async () => {
    const URL = process.env.URL || `mongodb+srv://${username}:${password}@blogapp.jm77a8i.mongodb.net/?retryWrites=true&w=majority`
    try {
        mongoose.connect(URL, { useNewUrlParser: true });
        mongoose.set('strictQuery', false);
        console.log("Connected")
    }
    catch (error) {
        console.log("problem while connecting to database", error);
    }
}

export default Connection