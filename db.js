const mongoose = require("mongoose");

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGOURI, {useFindAndModify: false, 
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    console.log("database connected!!");
}

module.exports = connectDB;

