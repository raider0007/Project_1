const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/Route/route");
const app = express();
require("dotenv").config({ path: "./config.env" });
app.use(express.json());
// mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/Shankar_DB
// mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/skDB?retryWrites=true&w=majority
mongoose
  .connect(
    // "mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/skDB?retryWrites=true&w=majority",
    `${process.env.MONGODB}Project_1`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connection succussfull!"))
  .catch(() => console.log("Connection fail!!"));

app.use("/", route);
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log("Server started at port 3000");
});
