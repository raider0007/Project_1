const express = require("express");
const router = express.Router();

router.get("/test-me", (req, res) => {
  console.log(req.body);
  res.send("Hello World!!");
});

module.exports = router;