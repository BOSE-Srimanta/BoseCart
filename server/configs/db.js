import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Hey Bose! Your Database is now Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/
        greencart`)
    } catch (error) {
        console.error(error.message);  
    }
}

export default connectDB;