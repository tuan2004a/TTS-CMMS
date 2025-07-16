const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config()

//connect to database
mongoose.connect('mongodb://localhost:27017/cmms')
    .then(() => console.log("Connected to database"))

app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("trust proxy", true);
app.use(cors({
    origin: "*",
    credentials: true,
    // methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
}));

require('./src/router/index.router')(app);

app.listen(8080,() => {
    console.log("sever is running on port 8080")
});