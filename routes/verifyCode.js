const express = require("express");
const router = express.Router();
const { codes } = require("./sendCode");

router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  if (codes[email] && codes[email] == code) {
    delete codes[email]; // remove after success
    return res.json({ message: "Code verified successfully" });
  }

  res.status(400).json({ message: "Invalid or expired code" });
});

module.exports = router;
