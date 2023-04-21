import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()


const createConnection = () => {
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }

    try {

        mongoose.connect(process.env.MONGO_URL,params);
        console.log("Mongodb Connected")
        
    } catch (error) {
        console.log("monodb connection error",error)
    }


}

export default createConnection;