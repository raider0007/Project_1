const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/Route/route");
const app = express();

// DOTENV PACKAGE USING TO AVOID LEAK OF SECURED DATA
require("dotenv").config({ path: "./config.env" });

app.use(express.json());

mongoose
  .connect(`${process.env.MONGODB}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection successful!"))
  .catch(() => console.log("Connection fail!!"));

app.use("/", route);

// GLOBAL ROUTE ERROR HANDLER
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: false,
    msg: `can not find ${req.originalUrl} on this server`,
  });
});

const PORT = process.env.PORT;
app.listen(PORT || 4000, () => {
  console.log("Server started at port 3000");
});
