const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { verifyGoogleCredential } = require("../services/googleAuth");
const { signToken } = require("../services/tokenService");

exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Missing fileds ⚠️",
        message: "username, email and password are required.",
      });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists 🙅‍♂️",
        message: "username or email is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "username or email is already in use." });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing fileds ⚠️",
        message: "username, and password are required.",
      });
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials 🚫",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials 🚫",
      });
    }

    await user.save();

    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "username or email is already in use." });
  }
};

exports.googleAuth = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: "Missing Credential" });
  }

  let profile;
  try {
    profile = await verifyGoogleCredential(credential);
  } catch (error) {
    return res.status(401).json({ error: "Invalid Google credential" });
  }

  const user = await User.findOneAndUpdate(
    { googleId: profile.googleId },
    { ...profile, lastLogin: new Date() },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  const token = signToken(user);
  res.json({ token, user });
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
