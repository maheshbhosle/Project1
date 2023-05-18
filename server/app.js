const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
app.use(cors())

dotenv.config({path: "./config.env"});
require("./DB/conn");
// const User = require("./model/userSchema");

app.use(cookieParser())
app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

// app.get("/about", (req, res) => {
//     res.send("Hello World, about from the server");
//     console.log("Hello by About");
// });

app.get("/signin", (req, res) => {
    res.send("Hello World, signin from the server");
});
app.get("/signup", (req, res) => {
    res.send("Hello World, signup from the server");
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
