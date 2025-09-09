import mongoose from "mongoose";
import {DB_URI,NODE_ENV} from "../config/env.js";

// check if there is no DB_URI  then throw an error
if(!DB_URI){
    throw new error("please define the MONGODB_URI enviroment variable inside.env.<development/production>.local" );
}
// connect to mongodb
const connectToDatabase = async() =>{
    try{
     await mongoose.connect(DB_URI);
     console.log(`connected to database in ${NODE_ENV} mode`);
    }
    catch(error){
        // is we use it is error so use console.error it show in red and different style
        console.error("error connecting to database:",error);
        // process.exit(0) → Means success ✅ (the program finished without problems).process.exit(1) → Means failure/error ❌ (the program stopped because something went wrong).Any non-zero number (1, 2, 3, …) means error.
        process.exit(1);
    }
}
export default connectToDatabase;