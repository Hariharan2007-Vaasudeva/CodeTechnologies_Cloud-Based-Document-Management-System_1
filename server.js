const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [];

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hash,
  });

  res.json({
    message: "User Registered",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user)
    return res.status(400).json({
      message: "User Not Found",
    });

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match)
    return res.status(400).json({
      message: "Invalid Password",
    });

  const token = jwt.sign(
    { email },
    "secretkey"
  );

  res.json({ token });
});

module.exports = router;