const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/handsup-local?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGOURI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log(`Database Connected!`);
};

module.exports = connectDB;
