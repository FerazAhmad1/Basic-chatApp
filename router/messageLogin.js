const express = require("express");

const {
  login,
  messageForm,
  addMessage,
} = require("../Controller/msgloginController");

const router = express.Router();
router.get("/login", login);
router.get("/", messageForm);
router.post("/add-message", addMessage);
module.exports = router;
