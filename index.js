const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/Route/route");
const app = express();

app.use(express.json());
// mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/Shankar_DB
// mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/skDB?retryWrites=true&w=majority
mongoose
  .connect(
    // "mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/skDB?retryWrites=true&w=majority",
    "mongodb://0.0.0.0:27017/Project_1",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connection succussfull!"))
  .catch(() => console.log("Connection fail!!"));

app.use("/", route);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
