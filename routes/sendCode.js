const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// temporary in-memory storage (later we can move to DB or Redis)
const codes = {};

router.post("/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000);

  // save code
  codes[email] = code;

  const sent = await sendEmail(
    email,
    "Verification Code",
    `<h2>Your verification code is:</h2><h1>${code}</h1>`
  );

  if (!sent) {
    return res.status(500).json({ message: "Failed to send email" });
  }

  res.json({ message: "Verification code sent successfully" });
});

module.exports = { router, codes };
