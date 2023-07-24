import mongoose from "mongoose";

const Connection = async (URL) => {
    // const URL = `mongodb+srv://${username}:${password}@blogapp.jm77a8i.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Connected")
    }
    catch (error) {
        console.log("problem while connecting to database", error);
    }
}

export default Connection