import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'

import noteRoutes from './routes/noteRoutes.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'


dotenv.config()

const app = express()
const Port = process.env.PORT || 5001

//calling and connecting the database
// connectDB();

// middleware : is a funnction that runs between the request and the response
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
}))

// this is a custom middleware
app.use(rateLimiter)


// above middleware is called before sending a response to the API/server
// creates a new api = application programming interface
// all HTTP methods are move to 'noteRoutes' file and call/use from there
app.use("/api/notes", noteRoutes)

//once the database is connected then listen
connectDB().then(() => {
    app.listen(Port, () => {
        console.log("Server started on PORT: 5001");
    })
})

