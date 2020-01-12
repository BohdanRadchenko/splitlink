const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
const User = require("../models/User");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "incorrect email").isEmail(),
    check("password", "Min length password is 6 symbol").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: error.array(),
          message: "incorrect registration date"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists." });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email: email, password: hashPassword });
      await user.save();

      res.status(201).json({ message: "User is created" });
    } catch (e) {
      res.status(500).json({
        message: "Something worn wrong, try again"
      });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "enter correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "enter password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect date system"
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          mesage: "User not found"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password, try again"
        });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({
        message: "Something worn wrong, try again"
      });
    }
  }
);

module.exports = router;
