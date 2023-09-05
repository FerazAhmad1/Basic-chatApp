const express = require("express");
const fs = require("fs");
const router = require("./router/messageLogin");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
const port = 4000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
