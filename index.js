import express from 'express';
import dotenv from 'dotenv'
import createConnection from './db.js';
import { mentorRouter } from './Routers/Mentor.js';
import { studentsRouter } from './Routers/Student.js';


// env configuration
dotenv.config()

// middle wares
const app = express()
app.use(express.json())

// database connection
createConnection()

// Routers
// Mentor Router
app.use("/mentor",mentorRouter)

// student router
app.use("/student",studentsRouter)


app.listen(process.env.PORT,()=>console.log(`server started localhost:${process.env.PORT}`))

