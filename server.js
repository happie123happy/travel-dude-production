const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());

const tagRoute = require("./routes/tags")
const userRoute= require("./routes/users")

dotenv.config()

 app.use(express.static(path.join(__dirname, 'client/src/assets')));

const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://travel-dude.herokuapp.com:5000";

app.use(cors({ origin }));

main().catch(err => console.log(err));

async function main() {
    mongoose.connect(process.env.MONGODB_CODE);
    console.log("DB Connected")
}



// app.get("/", (req, res) => {
//     res.send("Hello")
// })

app.use("/route/tags", tagRoute)
app.use("/route/users",userRoute)


if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
   });
}



  app.listen(PORT, function () {
      console.log("Server Listening");
  })