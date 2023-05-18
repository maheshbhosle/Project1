const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection Succesfull");
  })
  .catch((err) => console.log("Not connected"));
