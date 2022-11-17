const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/Route/route");
const app = express();
require("dotenv").config({ path: "./config.env" });
app.use(express.json());

mongoose
  .connect(`${process.env.MONGODB}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection succussfull!"))
  .catch(() => console.log("Connection fail!!"));

app.use("/", route);
const PORT = process.env.PORT;
app.listen(PORT || 4000, () => {
  console.log("Server started at port 3000");
});
