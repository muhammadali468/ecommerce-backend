require("dotenv").config()
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL);

mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB");
})

mongoose.connection.on("error",(error)=>{
    console.error(error)
})
 
module.exports = mongoose;
