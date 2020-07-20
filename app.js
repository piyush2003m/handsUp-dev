const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const morgan = require('morgan');


const app = express();
const connectDB = require('./db');
connectDB();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));

dotenv.config();
app.get("/", function(req, res) {
    res.json({page: "you have reached the home page"})
});

app.get("/doubts", function(req, res) {
    const doubt = ["how to do this in math", "what is science"]
    res.json({data: doubt})
});

"nishil is COD noob"

const PORT = process.env.PORT || 5000
app.listen(PORT, function() {
	console.log('doubt website is live');
});