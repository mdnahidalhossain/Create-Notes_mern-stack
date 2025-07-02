import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        // cpnecting with the database API/URI
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log("MONGO-DB CONNECTED SUCCESSFULLY!")
    } catch (error) {
        console.error("Error connecting to MONGO-DB", error)
    }
}